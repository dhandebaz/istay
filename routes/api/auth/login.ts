import { type Handlers } from "$fresh/server.ts";
import { getAuthRecord, getHost, hashPassword } from "../../../utils/db.ts";

export const handler: Handlers = {
  POST: async (req) => {
    try {
      const body = await req.json();
      const { email, password } = body;

      if (!email || !password) {
        return Response.json({ error: "Email and password are required" }, {
          status: 400,
        });
      }

      const lowerEmail = email.toLowerCase();
      const authRecord = await getAuthRecord(lowerEmail);

      if (!authRecord) {
        return Response.json({ error: "Invalid credentials" }, { status: 401 });
      }

      // Hash the provided password with the stored salt
      const { hash } = await hashPassword(password, authRecord.salt);

      if (hash !== authRecord.passwordHash) {
        return Response.json({ error: "Invalid credentials" }, { status: 401 });
      }

      const host = await getHost(authRecord.hostId);
      if (!host) {
        return Response.json({ error: "Host profile not found" }, {
          status: 404,
        });
      }

      // Generate Session cookie
      const sessionValue = encodeURIComponent(`${host.id}|${host.name}`);

      const headers = new Headers();
      headers.set("Content-Type", "application/json");
      headers.set(
        "Set-Cookie",
        `host_session=${sessionValue}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`, // 30 days
      );

      // Tell frontend where to route (if they haven't paid logic)
      const redirectUrl = host.subscriptionStatus === "active" ? "/dashboard" : "/pricing";

      return new Response(JSON.stringify({ ok: true, redirectUrl }), {
        status: 200,
        headers,
      });
    } catch (err) {
      console.error("[auth/login]", err);
      return Response.json({ error: "Internal server error" }, { status: 500 });
    }
  },
};
