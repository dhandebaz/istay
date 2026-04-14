import { type Handlers } from "$fresh/server.ts";
import { getHost, saveHost, generateAgencyApiKey } from "../../../../utils/db.ts";

export const handler: Handlers = {
  POST: async (req) => {
    try {
      const { hostId } = await req.json();
      if (!hostId) return Response.json({ error: "Missing hostId" }, { status: 400 });

      const host = await getHost(hostId);
      if (!host) return Response.json({ error: "Host not found" }, { status: 404 });

      const newKey = await generateAgencyApiKey();
      await saveHost({ ...host, apiKey: newKey });

      return Response.json({ apiKey: newKey });
    } catch (err) {
      return Response.json({ error: "Internal error" }, { status: 500 });
    }
  }
};
