import { type Handlers } from "$fresh/server.ts";
import { listPublicProperties } from "../../../utils/db.ts";

export const handler: Handlers = {
  GET: async (_req) => {
    try {
      const properties = await listPublicProperties();
      return Response.json(properties);
    } catch (err) {
      console.error("[listings] fetch error:", err);
      return Response.json({ error: "Failed to fetch listings" }, { status: 500 });
    }
  },
};
