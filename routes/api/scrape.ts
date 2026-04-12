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

const ALLOWED_HOSTNAMES = [
  "airbnb.com", "airbnb.in", "airbnb.co.uk", "airbnb.com.au", 
  "airbnb.ca", "airbnb.fr", "airbnb.de",
];

const BROWSER_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
  "Cache-Control": "no-cache",
  "Sec-Fetch-Dest": "document",
  "Sec-Fetch-Mode": "navigate",
  "Sec-Fetch-Site": "cross-site",
};

function isAllowedAirbnbUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ALLOWED_HOSTNAMES.some(h => parsed.hostname === h || parsed.hostname.endsWith(`.${h}`));
  } catch { return false; }
}

function decodeEntities(str: string): string {
  return str.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}

function extractMeta(html: string, property: string): string {
  const rx = new RegExp(`<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"']+)["']`, "i");
  const rxRev = new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${property}["']`, "i");
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
      if (!res.ok) return Response.json({ error: "Airbnb listing unreachable" }, { status: 502 });

      // Read up to 1MB of HTML to find the hydration scripts
      const html = await res.text();

      // 1. Try JSON extraction from __INITIAL_STATE__
      let scraped: Partial<ScrapedListing> = {};
      const stateMatch = html.match(/<script[^>]+id="env-setup-init-data"[^>]*>([\s\S]+?)<\/script>/i) ||
                         html.match(/<script[^>]+data-state="true"[^>]*>([\s\S]+?)<\/script>/i);

      if (stateMatch) {
        try {
          const data = JSON.parse(stateMatch[1]);
          // This path varies by Airbnb version, so we check common keys
          const niobe = data.niobeData?.[0]?.data?.presentation?.stayProductDetail?.sections?.sections;
          if (niobe) {
            const titleSection = niobe.find((s: any) => s.sectionId === "TITLE_DEFAULT");
            const photosSection = niobe.find((s: any) => s.sectionId === "PHOTOS_DEFAULT");
            const locationSection = niobe.find((s: any) => s.sectionId === "LOCATION_DEFAULT");
            
            scraped.name = titleSection?.section?.title;
            scraped.imageUrl = photosSection?.section?.mediaItems?.[0]?.baseUrl;
            scraped.locationName = locationSection?.section?.locationTitle;
          }
        } catch (e) {
          console.warn("[scrape] JSON parse failed, falling back to meta tags", e);
        }
      }

      // 2. Fallback to Meta Tags
      const metaName = extractMeta(html, "og:title").replace(/\s*[-–|]\s*Airbnb.*$/i, "").trim();
      const metaImage = extractMeta(html, "og:image");
      const metaDesc = extractMeta(html, "og:description");

      const result: ScrapedListing = {
        name: decodeEntities(scraped.name || metaName || "Airbnb Listing"),
        imageUrl: scraped.imageUrl || metaImage || "",
        description: decodeEntities(metaDesc || "Scraped from Airbnb"),
        locationName: decodeEntities(scraped.locationName || extractMeta(html, "og:locality") || ""),
        sourceUrl: url,
      };

      if (!result.imageUrl) {
        return Response.json({ error: "Could not find listing photos. Airbnb might be blocking automated access." }, { status: 422 });
      }

      return Response.json(result);
    } catch (err) {
      console.error("[scrape] Error:", err);
      return Response.json({ error: "Scraper failed. Please try again." }, { status: 500 });
    }
  },
};
