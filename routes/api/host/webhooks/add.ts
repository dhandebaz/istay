import { type Handlers } from "$fresh/server.ts";
import { addWebhook, generateWebhookSecret } from "../../../../utils/db.ts";
import type { WebhookConfig } from "../../../../utils/types.ts";

export const handler: Handlers = {
  POST: async (req) => {
    try {
      const { hostId, url, event } = await req.json();
      if (!hostId || !url || !event) {
        return Response.json({ error: "Missing fields" }, { status: 400 });
      }

      const newWebhook: WebhookConfig = {
        id: crypto.randomUUID().replace(/-/g, "").slice(0, 8),
        url,
        event: event as WebhookConfig["event"],
        secret: await generateWebhookSecret(),
        active: true,
      };

      await addWebhook(hostId, newWebhook);

      return Response.json({ ok: true, webhook: newWebhook });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Internal error";
      const status = message.includes("not found") ? 404 : 500;
      return Response.json({ error: message }, { status });
    }
  },
};
