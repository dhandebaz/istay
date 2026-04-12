// ================================================================
// routes/dashboard/_middleware.ts — Auth guard for all /dashboard/* routes
//
// Checks for a "host_session" cookie.
// Format: "hostId|hostName" (URL-encoded)
//
// Loads host data from KV to verify the session is valid.
//
// To test locally, set in DevTools:
//   document.cookie = "host_session=demo_host_123|Demo%20Host; path=/"
// ================================================================

import { type MiddlewareHandlerContext } from "$fresh/server.ts";
import type { DashboardState } from "../../utils/types.ts";

const getKv = (() => {
  let kv: Deno.Kv | null = null;
  return async () => {
    if (!kv) kv = await Deno.openKv();
    return kv;
  };
})();

export function parseCookies(cookieHeader: string | null): Record<string, string> {
  const result: Record<string, string> = {};
  if (!cookieHeader) return result;
  for (const pair of cookieHeader.split(";")) {
    const [key, ...valueParts] = pair.trim().split("=");
    if (key?.trim()) {
      result[key.trim()] = valueParts.join("=").trim();
    }
  }
  return result;
}

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<DashboardState>,
) {
  const cookies = parseCookies(req.headers.get("cookie"));
  const session = cookies["host_session"];

  if (!session || session.trim().length === 0) {
    const redirectTo = new URL(req.url).pathname;
    return new Response(null, {
      status: 302,
      headers: {
        Location: `/?auth=required&redirect=${encodeURIComponent(redirectTo)}`,
      },
    });
  }

  // Parse session cookie: "hostId|hostName" (URL-encoded)
  let hostId: string;
  let hostName = "Host";

  try {
    const decoded = decodeURIComponent(session);
    const parts = decoded.split("|");
    hostId = parts[0]?.trim() ?? "";
    if (parts[1]) {
      hostName = parts[1].trim();
    }
  } catch {
    hostId = session.trim();
  }

  if (!hostId) {
    return new Response(null, {
      status: 302,
      headers: { Location: "/?auth=invalid" },
    });
  }

  // Try to load host from KV to verify they exist and get latest name and setupFee status
  // Also load AuthRecord to check email verification status
  let emailVerified = true; // Default true if schema missing
  let hostEmail = "";
  try {
    const kv = await getKv();
    const hostEntry = await kv.get(["host", hostId]);
    if (hostEntry.value) {
      const host = hostEntry.value as { email: string; name?: string; setupFeePaid?: boolean };
      hostName = host.name ?? hostName;
      hostEmail = host.email;
      
      // Crucial part of Onboarding sync: if not paid, route them out of dashboard to pricing
      if (host.setupFeePaid === false) {
          const redirectTo = new URL(req.url).pathname;
          return new Response(null, {
            status: 302,
            headers: {
              Location: `/pricing?auth=onboarding_incomplete&redirect=${encodeURIComponent(redirectTo)}`,
            },
          });
      }

      // Check Email Verification
      const authEntry = await kv.get(["auth", host.email.toLowerCase()]);
      if (authEntry.value) {
        const authRecord = authEntry.value as { emailVerified?: boolean };
        emailVerified = authRecord.emailVerified ?? true; // if missing, assume old account which is verified
      }
    }
  } catch (err) {
    console.warn("[middleware] KV lookup failed, using cookie data:", err);
  }

  ctx.state.hostId = hostId;
  ctx.state.hostName = hostName;
  ctx.state.hostEmail = hostEmail;
  ctx.state.emailVerified = emailVerified;

  return await ctx.next();
}
