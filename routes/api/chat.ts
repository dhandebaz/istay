// ================================================================
// routes/api/chat.ts — AI Concierge Chat Endpoint
//
// POST /api/chat
// Body: { propId, sessionId?, message, testMode? }
// Returns: { reply, sessionId, suggestions }
//
// Uses the host's Knowledge Base from KV as system context,
// injected into every Gemini Flash-Lite call. Multi-turn via
// ChatSession stored in KV.
// ================================================================

import { type Handlers } from "$fresh/server.ts";
import {
  getChatSession,
  getKnowledgeByPropId,
  getPropertyById,
  saveChatSession,
} from "../../utils/db.ts";
import { callGemini } from "../../utils/gemini.ts";
import type { ChatMessage, ChatSession } from "../../utils/types.ts";

/** Max messages to keep in history (prevents token explosion) */
const MAX_HISTORY = 20;

/** Max conversation age before we start a fresh session (24 hours) */
const SESSION_TTL_MS = 24 * 60 * 60 * 1000;

/**
 * Builds the system prompt with the host's knowledge base.
 */
function buildSystemPrompt(
  propertyName: string,
  knowledgeContent: string,
): string {
  // Optimized for < 500 tokens. Each line is a strict rule.
  return `You are the istay AI Concierge for "${propertyName}".

CONTEXT:
${knowledgeContent}

RULES:
- Answer ONLY from the context above. Never invent data.
- If unknown, say: "I don't have that info — please contact your host directly! 📱"
- Never discuss pricing, refunds, cancellations, disputes, or external payments (Airbnb, PayPal, UPI, bank transfers). Reply: "For payments or refunds, please contact our support team."
- Be brief (1-3 sentences, under 60 words). Use emojis naturally.
- Respond in the guest's language (Hindi/English).
- If asked who you are: "I'm the istay AI assistant for this property! 🏡"
- Help with: WiFi, check-in/out, house rules, nearby places, caretaker contact, emergencies.`;
}

/**
 * Generates smart follow-up suggestion pills based on the conversation.
 */
function generateSuggestions(
  _knowledgeContent: string,
  lastReply: string,
  messageCount: number,
): string[] {
  // First message: show starter suggestions
  if (messageCount <= 1) {
    return [
      "What's the WiFi password? 📶",
      "Check-in time? 🕐",
      "Caretaker number? 📱",
      "House rules? 📋",
      "Nearby restaurants? 🍽️",
    ];
  }

  // Context-based follow-ups
  const suggestions: string[] = [];
  const lower = lastReply.toLowerCase();

  if (lower.includes("wifi") || lower.includes("wi-fi")) {
    suggestions.push("Is it 5GHz?", "Speed is slow 😢");
  }
  if (lower.includes("check-in") || lower.includes("check in")) {
    suggestions.push("Can I check in early?", "Late check-in possible?");
  }
  if (lower.includes("check-out") || lower.includes("check out")) {
    suggestions.push("Late check-out?", "Where to leave keys?");
  }
  if (lower.includes("caretaker") || lower.includes("contact")) {
    suggestions.push("Is there a backup number?");
  }

  // Always offer these as fallback
  if (suggestions.length < 3) {
    const defaults = [
      "Nearby ATM? 💰",
      "Is there parking? 🅿️",
      "How to reach the property? 🗺️",
      "Any quiet hours? 🤫",
      "Extra towels? 🛁",
    ];
    for (const d of defaults) {
      if (suggestions.length >= 4) break;
      if (!suggestions.includes(d)) suggestions.push(d);
    }
  }

  return suggestions.slice(0, 4);
}

export const handler: Handlers = {
  POST: async (req) => {
    let body: {
      propId?: string;
      sessionId?: string;
      message?: string;
      testMode?: boolean;
    };

    try {
      body = await req.json();
    } catch {
      return Response.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { propId, message, testMode } = body;
    let { sessionId } = body;

    if (!propId || !message) {
      return Response.json(
        { error: "Required: propId, message" },
        { status: 400 },
      );
    }

    if (message.length > 500) {
      return Response.json(
        { error: "Message too long. Maximum 500 characters." },
        { status: 400 },
      );
    }

    // ── Load Property & Knowledge ──────────────────────────────
    const property = await getPropertyById(propId);
    if (!property) {
      return Response.json({ error: "Property not found" }, { status: 404 });
    }

    const knowledge = await getKnowledgeByPropId(propId);
    const knowledgeContent = knowledge?.content ??
      `Property: ${property.name}
Address: ${property.address ?? "Not specified"}
Price: ₹${property.basePrice}/night
Amenities: ${property.amenities?.join(", ") ?? "Not listed"}
Description: ${property.description}

No custom knowledge base has been set up by the host yet. Only basic property info is available.`;

    // ── Load or Create Chat Session ────────────────────────────
    const now = new Date().toISOString();
    let session: ChatSession | null = null;

    if (sessionId) {
      session = await getChatSession(sessionId);

      // Check session age
      if (session) {
        const age = Date.now() - new Date(session.lastActivity).getTime();
        if (age > SESSION_TTL_MS) {
          console.log(`[chat] Session ${sessionId} expired (${Math.round(age / 3600000)}h old)`);
          session = null; // Force new session
        }
      }
    }

    if (!session) {
      sessionId = crypto.randomUUID().replace(/-/g, "").slice(0, 16);
      session = {
        sessionId,
        propertyId: propId,
        messages: [],
        createdAt: now,
        lastActivity: now,
      };
    }

    // ── Append User Message ────────────────────────────────────
    const userMsg: ChatMessage = {
      role: "user",
      content: message.trim(),
      timestamp: now,
    };
    session.messages.push(userMsg);

    // Trim old messages if over limit (keep last MAX_HISTORY)
    if (session.messages.length > MAX_HISTORY) {
      session.messages = session.messages.slice(-MAX_HISTORY);
    }

    // ── Build Gemini History ───────────────────────────────────
    const history = session.messages.slice(0, -1).map((m) => ({
      role: m.role,
      content: m.content,
    }));

    // ── Call Gemini Flash-Lite ──────────────────────────────────
    let reply: string;

    try {
      const systemPrompt = buildSystemPrompt(property.name, knowledgeContent);

      const response = await callGemini({
        prompt: message.trim(),
        systemPrompt,
        history,
        temperature: 0.5, // Slightly creative for natural conversation
        maxOutputTokens: 256, // Keep responses brief
      });

      reply = response.text;

      // Clean up any markdown artifacts
      reply = reply.replace(/```[\s\S]*?```/g, "").trim();

      if (!reply) {
        reply = "I'm having trouble right now — please try again! 🔄";
      }
    } catch (err) {
      console.error("[chat] Gemini error:", err);
      reply =
        "I'm temporarily unavailable. Please contact your host directly for help! 📱";
    }

    // ── Append Model Response & Save ───────────────────────────
    const modelMsg: ChatMessage = {
      role: "model",
      content: reply,
      timestamp: new Date().toISOString(),
    };
    session.messages.push(modelMsg);
    session.lastActivity = modelMsg.timestamp;

    await saveChatSession(session);

    // ── Generate Suggestions ───────────────────────────────────
    const suggestions = generateSuggestions(
      knowledgeContent,
      reply,
      session.messages.filter((m) => m.role === "user").length,
    );

    console.log(
      `[chat] prop=${propId} session=${sessionId} msgs=${session.messages.length}${testMode ? " [TEST]" : ""}`,
    );

    return Response.json({
      ok: true,
      reply,
      sessionId,
      suggestions,
      messageCount: session.messages.length,
    });
  },
};
