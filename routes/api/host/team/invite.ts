import { type Handlers } from "$fresh/server.ts";
import { getKv } from "../../../../utils/db.ts";
import type { AuthRecord } from "../../../../utils/types.ts";

export const handler: Handlers = {
  POST: async (req) => {
    try {
      const { hostId, email, role, name } = await req.json();
      if (!hostId || !email || !role) {
        return Response.json({ error: "Missing required fields" }, { status: 400 });
      }

      const kv = await getKv();
      const emailLower = email.toLowerCase();
      
      // Check if user already exists
      const existing = await kv.get<AuthRecord>(["auth", emailLower]);
      if (existing.value) {
        // If they exist but belong to another host, we might want to allow multi-tenancy later,
        // but for Phase 8 we'll assume 1 host per email.
        if (existing.value.hostId !== hostId) {
          return Response.json({ error: "This email is already registered with another organization" }, { status: 400 });
        }
        return Response.json({ error: "Member already exists in your team" }, { status: 400 });
      }

      // Create new AuthRecord with temporary password
      // In a real app, we'd send an email. For this demo, password is 'istay2026'
      const tempPassword = "istay" + Math.random().toString(36).slice(-4);
      const salt = crypto.randomUUID().slice(0, 8);
      
      const newAuth: AuthRecord = {
        hostId,
        email: emailLower,
        passwordHash: "TEMPORARY_SET_DURING_INVITE", // In a real flow, we'd hash tempPassword
        salt,
        role: role as any,
        emailVerified: false,
      };

      await kv.set(["auth", emailLower], newAuth);

      return Response.json({ ok: true, tempPassword });
    } catch (err) {
      return Response.json({ error: "Server error" }, { status: 500 });
    }
  }
};
