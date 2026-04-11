// ================================================================
// routes/api/scrape.ts — Magic Airbnb Listing Scraper
//
// POST /api/scrape
// Body: { url: string }  (must be an Airbnb listing URL)
// Returns: ScrapedListing | { error: string }
//
// Strategy: Fetch with browser-spoofing headers, extract OG meta tags
// via regex. No DOM parser needed — OG tags are in the <head>.
// ================================================================

import { type Handlers } from "$fresh/server.ts";
import type { ScrapedListing } from "../../utils/types.ts";

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
  "Accept-Encoding": "gzip, deflate, br",
  "Cache-Control": "no-cache",
  "Pragma": "no-cache",
  "Referer": "https://www.google.com/",
  "Sec-Fetch-Dest": "document",
  "Sec-Fetch-Mode": "navigate",
  "Sec-Fetch-Site": "cross-site",
  "Sec-Fetch-User": "?1",
  "Upgrade-Insecure-Requests": "1",
};

function isAllowedAirbnbUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      (parsed.protocol === "https:" || parsed.protocol === "http:") &&
      ALLOWED_HOSTNAMES.some(
        (host) =>
          parsed.hostname === host || parsed.hostname.endsWith(`.${host}`),
      )
    );
  } catch {
    return false;
  }
}

/**
 * Extracts a meta tag's content from raw HTML.
 * Handles both attribute orderings:
 *   <meta property="og:title" content="...">
 *   <meta content="..." property="og:title">
 */
function extractMeta(html: string, property: string): string {
  const escaped = property.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // property/name before content
  const forwardRx = new RegExp(
    `<meta[^>]+(?:property|name)=["']${escaped}["'][^>]+content=["']([^"']+)["']`,
    "i",
  );
  // content before property/name
  const reverseRx = new RegExp(
    `<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${escaped}["']`,
    "i",
  );

  return (
    html.match(forwardRx)?.[1] ?? html.match(reverseRx)?.[1] ?? ""
  ).trim();
}

/** Decode HTML entities from extracted text */
function decodeEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

export const handler: Handlers = {
  POST: async (req) => {
    let body: { url?: unknown };
    try {
      body = await req.json();
    } catch {
      return Response.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { url } = body;

    if (!url || typeof url !== "string") {
      return Response.json(
        { error: "url is required and must be a string" },
        { status: 400 },
      );
    }

    if (!isAllowedAirbnbUrl(url)) {
      return Response.json(
        {
          error:
            "Only Airbnb listing URLs are supported (airbnb.com, airbnb.in, etc.)",
        },
        { status: 400 },
      );
    }

    // Ensure it looks like a room/listing URL
    if (!url.includes("/rooms/") && !url.includes("/h/")) {
      return Response.json(
        {
          error:
            'URL does not look like an Airbnb listing. Make sure it contains "/rooms/" in the path.',
        },
        { status: 400 },
      );
    }

    try {
      const res = await fetch(url, {
        headers: BROWSER_HEADERS,
        redirect: "follow",
      });

      if (res.status === 403 || res.status === 429) {
        return Response.json(
          {
            error:
              "Airbnb blocked the request (rate limit). Please wait 30 seconds and try again.",
            retryable: true,
          },
          { status: 429 },
        );
      }

      if (!res.ok) {
        return Response.json(
          {
            error: `Airbnb returned HTTP ${res.status}. The listing may be private, removed, or unavailable in your region.`,
          },
          { status: 502 },
        );
      }

      // Only read the first 100KB — OG tags are always in <head>
      const reader = res.body?.getReader();
      let html = "";
      const MAX_BYTES = 100 * 1024;
      let bytesRead = 0;

      if (reader) {
        const decoder = new TextDecoder();
        while (bytesRead < MAX_BYTES) {
          const { done, value } = await reader.read();
          if (done) break;
          html += decoder.decode(value, { stream: true });
          bytesRead += value.byteLength;
          // Stop once we're past </head> — no need to read the full page
          if (html.includes("</head>")) break;
        }
        reader.cancel();
      } else {
        html = await res.text();
      }

      const rawName = extractMeta(html, "og:title");
      const rawImage = extractMeta(html, "og:image");
      const rawDesc = extractMeta(html, "og:description");

      if (!rawName) {
        return Response.json(
          {
            error:
              "Could not extract listing data. Airbnb may have returned a CAPTCHA page. Try again in a few seconds.",
            retryable: true,
          },
          { status: 422 },
        );
      }

      // Clean up name — remove Airbnb suffix and decode entities
      const name = decodeEntities(
        rawName.replace(/\s*[-–|]\s*Airbnb.*$/i, "").trim(),
      );
      const description = decodeEntities(rawDesc);
      const imageUrl = rawImage;

      const result: ScrapedListing = {
        name,
        imageUrl,
        description,
        sourceUrl: url,
      };

      return Response.json(result);
    } catch (err) {
      console.error("[scrape] fetch error:", err);
      return Response.json(
        {
          error: "Failed to reach Airbnb. Check your network connection and the URL.",
          retryable: true,
        },
        { status: 502 },
      );
    }
  },
};
