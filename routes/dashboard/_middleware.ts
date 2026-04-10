// ================================================================
// routes/dashboard/_middleware.ts — Auth guard for all /dashboard/* routes
//
// Checks for a "host_session" cookie.
// MVP: The cookie VALUE is used directly as the hostId.
// Production: The value should be an opaque session token looked up in KV.
//
// To test locally, set in DevTools:
//   document.cookie = "host_session=demo_host_123; path=/"
// ================================================================

import { type MiddlewareHandlerContext } from "$fresh/server.ts";
import type { DashboardState } from "../../utils/types.ts";

function parseCookies(cookieHeader: string | null): Record<string, string> {
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

  // TODO (Production): Replace the direct cookie-as-hostId pattern with:
  //   const sessionData = await getSession(session);
  //   if (!sessionData || sessionData.expiresAt < Date.now()) {
  //     return redirect to login;
  //   }
  //   ctx.state.hostId = sessionData.hostId;
  //   ctx.state.hostName = sessionData.hostName;

  // TODO (Production): Load host name from KV
  //   const host = await getHost(session);
  //   ctx.state.hostName = host?.name ?? "Host";

  ctx.state.hostId = session;
  ctx.state.hostName = "Host"; // Overridden by dashboard pages once KV is populated

  return await ctx.next();
}
