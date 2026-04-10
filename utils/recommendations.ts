// ================================================================
// utils/recommendations.ts — "Vibe Match" property recommendation engine
//
// When a property is fully booked, suggests similar stays by:
//   1. Fetching sibling properties from the same host
//   2. Prompting Gemini to rank them by vibe/luxury match
//   3. Returning top 2 with scores and reasons
//
// Designed for the sold-out / all-dates-blocked property page.
// ================================================================

import { listProperties, getPropertyById } from "./db.ts";
import { callGemini } from "./gemini.ts";
import type { Property, VibeMatch } from "./types.ts";

const MAX_CANDIDATES = 5;
const MAX_RESULTS = 2;

/**
 * Builds the Gemini comparison prompt.
 */
function buildVibePrompt(
  currentProp: Property,
  candidates: Property[],
): string {
  const currentDesc = `
CURRENT PROPERTY (the one the guest wanted):
- Name: ${currentProp.name}
- Price: ₹${currentProp.basePrice}/night
- Description: ${currentProp.description}
- Amenities: ${currentProp.amenities?.join(", ") || "Not specified"}
- Address: ${currentProp.address || "Not specified"}
`.trim();

  const candidateDescs = candidates.map(
    (p, i) => `
CANDIDATE ${i + 1} (ID: ${p.id}):
- Name: ${p.name}
- Price: ₹${p.basePrice}/night
- Description: ${p.description}
- Amenities: ${p.amenities?.join(", ") || "Not specified"}
- Address: ${p.address || "Not specified"}
`.trim(),
  );

  return `You are a luxury hospitality recommendation AI for istay.space.

A guest tried to book a property but all dates are unavailable. Your job is to recommend the BEST alternative from the available candidates.

${currentDesc}

CANDIDATE PROPERTIES:
${candidateDescs.join("\n\n")}

TASK: Compare each candidate to the current property. Score them 0-100 based on:
- Vibe similarity (70%): luxury level, aesthetic, setting, atmosphere
- Price proximity (20%): closer price = higher score
- Amenity overlap (10%): shared amenities and features

Return ONLY a JSON array of the top ${MAX_RESULTS} matches in this format:
[
  {
    "propId": "candidate_id",
    "score": 85,
    "reason": "One crisp sentence explaining WHY this is a great alternative"
  }
]

Rules:
- Return EXACTLY ${MAX_RESULTS} results (or fewer if fewer candidates)
- Sort by score descending
- Reasons should feel warm and inviting, using emojis
- If candidates are very different, still rank them — lower score is fine`;
}

/**
 * Get vibe-matched recommendations for a fully-booked property.
 *
 * @param currentPropId - The property the guest wanted but couldn't book
 * @returns Array of VibeMatch (max 2), or empty if no alternatives exist
 */
export async function getVibeMatches(
  currentPropId: string,
): Promise<VibeMatch[]> {
  const currentProp = await getPropertyById(currentPropId);
  if (!currentProp) return [];

  // Fetch all properties from the same host
  const allProps = await listProperties(currentProp.hostId);

  // Filter out current property + inactive ones
  const candidates = allProps
    .filter((p) => p.id !== currentPropId && p.status === "active")
    .slice(0, MAX_CANDIDATES);

  if (candidates.length === 0) return [];

  // If only 1-2 candidates, skip AI and return directly with default scores
  if (candidates.length <= 2) {
    return candidates.map((p) => ({
      propId: p.id,
      propertyName: p.name,
      imageUrl: p.imageUrl,
      basePrice: p.basePrice,
      score: 70, // Default "reasonable match" score
      reason: `✨ Another lovely stay by the same host at ₹${p.basePrice}/night`,
    }));
  }

  try {
    const response = await callGemini({
      prompt: buildVibePrompt(currentProp, candidates),
      systemPrompt:
        "You are a luxury hospitality recommendation AI. Return only valid JSON arrays. Be warm and inviting.",
      temperature: 0.4,
      maxOutputTokens: 300,
      jsonMode: true,
    });

    // Parse the AI response
    let rankings: Array<{ propId: string; score: number; reason: string }>;

    try {
      rankings = JSON.parse(response.text);
    } catch {
      // Fallback: try extracting JSON array from the response
      const match = response.text.match(/\[[\s\S]*\]/);
      if (match) {
        rankings = JSON.parse(match[0]);
      } else {
        throw new Error("Could not parse recommendation JSON");
      }
    }

    if (!Array.isArray(rankings)) {
      throw new Error("Gemini did not return an array");
    }

    // Map rankings to full VibeMatch objects with property data
    const matches: VibeMatch[] = [];
    for (const rank of rankings.slice(0, MAX_RESULTS)) {
      const prop = candidates.find((p) => p.id === rank.propId);
      if (prop) {
        matches.push({
          propId: prop.id,
          propertyName: prop.name,
          imageUrl: prop.imageUrl,
          basePrice: prop.basePrice,
          score: Math.min(100, Math.max(0, rank.score ?? 0)),
          reason: rank.reason || `🏡 Great alternative at ₹${prop.basePrice}/night`,
        });
      }
    }

    console.log(
      `[vibe-match] Matched ${matches.length} alternatives for prop=${currentPropId}`,
    );

    return matches;
  } catch (err) {
    console.error("[vibe-match] AI recommendation failed:", err);

    // Graceful fallback: return first 2 candidates without AI ranking
    return candidates.slice(0, MAX_RESULTS).map((p) => ({
      propId: p.id,
      propertyName: p.name,
      imageUrl: p.imageUrl,
      basePrice: p.basePrice,
      score: 70,
      reason: `✨ Another stay by the same host at ₹${p.basePrice}/night`,
    }));
  }
}
