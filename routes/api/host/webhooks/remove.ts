import { type Handlers } from "$fresh/server.ts";
import { removeWebhook } from "../../../../utils/db.ts";

export const handler: Handlers = {
  POST: async (req) => {
    try {
      const { hostId, webhookId } = await req.json();
      if (!hostId || !webhookId) {
        return Response.json({ error: "Missing fields" }, { status: 400 });
      }

      await removeWebhook(hostId, webhookId);

      return Response.json({ ok: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Internal error";
      const status = message.includes("not found") ? 404 : 500;
      return Response.json({ error: message }, { status });
    }
  }
};
