import { type Handlers } from "$fresh/server.ts";
import { getAuthRecord, saveAuthRecord } from "../../../utils/db.ts";
import { sendPasswordResetEmail } from "../../../utils/email.ts";

export const handler: Handlers = {
  POST: async (req) => {
    try {
      const { email } = await req.json();

      if (!email) {
        return Response.json({ error: "Email is required" }, { status: 400 });
      }

      const lowerEmail = email.toLowerCase();
      const authRecord = await getAuthRecord(lowerEmail);

      // We still return true to prevent email enumeration attacks
      if (!authRecord) {
        return Response.json({ ok: true });
      }

      // Generate a reset token (simple secure hex for now)
      const tokenBytes = crypto.getRandomValues(new Uint8Array(24));
      const token = Array.from(tokenBytes).map(b => b.toString(16).padStart(2, '0')).join('');
      
      authRecord.resetToken = token;
      // Expires in 1 hour
      authRecord.resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000).toISOString();
      
      await saveAuthRecord(authRecord);

      // Dispatch physical email via Brevo
      const hostName = authRecord.email.split("@")[0]; // Fast fallback if host profile missing in memory
      sendPasswordResetEmail(lowerEmail, hostName, token).catch(console.error);

      return Response.json({ ok: true });

    } catch (err) {
      console.error("[auth/forgot]", err);
      return Response.json({ error: "Internal server error" }, { status: 500 });
    }
  },
};
