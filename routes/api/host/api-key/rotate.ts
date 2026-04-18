import { type Handlers } from "$fresh/server.ts";
import {
  generateAgencyApiKey,
  getHost,
  saveHost,
} from "../../../../utils/db.ts";

export const handler: Handlers = {
  POST: async (req) => {
    try {
      const { hostId } = await req.json();
      if (!hostId) {
        return Response.json({ error: "Missing hostId" }, { status: 400 });
      }

      const host = await getHost(hostId);
      if (!host) {
        return Response.json({ error: "Host not found" }, { status: 404 });
      }

      // Preserve previous key with a 24-hour grace period
      const legacyApiKey = host.apiKey;
      const legacyApiKeyExpires = legacyApiKey
        ? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        : undefined;

      const newKey = await generateAgencyApiKey();

      await saveHost({
        ...host,
        apiKey: newKey,
        legacyApiKey,
        legacyApiKeyExpires,
      });

      return Response.json({
        apiKey: newKey,
        legacyKeyValidUntil: legacyApiKeyExpires,
      });
    } catch (err) {
      console.error("[api-key/rotate] Error:", err);
      return Response.json({ error: "Internal error" }, { status: 500 });
    }
  },
};
