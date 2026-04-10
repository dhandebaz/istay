// ================================================================
// utils/recommendations.ts — "Vibe Match" property recommendation engine
//
// When a property is fully booked, suggests similar stays by:
//   1. Scanning prop_index to find properties in the same city
//   2. Prompting Gemini to rank them by vibe/luxury match
//   3. Returning top 2 with scores and reasons
//
// Designed for the sold-out / all-dates-blocked property page.
// ================================================================

import {
  listProperties,
  getPropertyById,
  listAllPropertyIndices,
  getProperty,
} from "./db.ts";
import { callGemini, GeminiError } from "./gemini.ts";
import type { Property, VibeMatch } from "./types.ts";

const MAX_CANDIDATES = 5;
const MAX_RESULTS = 2;

// Builds the Gemini comparison prompt.
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

// Extracts the city from an address string (best-effort).
// Looks for Indian city names or falls back to last substantial word.
function extractCity(address: string | undefined): string | null {
  if (!address) return null;
  const lower = address.toLowerCase();

  // Common Indian cities to match against
  const cities = [
    "mumbai", "delhi", "bangalore", "bengaluru", "hyderabad",
    "chennai", "kolkata", "pune", "goa", "jaipur", "udaipur",
    "shimla", "manali", "gurgaon", "gurugram", "noida", "lucknow",
    "ahmedabad", "chandigarh", "kochi", "pondicherry", "ooty",
    "mussoorie", "nainital", "rishikesh", "varanasi", "agra",
    "jodhpur", "coorg", "lonavala", "mahabaleshwar", "alibaug",
    "kodaikanal", "darjeeling", "gangtok", "leh", "ladakh",
    "kasol", "mcleodganj", "amritsar", "mysore", "mysuru",
  ];

  for (const city of cities) {
    if (lower.includes(city)) return city;
  }

  // Fallback: split by comma, take the 2nd-to-last segment (usually city)
  const parts = address.split(",").map((s) => s.trim()).filter(Boolean);
  if (parts.length >= 2) {
    return parts[parts.length - 2].toLowerCase();
  }

  return null;
}

// Get vibe-matched recommendations for a fully-booked property.
// Searches same-city properties across ALL hosts, not just the same host.
export async function getVibeMatches(
  currentPropId: string,
): Promise<VibeMatch[]> {
  const currentProp = await getPropertyById(currentPropId);
  if (!currentProp) return [];

  const currentCity = extractCity(currentProp.address);

  // Strategy 1: Find properties in the same city across all hosts
  let candidates: Property[] = [];

  if (currentCity) {
    const allIndices = await listAllPropertyIndices();
    for (const { propId, hostId } of allIndices) {
      if (propId === currentPropId) continue;
      if (candidates.length >= MAX_CANDIDATES) break;

      const prop = await getProperty(hostId, propId);
      if (!prop || prop.status !== "active") continue;

      const propCity = extractCity(prop.address);
      if (propCity && propCity === currentCity) {
        candidates.push(prop);
      }
    }
  }

  // Strategy 2: Fallback to same-host properties if no city matches
  if (candidates.length === 0) {
    const allProps = await listProperties(currentProp.hostId);
    candidates = allProps
      .filter((p) => p.id !== currentPropId && p.status === "active")
      .slice(0, MAX_CANDIDATES);
  }

  if (candidates.length === 0) return [];

  // If only 1-2 candidates, skip AI and return directly with default scores
  if (candidates.length <= 2) {
    return candidates.map((p) => ({
      propId: p.id,
      propertyName: p.name,
      imageUrl: p.imageUrl,
      basePrice: p.basePrice,
      score: 70,
      reason: `✨ Another lovely stay in the same area at ₹${p.basePrice}/night`,
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
    // If it's a missing API key error, don't fallback to random results
    if (err instanceof GeminiError && err.status === 401) {
      console.warn("[vibe-match] GEMINI_API_KEY not set — skipping AI ranking");
    } else {
      console.error("[vibe-match] AI recommendation failed:", err);
    }

    // Graceful fallback: return first 2 candidates without AI ranking
    return candidates.slice(0, MAX_RESULTS).map((p) => ({
      propId: p.id,
      propertyName: p.name,
      imageUrl: p.imageUrl,
      basePrice: p.basePrice,
      score: 70,
      reason: `✨ Another stay in the same area at ₹${p.basePrice}/night`,
    }));
  }
}
