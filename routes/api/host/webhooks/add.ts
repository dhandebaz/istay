import { type Handlers } from "$fresh/server.ts";
import { getKv, getHost, saveHost, generateWebhookSecret } from "../../../../utils/db.ts";
import type { Host, WebhookConfig } from "../../../../utils/types.ts";

export const handler: Handlers = {
  POST: async (req) => {
    try {
      const { hostId, url, event } = await req.json();
      if (!hostId || !url || !event) return Response.json({ error: "Missing fields" }, { status: 400 });

      const host = await getHost(hostId);
      if (!host) return Response.json({ error: "Host not found" }, { status: 404 });

      const newWebhook: WebhookConfig = {
        id: crypto.randomUUID().replace(/-/g, "").slice(0, 8),
        url,
        event: event as any,
        secret: await generateWebhookSecret(),
        active: true,
      };

      const webhooks = host.webhooks || [];
      webhooks.push(newWebhook);

      await saveHost({ ...host, webhooks });

      return Response.json({ ok: true, webhook: newWebhook });
    } catch (err) {
      return Response.json({ error: "Internal error" }, { status: 500 });
    }
  }
};
