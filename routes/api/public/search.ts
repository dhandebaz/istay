import { Handlers } from "$fresh/server.ts";
import {
  getPropertyById,
  listAllPropertyIndices,
  listBlockedDates,
} from "../../../utils/db.ts";
import { getDynamicPrice } from "../../../utils/pricing.ts";
import type { Property } from "../../../utils/types.ts";

export const handler: Handlers = {
  async GET(req) {
    const url = new URL(req.url);
    const query = url.searchParams.get("q") || "";
    const vibe = url.searchParams.get("vibe") || "";
    const checkIn = url.searchParams.get("checkIn") || "";
    const checkOut = url.searchParams.get("checkOut") || "";

    const indices = await listAllPropertyIndices();
    const allProps = (
      await Promise.all(indices.map((i) => getPropertyById(i.propId)))
    ).filter((p): p is Property => p !== null && p.status === "active");

    // Filter by query (City / Name)
    let filtered = allProps;
    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.address && p.address.toLowerCase().includes(q)),
      );
    }

    // Apply Vibe Score if provided
    if (vibe && filtered.length > 0) {
      try {
        const { callGemini } = await import("../../../utils/gemini.ts");
        const prompt = `A guest is searching for a property with a "${vibe}" vibe. Score each of the following properties from 0 to 100 on how well it matches the vibe. Return ONLY a JSON array of objects with keys "id", "score", and "reason".\n\nProperties:\n${
          filtered
            .map(
              (p) =>
                `ID:${p.id} | Name:${p.name} | Desc:${
                  p.description || ""
                } | Amenities:${p.amenities?.join(",") || ""}`,
            )
            .join("\n")
        }`;

        const res = await callGemini({ prompt, jsonMode: true });
        let scores: { id: string; score: number; reason: string }[] = [];
        try {
          let text = res.text.trim();
          if (text.startsWith("```json")) text = text.slice(7);
          if (text.startsWith("```")) text = text.slice(3);
          if (text.endsWith("```")) text = text.slice(0, -3);
          scores = JSON.parse(text.trim());
        } catch {}

        if (scores.length > 0) {
          const scoreMap = new Map(
            scores.map((s) => [s.id, { score: s.score, reason: s.reason }]),
          );
          filtered = filtered
            .map((p) => {
              const matched = scoreMap.get(p.id);
              return {
                ...p,
                _vibeScore: matched?.score || 0,
                _vibeReason: matched?.reason || "",
              };
            })
            .filter((p) => (p._vibeScore as number) > 50)
            .sort((a, b) => (b._vibeScore as number) - (a._vibeScore as number));
        }
      } catch (e) {
        console.error("Vibe matching failed API:", e);
      }
    }

    // Availability check if dates provided
    const propsWithAvailability = await Promise.all(
      filtered.map(async (p) => {
        let isAvailable = true;
        let matchReason = "";
        let dynamicPrice = p.basePrice;
        let isSurge = false;

        if (checkIn && checkOut) {
          const blocks = await listBlockedDates(p.id);
          const blockedSet = new Set(blocks.map((b) => b.date));
          let cur = new Date(checkIn + "T00:00:00Z");
          const end = new Date(checkOut + "T00:00:00Z");
          
          let totalDynamic = 0;
          let daysCount = 0;

          while (cur < end) {
            const dateStr = cur.toISOString().slice(0, 10);
            if (blockedSet.has(dateStr)) {
              isAvailable = false;
              matchReason = "Selected dates unavailable, but highly recommended!";
            }
            
            // Calculate dynamic price for this day
            const dailyPrice = getDynamicPrice(p, dateStr, 2); // Assume 2 guests for preview
            totalDynamic += dailyPrice;
            daysCount++;

            cur.setUTCDate(cur.getUTCDate() + 1);
          }

          if (daysCount > 0) {
            dynamicPrice = Math.round(totalDynamic / daysCount);
            isSurge = dynamicPrice > p.basePrice;
          }
        }

        return {
          ...p,
          isAvailable,
          matchReason,
          dynamicPrice,
          isSurge,
        };
      }),
    );

    // Sort available ones first
    propsWithAvailability.sort(
      (a, b) => Number(b.isAvailable) - Number(a.isAvailable),
    );

    return new Response(JSON.stringify(propsWithAvailability), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
