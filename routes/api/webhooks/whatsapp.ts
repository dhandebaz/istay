import { type Handlers } from "$fresh/server.ts";
import {
  getBookingByPhone,
  getKnowledgeByPropId,
  getPropertyById,
  getChatSession,
  saveChatSession,
} from "../../../utils/db.ts";
import { callGemini } from "../../../utils/gemini.ts";
import type { ChatSession, ChatMessage } from "../../../utils/types.ts";

const VERIFY_TOKEN = () => Deno.env.get("WHATSAPP_VERIFY_TOKEN") || "istay-verify-token";
const WHATSAPP_TOKEN = () => Deno.env.get("WHATSAPP_TOKEN") || "";
const WHATSAPP_PHONE_ID = () => Deno.env.get("WHATSAPP_PHONE_ID") || "";
const SESSION_TTL_MS = 24 * 60 * 60 * 1000;
const MAX_HISTORY = 20;

function buildSystemPrompt(propertyName: string, knowledgeContent: string): string {
  return `You are the istay Assistant for "${propertyName}".

CONTEXT:
${knowledgeContent}

RULES:
- Answer ONLY from the context above. Never invent data.
- If unknown, say: "I don't have that info — please contact your host directly! 📱"
- Never discuss pricing, refunds, cancellations, disputes, or external payments (Airbnb, PayPal, UPI, bank transfers). Reply: "For payments or refunds, please contact our support team."
- Be brief (1-3 sentences, under 60 words). Use emojis naturally.
- Respond in the guest's language (Hindi/English).
- If asked who you are: "I'm the istay Assistant for this property! 🏡"
- Help with: WiFi, check-in/out, house rules, nearby places, caretaker contact, emergencies.`;
}

async function sendWhatsAppMessage(toPhone: string, text: string) {
  const token = WHATSAPP_TOKEN();
  const phoneId = WHATSAPP_PHONE_ID();
  if (!token || !phoneId) {
    console.error("[whatsapp] Missing WHATSAPP_TOKEN or WHATSAPP_PHONE_ID in env.");
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
      }
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
      if (msg.type !== "text") {
        return new Response("OK", { status: 200 });
      }

      const guestPhone = msg.from; // e.g. "919876543210"
      const userText = msg.text.body;

      console.log(`[whatsapp] Msg from ${guestPhone}: ${userText}`);

      // ── Lookup Booking ──
      // Often WhatsApp passes international prefix without "+". Try normalizing or searching natively.
      let booking = await getBookingByPhone(guestPhone);
      
      // Fallback: try stripping '91' prefix inside India if not directly matched.
      if (!booking && guestPhone.length === 12 && guestPhone.startsWith("91")) {
        booking = await getBookingByPhone(guestPhone.substring(2)); // Try matching 10 digit
      }

      if (!booking) {
        // No active booking found, ignore or reply fallback
        await sendWhatsAppMessage(
          guestPhone, 
          "Hi! I'm the istay Assistant. I couldn't locate an active booking under this number. Please message your host directly."
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
        `Property: ${property.name}\nAddress: ${property.address ?? "Not specified"}\n\nNo custom knowledge base has been set up.`;

      // ── Multi-turn Session via KV ──
      // Use phone number as the session tie-down
      const sessionId = `wa-${guestPhone}`;
      let session = await getChatSession(sessionId);
      const now = new Date().toISOString();

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
      const userMsg: ChatMessage = { role: "user", content: userText, timestamp: now };
      session.messages.push(userMsg);
      if (session.messages.length > MAX_HISTORY) {
        session.messages = session.messages.slice(-MAX_HISTORY);
      }

      const history = session.messages.slice(0, -1).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      // ── Ask Gemini ──
      const systemPrompt = buildSystemPrompt(property.name, knowledgeContent);
      let reply: string;

      try {
        const response = await callGemini({
          prompt: userText,
          systemPrompt,
          history,
          temperature: 0.5,
          maxOutputTokens: 256,
        });
        reply = response.text.replace(/```[\s\S]*?```/g, "").trim();
      } catch (err) {
        console.error("[whatsapp] Gemini Error:", err);
        reply = "I'm temporarily unavailable. Please text your host directly! 📱";
      }

      // Save Model response back inside Chat Session
      const modelMsg: ChatMessage = {
        role: "model",
        content: reply,
        timestamp: new Date().toISOString(),
      };
      session.messages.push(modelMsg);
      session.lastActivity = modelMsg.timestamp;
      await saveChatSession(session);

      // ── Dispatch Reply to Meta ──
      await sendWhatsAppMessage(guestPhone, reply);

      return new Response("OK", { status: 200 });
    } catch (err) {
      console.error("[whatsapp] Webhook processing error:", err);
      // Return 200 OK anyway to prevent Meta retries jamming the endpoint
      return new Response("OK", { status: 200 });
    }
  },
};
