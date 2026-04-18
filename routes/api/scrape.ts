// ================================================================
// routes/api/scrape.ts — Robust Airbnb Listing Scraper
//
// POST /api/scrape
// Body: { url: string }
// Returns: ScrapedListing | { error: string }
//
// Strategy:
// 1. Fetch listing HTML with browser-spoofing headers.
// 2. Scan for __INITIAL_STATE__ JSON script tag (Airbnb's data hydration).
// 3. Fallback to OG meta tags if JSON extraction fails.
// ================================================================

import { type Handlers } from "$fresh/server.ts";
import type { ScrapedListing } from "../../utils/types.ts";
import { callGemini } from "../../utils/gemini.ts";
import { uploadToR2 } from "../../utils/storage.ts";

const ALLOWED_HOSTNAMES = [
  "airbnb.com",
  "airbnb.in",
  "airbnb.co.uk",
  "airbnb.com.au",
  "airbnb.ca",
  "airbnb.fr",
  "airbnb.de",
];

const BROWSER_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Accept":
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
  "Cache-Control": "no-cache",
  "Sec-Fetch-Dest": "document",
  "Sec-Fetch-Mode": "navigate",
  "Sec-Fetch-Site": "cross-site",
};

function isAllowedAirbnbUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ALLOWED_HOSTNAMES.some((h) =>
      parsed.hostname === h || parsed.hostname.endsWith(`.${h}`)
    );
  } catch {
    return false;
  }
}

function decodeEntities(str: string): string {
  return str.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}

function extractMeta(html: string, property: string): string {
  const rx = new RegExp(
    `<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"']+)["']`,
    "i",
  );
  const rxRev = new RegExp(
    `<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${property}["']`,
    "i",
  );
  return (html.match(rx)?.[1] ?? html.match(rxRev)?.[1] ?? "").trim();
}

export const handler: Handlers = {
  POST: async (req) => {
    const { url } = await req.json().catch(() => ({}));
    if (!url || typeof url !== "string" || !isAllowedAirbnbUrl(url)) {
      return Response.json({ error: "Invalid Airbnb URL" }, { status: 400 });
    }

    try {
      const res = await fetch(url.split("?")[0], { headers: BROWSER_HEADERS });
      if (!res.ok) {
        return Response.json({ error: "Airbnb listing unreachable" }, {
          status: 502,
        });
      }

      // Read up to 1MB of HTML to find the hydration scripts
      const html = await res.text();

      // 1. Try JSON extraction from __INITIAL_STATE__
      let scraped: Partial<ScrapedListing> = {};
      const stateMatch = html.match(
        /<script[^>]+id="env-setup-init-data"[^>]*>([\s\S]+?)<\/script>/i,
      ) ||
        html.match(/<script[^>]+data-state="true"[^>]*>([\s\S]+?)<\/script>/i);

      if (stateMatch) {
        try {
          const data = JSON.parse(stateMatch[1]);
          // This path varies by Airbnb version, so we check common keys
          const niobe = data.niobeData?.[0]?.data?.presentation
            ?.stayProductDetail?.sections?.sections;
          if (niobe) {
            const titleSection = niobe.find((s: any) =>
              s.sectionId === "TITLE_DEFAULT"
            );
            const photosSection = niobe.find((s: any) =>
              s.sectionId === "PHOTOS_DEFAULT"
            );
            const locationSection = niobe.find((s: any) =>
              s.sectionId === "LOCATION_DEFAULT"
            );

            scraped.name = titleSection?.section?.title;
            scraped.imageUrl = photosSection?.section?.mediaItems?.[0]?.baseUrl;
            scraped.locationName = locationSection?.section?.locationTitle;
          }
        } catch (e) {
          console.warn(
            "[scrape] JSON parse failed, falling back to meta tags",
            e,
          );
        }
      }

      // 2. Fallback to Meta Tags
      const metaName = extractMeta(html, "og:title").replace(
        /\s*[-–|]\s*Airbnb.*$/i,
        "",
      ).trim();
      const metaImage = extractMeta(html, "og:image");
      const metaDesc = extractMeta(html, "og:description");

      const result: ScrapedListing = {
        name: decodeEntities(scraped.name || metaName || "Airbnb Listing"),
        imageUrl: scraped.imageUrl || metaImage || "",
        description: decodeEntities(metaDesc || "Scraped from Airbnb"),
        locationName: decodeEntities(
          scraped.locationName || extractMeta(html, "og:locality") || "",
        ),
        sourceUrl: url,
      };

      if (!result.imageUrl) {
        return Response.json({
          error:
            "Could not find listing photos. Airbnb might be blocking automated access.",
        }, { status: 422 });
      }

      // 3. AI Enrichment Turn (Magic Scrape)
      try {
        const aiResponse = await callGemini({
          prompt: `ORGANIZATION: istay.space
TASK: Refine this scraped airbnb listing into a premium SaaS schema and draft a "Concierge Knowledge Base" markdown block.

DATA:
Title: ${result.name}
Description: ${result.description}
Location: ${result.locationName}

REQUIREMENTS:
1. Identify 5-8 premium amenities (as an array).
2. Write a 2-paragraph "House Vibe & Rules" summary in Markdown for the AI Concierge.
3. Keep the tone sophisticated and professional.

RETURN JSON:
{
  "amenities": ["Amenity 1", "..."],
  "aiKnowledge": "# House Highlights\\n...\\n# House Rules\\n..."
}`,
          systemPrompt:
            "You are the istay AI Onboarding Specialist. Return ONLY valid JSON.",
          jsonMode: true,
        });

        const enrichment = JSON.parse(aiResponse.text);
        result.amenities = enrichment.amenities;
        result.aiKnowledge = enrichment.aiKnowledge;
      } catch (e) {
        console.warn("[scrape] AI Enrichment failed, returning raw data", e);
      }

      // 4. Permanize Image to R2
      try {
        const imgRes = await fetch(result.imageUrl, {
          headers: BROWSER_HEADERS,
        });
        if (imgRes.ok) {
          const buffer = new Uint8Array(await imgRes.arrayBuffer());
          const hash = crypto.randomUUID().slice(0, 8);
          const r2Path = `properties/${hash}.jpg`;

          const publicUrl = await uploadToR2(
            buffer,
            r2Path,
            "image/jpeg",
            true,
          );
          result.imageUrl = publicUrl;
          console.log(`[scrape] Permanized image to R2: ${publicUrl}`);
        }
      } catch (e) {
        console.warn(
          "[scrape] Failed to permanize image, falling back to original URL",
          e,
        );
      }

      return Response.json(result);
    } catch (err) {
      console.error("[scrape] Error:", err);
      return Response.json({ error: "Scraper failed. Please try again." }, {
        status: 500,
      });
    }
  },
};
