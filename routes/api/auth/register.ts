import { type Handlers } from "$fresh/server.ts";
import { getAuthRecord, saveAuthRecord, saveHost, hashPassword } from "../../../utils/db.ts";
import { sendVerificationEmail } from "../../../utils/email.ts";

export const handler: Handlers = {
  POST: async (req) => {
    try {
      const body = await req.json();
      const { email, password, name, phone } = body;

      if (!email || !password || !name || !phone) {
        return Response.json({ error: "All fields are required" }, { status: 400 });
      }

      const lowerEmail = email.toLowerCase();

      // Check if user already exists
      const existing = await getAuthRecord(lowerEmail);
      if (existing) {
        return Response.json({ error: "Email already registered" }, { status: 409 });
      }

      // Hash password
      const { hash, salt } = await hashPassword(password);
      const hostId = crypto.randomUUID();

      // Save Host Profile
      await saveHost({
        id: hostId,
        email: lowerEmail,
        name: name.trim(),
        phone: phone.trim(),
        plan: "lifetime",
        setupFeePaid: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      // Generate 32-byte Verification Token
      const tokenBytes = crypto.getRandomValues(new Uint8Array(24));
      const verifyToken = Array.from(tokenBytes).map(b => b.toString(16).padStart(2, '0')).join('');

      // Save Auth Record
      await saveAuthRecord({
        hostId,
        email: lowerEmail,
        passwordHash: hash,
        salt,
        emailVerified: false,
        verifyToken,
      });

      // Dispatch Brevo email in background (no await blocking)
      sendVerificationEmail(lowerEmail, name.trim(), verifyToken).catch(console.error);

      // Generate Session secure cookie (HTTP-only should be parsed correctly, but for simplicity we match existing _middleware logic)
      const sessionValue = encodeURIComponent(`${hostId}|${name.trim()}`);
      
      const headers = new Headers();
      headers.set("Content-Type", "application/json");
      headers.set(
        "Set-Cookie",
        `host_session=${sessionValue}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000` // 30 days
      );

      return new Response(JSON.stringify({ ok: true, hostId }), {
        status: 200,
        headers,
      });

    } catch (err) {
      console.error("[auth/register]", err);
      return Response.json({ error: "Internal server error" }, { status: 500 });
    }
  },
};
