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

import { getKv } from "../../utils/db.ts";

export function parseCookies(
  cookieHeader: string | null,
): Record<string, string> {
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

  // Parse session cookie: "hostId|hostName|role" (URL-encoded)
  let hostId: string;
  let hostName = "Host";
  let role: "owner" | "manager" | "staff" | "accountant" = "owner";

  try {
    const decoded = decodeURIComponent(session);
    const parts = decoded.split("|");
    hostId = parts[0]?.trim() ?? "";
    if (parts[1]) hostName = parts[1].trim();
    if (parts[2]) role = parts[2].trim() as any;
  } catch {
    hostId = session.trim();
  }

  if (!hostId) {
    return new Response(null, {
      status: 302,
      headers: { Location: "/?auth=invalid" },
    });
  }

  // Path-based RBAC enforcement
  const url = new URL(req.url);
  const path = url.pathname;

  // ── ROLE GATE LOGIC ──────────────────────────────────────────
  if (role === "accountant") {
    // Accountants only see Ledger and Financials
    const allowed = ["/dashboard", "/dashboard/ledger", "/dashboard/settings"]; // Settings for their own profile
    if (!allowed.includes(path) && !path.startsWith("/dashboard/api")) {
      return new Response("Forbidden: Accountant role has restricted access.", {
        status: 403,
      });
    }
  } else if (role === "staff") {
    // Staff see Operations, no Financials
    const forbidden = ["/dashboard/ledger"];
    if (forbidden.includes(path)) {
      return new Response(
        "Forbidden: Staff role cannot access financial data.",
        { status: 403 },
      );
    }
  }

  // Try to load host from KV to verify they exist and get latest state
  let emailVerified = true;
  let hostEmail = "";
  try {
    const kv = await getKv();
    const hostEntry = await kv.get(["host", hostId]);
    if (hostEntry.value) {
      const host = hostEntry.value as any;
      hostName = host.name ?? hostName;
      hostEmail = host.email;

      if (host.setupFeePaid === false) {
        return new Response(null, {
          status: 302,
          headers: { Location: `/pricing?auth=onboarding_incomplete` },
        });
      }

      // Final Role Verification (if cookie role is missing/suspect)
      const authEntry = await kv.get(["auth", hostEmail.toLowerCase()]);
      if (authEntry.value) {
        const auth = authEntry.value as any;
        emailVerified = auth.emailVerified ?? true;
        // If the session matches the primary host email, ensure role is owner
        if (auth.email.toLowerCase() === hostEmail.toLowerCase()) {
          role = "owner";
        }
      }
    }
  } catch (err) {
    console.warn("[middleware] KV lookup failed:", err);
  }

  ctx.state.hostId = hostId;
  ctx.state.hostName = hostName;
  ctx.state.hostEmail = hostEmail;
  ctx.state.role = role;
  ctx.state.emailVerified = emailVerified;

  return await ctx.next();
}
