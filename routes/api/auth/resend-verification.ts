import { type Handlers } from "$fresh/server.ts";
import { getAuthRecord, saveAuthRecord } from "../../../utils/db.ts";
import { sendVerificationEmail } from "../../../utils/email.ts";
import { parseCookies } from "../../dashboard/_middleware.ts";

export const handler: Handlers = {
  POST: async (req) => {
    // 1. Authenticate via host session cookie
    const cookies = parseCookies(req.headers.get("cookie"));
    const session = cookies["host_session"];

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    let hostId: string;
    try {
      const decoded = decodeURIComponent(session);
      const parts = decoded.split("|");
      hostId = parts[0]?.trim() ?? "";
    } catch {
      hostId = session.trim();
    }

    if (!hostId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      const { email, name } = await req.json();

      if (!email || !name) {
        return Response.json({ error: "Email and name required" }, { status: 400 });
      }

      const lowerEmail = email.toLowerCase();
      const authRecord = await getAuthRecord(lowerEmail);

      if (!authRecord) {
        return Response.json({ error: "Account not found" }, { status: 404 });
      }

      if (authRecord.hostId !== hostId) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
      }

      if (authRecord.emailVerified) {
        return Response.json({ error: "Email is already verified" }, { status: 400 });
      }

      // Generate a fresh 32-byte Verification Token
      const tokenBytes = crypto.getRandomValues(new Uint8Array(24));
      const verifyToken = Array.from(tokenBytes).map(b => b.toString(16).padStart(2, '0')).join('');

      authRecord.verifyToken = verifyToken;
      await saveAuthRecord(authRecord);

      // Dispatch Brevo email in background
      sendVerificationEmail(lowerEmail, name, verifyToken).catch(console.error);

      return Response.json({ ok: true });
    } catch (err) {
      console.error("[auth/resend-verification]", err);
      return Response.json({ error: "Internal server error" }, { status: 500 });
    }
  },
};
