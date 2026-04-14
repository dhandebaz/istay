// ================================================================
// utils/intelligence.ts — Guest Intelligence & Memory Reflection
// ================================================================

import { callGemini } from "./gemini.ts";
import { getGuestProfile, saveGuestProfile } from "./db.ts";
import type { ChatMessage, GuestProfile } from "./types.ts";

/**
 * Uses Gemini to analyze a chat session and extract guest preferences/summary.
 * Upserts the result into the persistent Global Guest Profile.
 */
export async function reflectOnGuestSession(
  phone: string,
  messages: ChatMessage[],
): Promise<void> {
  if (messages.length < 3) return; // Not enough context to reflect

  // 1. Prepare history for Gemini
  const conversation = messages
    .filter(m => m.role !== "function")
    .map(m => `${m.role.toUpperCase()}: ${m.content}`)
    .join("\n");

  const existingProfile = await getGuestProfile(phone);

  const prompt = `
You are a hospitality intelligence engine for istay.space. 
Your goal is to analyze the following conversation and update the guest's persistent profile.

CURRENT PROFILE (if any):
- Preferences: ${existingProfile?.preferences.join(", ") || "None"}
- Summary: ${existingProfile?.summary || "None"}

NEW CONVERSATION:
${conversation}

TASK:
1. Extract NEW preferences or requirements mentioned (e.g. "needs extra towels", "prefers cold water", "dislikes ground floor").
2. Update the short guest summary (vibe).
3. If the guest mentioned their name, capture it.

Return ONLY a JSON object:
{
  "name": string | null,
  "new_preferences": string[],
  "summary": string
}
`;

  try {
    const res = await callGemini({
      prompt,
      systemPrompt: "You are a hospitality data scientist. Return only valid JSON.",
      temperature: 0.2,
      jsonMode: true,
    });

    const intelligence = JSON.parse(res.text);

    // 2. Upsert Profile
    const names = existingProfile?.names || [];
    if (intelligence.name && !names.includes(intelligence.name)) {
      names.push(intelligence.name);
    }

    const preferences = new Set([
      ...(existingProfile?.preferences || []),
      ...(intelligence.new_preferences || []),
    ]);

    const updatedProfile: GuestProfile = {
      phone,
      names,
      emails: existingProfile?.emails || [],
      preferences: Array.from(preferences),
      stayHistory: existingProfile?.stayHistory || [],
      summary: intelligence.summary || existingProfile?.summary,
      createdAt: existingProfile?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await saveGuestProfile(updatedProfile);
    console.log(`[intelligence] Reflected on guest=${phone}. Profile updated.`);
  } catch (err) {
    console.error("[intelligence] Reflection failed:", err);
  }
}
