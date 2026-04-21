import { FreshContext } from "$fresh/server.ts";

// ── Security Headers ──────────────────────────────────────────
const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
};

// ── Rate Limiting Config ──────────────────────────────────────
const RATE_LIMIT_MAX = 60; // max requests per window
const RATE_LIMIT_WINDOW_MS = 60_000; // 1-minute sliding window

/**
 * Extracts the client IP from common proxy headers or falls back to
 * the remote address. Returns a stable string for KV key usage.
 */
function getClientIp(req: Request, ctx: FreshContext): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    (ctx.remoteAddr as Deno.NetAddr)?.hostname ||
    "unknown"
  );
}

export async function handler(
  req: Request,
  ctx: FreshContext,
) {
  try {
    const url = new URL(req.url);

    // Exclude static files from processing to keep latency minimal
    if (url.pathname.includes(".") || url.pathname.startsWith("/_fresh")) {
      return await ctx.next();
    }

    console.log(`[request] ${req.method} ${url.pathname}`);

    // ── IP-based Rate Limiting for /api/* ──────────────────────
    if (url.pathname.startsWith("/api/")) {
      try {
        const { getKv } = await import("../utils/db.ts");
        const kv = await getKv();
        const ip = getClientIp(req, ctx);
        const windowKey = Math.floor(Date.now() / RATE_LIMIT_WINDOW_MS)
          .toString();
        const kvKey: Deno.KvKey = ["rate_limit", ip, windowKey];

        const current = await kv.get<number>(kvKey);
        const count = (current.value ?? 0) + 1;

        // Update counter with 2-minute expiry (auto-cleanup)
        await kv.set(kvKey, count, { expireIn: 2 * 60 * 1000 });

        if (count > RATE_LIMIT_MAX) {
          const retryAfter = Math.ceil(RATE_LIMIT_WINDOW_MS / 1000);
          return new Response(
            JSON.stringify({ error: "Too many requests. Please slow down." }),
            {
              status: 429,
              headers: {
                "Content-Type": "application/json",
                "Retry-After": String(retryAfter),
                ...SECURITY_HEADERS,
              },
            },
          );
        }
      } catch (err) {
        // Rate limiting is non-critical — log and continue if KV fails
        console.warn("[rate-limit] Error checking rate limit:", err);
      }
    }

    const resp = await ctx.next();

    if (resp.status === 403) {
      console.warn(`[403-DEBUG] Forbidden access to ${url.pathname}`);
    }

    // Inject security headers into every response
    const secureResp = new Response(resp.body, resp);
    for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
      secureResp.headers.set(key, value);
    }

    return secureResp;
  } catch (err) {
    console.error(`[root-middleware-crash] Critical failure:`, err);
    return await ctx.next(); // Fallback: try to continue even if middleware fails
  }
}
