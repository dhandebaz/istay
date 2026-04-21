import { type Handlers } from "$fresh/server.ts";
import {
  getBookingByPhone,
  getChatSession,
  getGuestProfile,
  getKnowledgeByPropId,
  getPropertyById,
  listBlockedDates,
  saveBooking,
  saveChatSession,
  saveGuestProfile,
  saveNotification,
} from "../../../utils/db.ts";
import { callGemini, callGeminiVision } from "../../../utils/gemini.ts";
import { getVibeMatches } from "../../../utils/recommendations.ts";
import { reflectOnGuestSession } from "../../../utils/intelligence.ts";
import type {
  ChatMessage,
  ChatSession,
  GuestProfile,
} from "../../../utils/types.ts";

const VERIFY_TOKEN = () =>
  Deno.env.get("WHATSAPP_VERIFY_TOKEN") || "istay-verify-token";
const WHATSAPP_TOKEN = () => Deno.env.get("WHATSAPP_TOKEN") || "";
const WHATSAPP_PHONE_ID = () => Deno.env.get("WHATSAPP_PHONE_ID") || "";
const SESSION_TTL_MS = 24 * 60 * 60 * 1000;
const MAX_HISTORY = 20;

function buildSystemPrompt(
  propertyName: string,
  knowledgeContent: string,
  guestProfile?: GuestProfile,
): string {
  const istNow = new Date(Date.now() + 5.5 * 60 * 60 * 1000).toISOString();
  const today = istNow.slice(0, 10);

  return `You are the istay Assistant for "${propertyName}". 

GUEST INTELLIGENCE:
${
    guestProfile
      ? `
- Name(s): ${guestProfile.names.join(", ")}
- Recognized Preferences: ${guestProfile.preferences.join(", ") || "None yet"}
- Stay History: ${guestProfile.stayHistory.length} stays
- Summary: ${guestProfile.summary || "New guest"}
`.trim()
      : "- No historical data for this guest yet."
  }

CONTEXT:
- Current Date (IST): ${today}
- Knowledge Base:
${knowledgeContent}

RULES:
- Answer ONLY from context or tool outputs. Never hallucinate.
- If unknown, say: "I don't have that info — please contact your host directly! 📱"
- ESCALATION: If the guest mentions "refund", "dispute", "legal", or is extremely angry, trigger "support_escalation" immediately.
- If this is a returning guest (check Stay History), ALWAYS start the interaction with a "Welcome Back" personalized greeting acknowledging their loyalty.
- Use emojis naturally. Respond in the guest's language.

TOOLS:
- get_stay_details: Retrieve specific info (WiFi, codes, rules) from knowledge base.
- create_supply_request: Alert host about items (water, towels) or repairs.
- validate_guest_id: Approve/reject guest ID verification based on criteria.
- get_related_stays: Find alternative luxury properties when requested dates are booked.
- get_live_availability: Check if specific dates are free.
- check_booking_status: Check guest's current check-in/room status.
- support_escalation: Human help for disputes/pricing.`;
}

const TOOLS = [
  {
    function_declarations: [
      {
        name: "get_stay_details",
        description:
          "Retrieves specific house rules, WiFi, or gate codes from the property knowledge base.",
        parameters: {
          type: "OBJECT",
          properties: {
            topic: {
              type: "string",
              description: "The topic to lookup (e.g. 'WiFi', 'Gate Code')",
            },
          },
        },
      },
      {
        name: "create_supply_request",
        description:
          "Logs a formal supply or maintenance request for the host/caretaker.",
        parameters: {
          type: "OBJECT",
          properties: {
            item: {
              type: "string",
              description:
                "The item or service requested (e.g. 'water', 'towel')",
            },
            urgency: {
              type: "string",
              enum: ["normal", "urgent"],
              description: "Urgency level",
            },
          },
          required: ["item"],
        },
      },
      {
        name: "validate_guest_id",
        description:
          "Updates the guest's ID verification status after reviewing submittted documents.",
        parameters: {
          type: "OBJECT",
          properties: {
            isVerified: {
              type: "boolean",
              description: "Whether the ID is approved",
            },
            reason: {
              type: "string",
              description: "Reason for approval or rejection",
            },
          },
          required: ["isVerified"],
        },
      },
      {
        name: "get_related_stays",
        description:
          "Suggests alternative luxury stays across the iStay platform when current dates are blocked.",
        parameters: { type: "OBJECT", properties: {} },
      },
      {
        name: "get_live_availability",
        description:
          "Checks if the property is available for a specific date range.",
        parameters: {
          type: "OBJECT",
          properties: {
            startDate: {
              type: "string",
              description: "Check-in date (YYYY-MM-DD)",
            },
            endDate: {
              type: "string",
              description: "Check-out date (YYYY-MM-DD)",
            },
          },
          required: ["startDate", "endDate"],
        },
      },
      {
        name: "check_booking_status",
        description: "Retrieves the current status of the guest's booking.",
        parameters: { type: "OBJECT", properties: {} },
      },
      {
        name: "support_escalation",
        description:
          "Connects the guest to a human host for complex issues or disputes.",
        parameters: {
          type: "OBJECT",
          properties: {
            reason: { type: "string", description: "Reason for escalation" },
          },
          required: ["reason"],
        },
      },
    ],
  },
];

async function sendWhatsAppMessage(toPhone: string, text: string) {
  const token = WHATSAPP_TOKEN();
  const phoneId = WHATSAPP_PHONE_ID();
  if (!token || !phoneId) {
    console.error(
      "[whatsapp] Missing WHATSAPP_TOKEN or WHATSAPP_PHONE_ID in env.",
    );
    return false;
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/v19.0/${phoneId}/messages`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: toPhone,
          type: "text",
          text: {
            preview_url: false,
            body: text,
          },
        }),
      },
    );
    const data = await res.json();
    if (!res.ok) {
      console.error("[whatsapp] Delivery failed:", data);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[whatsapp] Network error:", err);
    return false;
  }
}

/**
 * Downloads a media file from WhatsApp/Meta given a mediaId.
 * Returns the file as a base64 string.
 */
async function fetchWhatsAppMedia(mediaId: string): Promise<string | null> {
  const token = WHATSAPP_TOKEN();
  if (!token) return null;

  try {
    // 1. Get Media URL
    const res = await fetch(`https://graph.facebook.com/v19.0/${mediaId}`, {
      headers: { "Authorization": `Bearer ${token}` },
    });
    const { url } = await res.json();
    if (!url) return null;

    // 2. Download Media bits
    const mediaRes = await fetch(url, {
      headers: { "Authorization": `Bearer ${token}` },
    });
    const blob = await mediaRes.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);

    // Uint8Array to base64
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  } catch (e) {
    console.error("[whatsapp] Media fetch error:", e);
    return null;
  }
}

export const handler: Handlers = {
  // 1. Meta Webhook Verification
  GET: (req) => {
    const url = new URL(req.url);
    const mode = url.searchParams.get("hub.mode");
    const token = url.searchParams.get("hub.verify_token");
    const challenge = url.searchParams.get("hub.challenge");

    if (mode === "subscribe" && token === VERIFY_TOKEN()) {
      return new Response(challenge, { status: 200 });
    }
    return new Response("Forbidden", { status: 403 });
  },

  // 2. Incoming Messages
  POST: async (req) => {
    try {
      const body = await req.json();

      // Ensure this is a WhatsApp API event
      if (body.object !== "whatsapp_business_account") {
        return new Response("Not Found", { status: 404 });
      }

      // Parse payload
      const entry = body.entry?.[0];
      const changes = entry?.changes?.[0];
      const value = changes?.value;
      const messages = value?.messages;

      // Filter out statuses (delivered, read) and non-messages
      if (!messages || messages.length === 0) {
        return new Response("OK", { status: 200 });
      }

      const msg = messages[0];
      const guestPhone = msg.from;
      let userText = "";

      // ── Handle Image Message (KYC Pipeline) ──
      if (msg.type === "image") {
        console.log(
          `[whatsapp] Image received from ${guestPhone} (id: ${msg.image.id})`,
        );
        userText = "[SYSTEM: GUEST_UPLOADED_IMAGE]";
      } else if (msg.type === "text") {
        userText = msg.text.body;
      } else {
        return new Response("OK", { status: 200 });
      }

      console.log(`[whatsapp] Msg from ${guestPhone}: ${userText}`);

      // ── Lookup Booking ──
      // Often WhatsApp passes international prefix without "+". Try normalizing or searching natively.
      let booking = await getBookingByPhone(guestPhone);

      // Fallback: try stripping '91' prefix inside India if not directly matched.
      if (!booking && guestPhone.length === 12 && guestPhone.startsWith("91")) {
        booking = await getBookingByPhone(guestPhone.substring(2)); // Try matching 10 digit
      }

      // ── Lookup Global Guest Profile ──
      const guestProfile = await getGuestProfile(guestPhone);

      if (!booking) {
        // No active booking found, ignore or reply fallback
        await sendWhatsAppMessage(
          guestPhone,
          "Hi! I'm the istay Assistant. I couldn't locate an active booking under this number. Please message your host directly.",
        );
        return new Response("OK", { status: 200 });
      }

      // ── Load Property Context ──
      const propId = booking.propertyId;
      const property = await getPropertyById(propId);
      if (!property) {
        return new Response("OK", { status: 200 });
      }

      const knowledge = await getKnowledgeByPropId(propId);
      const knowledgeContent = knowledge?.content ??
        `Property: ${property.name}\nAddress: ${
          property.address ?? "Not specified"
        }\n\nNo custom knowledge base has been set up.`;

      // ── Build System Prompt with Guest Intelligence ──
      const systemPrompt = buildSystemPrompt(
        property.name,
        knowledgeContent,
        guestProfile || undefined,
      );

      // ── Multi-turn Session via KV ──
      // Use phone number as the session tie-down
      const sessionId = `wa-${guestPhone}`;
      let session = await getChatSession(sessionId);
      const now = new Date().toISOString();

      // ── Automated KYC Trigger ──
      if (msg.type === "image" && booking) {
        const b64 = await fetchWhatsAppMedia(msg.image.id);
        if (b64) {
          await sendWhatsAppMessage(
            guestPhone,
            "Got it! Reviewing your ID now... 🧐",
          );

          try {
            const ocrResponse = await callGeminiVision({
              imageBase64: b64,
              prompt:
                `Extract ID details. Compare against Guest Name: "${booking.guestName}". 
               Return JSON: { "name": string, "id_number": string, "match_score": number (0-100), "is_valid": boolean }`,
              jsonMode: true,
            });

            const ocrResult = JSON.parse(ocrResponse.text);

            if (ocrResult && ocrResult.match_score > 85) {
              await saveBooking({ ...booking, idVerified: true });
              await sendWhatsAppMessage(
                guestPhone,
                `✅ verification successful, ${booking.guestName}! You're all set for check-in.`,
              );
              // Short-circuit the text logic
              return new Response("OK", { status: 200 });
            } else {
              await sendWhatsAppMessage(
                guestPhone,
                "Hmm, I couldn't verify that ID perfectly. Please ensure the photo is clear and matches your booking name! 📷",
              );
            }
          } catch (e) {
            console.error("[ocr] Vision failure:", e);
          }
        }
      }

      if (session) {
        const age = Date.now() - new Date(session.lastActivity).getTime();
        if (age > SESSION_TTL_MS) {
          session = null;
        }
      }

      if (!session) {
        session = {
          sessionId,
          propertyId: propId,
          messages: [],
          createdAt: now,
          lastActivity: now,
        };
      }

      // Build history and push message
      const userMsg: ChatMessage = {
        role: "user",
        content: userText,
        timestamp: now,
      };
      session.messages.push(userMsg);
      if (session.messages.length > MAX_HISTORY) {
        session.messages = session.messages.slice(-MAX_HISTORY);
      }

      const history = session.messages.slice(0, -1).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      // ── Ask Gemini (Agentic Loop) ──
      let reply = "";

      let iterations = 0;
      const MAX_ITERATIONS = 5;

      while (iterations < MAX_ITERATIONS) {
        iterations++;

        const history = session.messages.map((m) => ({
          role: m.role,
          content: m.content,
          parts: m.parts,
        }));

        try {
          const response = await callGemini({
            prompt: userText,
            systemPrompt,
            history: history.length > 0 ? history : undefined,
            tools: TOOLS as any,
            temperature: 0.2,

            maxOutputTokens: 512,
          });

          // 1. Handle Tool Calls
          if (response.toolCalls && response.toolCalls.length > 0) {
            // Save model's tool call to history
            const modelCallMsg: ChatMessage = {
              role: "model",
              content: response.text || "Executing tools...",
              parts: [{
                functionCall: {
                  name: response.toolCalls[0].name,
                  args: response.toolCalls[0].args,
                },
              }],
              timestamp: new Date().toISOString(),
            };
            session.messages.push(modelCallMsg);

            // Execute Tool
            const tool = response.toolCalls[0];
            let toolResult: any;

            if (tool.name === "get_stay_details") {
              // The system prompt already includes knowledge, but this tool formalizes retrieval
              toolResult = { status: "success", content: knowledgeContent };
            } else if (tool.name === "create_supply_request") {
              const item = tool.args.item as string;
              const urgency = tool.args.urgency as string || "normal";
              await saveNotification({
                id: crypto.randomUUID(),
                hostId: booking.hostId,
                type: "supply_request",
                title: `${urgency.toUpperCase()}: Supply/Maintenance Request`,
                message: `Guest (${booking.guestName}) requested: ${item}`,
                propertyName: property.name,
                meta: { bookingId: booking.id, item, urgency },
                read: false,
                createdAt: new Date().toISOString(),
              });
              toolResult = {
                status: "success",
                message: `Caretaker notified about ${item}.`,
              };
            } else if (tool.name === "validate_guest_id") {
              const matches = tool.args.isVerified as boolean;
              const reason = tool.args.reason as string;

              const updatedBooking = { ...booking, idVerified: matches };
              await saveBooking(updatedBooking);

              await saveNotification({
                id: crypto.randomUUID(),
                hostId: booking.hostId,
                type: matches ? "confirmed" : "verification_failed",
                title: `AI ID Verification: ${matches ? "PASSED" : "FAILED"}`,
                message: `Booking ${booking.id}: ${reason}`,
                propertyName: property.name,
                meta: { bookingId: booking.id, reason },
                read: false,
                createdAt: new Date().toISOString(),
              });

              toolResult = { status: "success", verified: matches, reason };
            } else if (tool.name === "get_related_stays") {
              const matches = await getVibeMatches(propId);
              toolResult = { status: "success", recommendations: matches };
            } else if (tool.name === "get_live_availability") {
              const start = tool.args.startDate as string;
              const end = tool.args.endDate as string;
              const blocks = await listBlockedDates(propId);
              const isBlocked = blocks.some((b) =>
                b.date >= start && b.date < end
              );

              if (isBlocked) {
                // REVENUE RECOVERY: Automatically scan for alternatives if blocked
                const recommendations = await getVibeMatches(propId);
                toolResult = {
                  status: "success",
                  available: false,
                  message:
                    "Dates are already booked. However, I found these similar luxury stays for you!",
                  recommendations,
                };
              } else {
                toolResult = {
                  status: "success",
                  available: true,
                  message: "Dates are available for booking.",
                };
              }
            } else if (tool.name === "check_booking_status") {
              toolResult = {
                status: "success",
                current_status: booking.status,
                checkIn: booking.checkIn,
              };
            } else if (tool.name === "support_escalation") {
              const reason = tool.args.reason as string;
              await saveNotification({
                id: crypto.randomUUID(),
                hostId: booking.hostId,
                type: "ical_sync_error",
                title: "Live Support Requested",
                message: `Guest needs human help: ${reason}`,
                propertyName: property.name,
                meta: { bookingId: booking.id, reason },
                read: false,
                createdAt: new Date().toISOString(),
              });
              toolResult = {
                status: "success",
                message: "Human host notified.",
              };
            }

            // Save Tool Result to history
            const toolResultMsg: ChatMessage = {
              role: "function",
              content: JSON.stringify(toolResult),
              parts: [{
                functionResponse: {
                  name: tool.name,
                  response: { name: tool.name, content: toolResult },
                },
              }],
              timestamp: new Date().toISOString(),
            };
            session.messages.push(toolResultMsg);

            // Loop back to Gemini for the next action/text
            continue;
          }

          // 2. Final Text Response
          reply = response.text.replace(/```[\s\S]*?```/g, "").trim();
          break; // Exit loop
        } catch (err) {
          console.error("[whatsapp] Gemini Error:", err);
          reply =
            "I'm temporarily unavailable. Please text your host directly! 📱";
          break;
        }
      }

      // Save Model response back inside Chat Session
      if (reply) {
        const modelMsg: ChatMessage = {
          role: "model",
          content: reply,
          timestamp: new Date().toISOString(),
        };
        session.messages.push(modelMsg);
        session.lastActivity = modelMsg.timestamp;
        await saveChatSession(session);
        
        // ── Autonomous Reflection ─────────────────────────────
        // (Non-blocking) extracted newly learned preferences
        reflectOnGuestSession(guestPhone, session.messages).catch(err => 
          console.error("[whatsapp] Reflection trigger failed:", err)
        );

        // ── Dispatch Reply to Meta ──
        await sendWhatsAppMessage(guestPhone, reply);
      }

      return new Response("OK", { status: 200 });
    } catch (err) {
      console.error("[whatsapp] Webhook processing error:", err);
      // Return 200 OK anyway to prevent Meta retries jamming the endpoint
      return new Response("OK", { status: 200 });
    }
  },
};
