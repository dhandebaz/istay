import { type Handlers } from "$fresh/server.ts";
import { getKv } from "../../../utils/db.ts";
import type { AuthRecord } from "../../../utils/types.ts";

export const handler: Handlers = {
  // GET: List all team members for a host
  GET: async (req) => {
    const url = new URL(req.url);
    const hostId = url.searchParams.get("hostId");
    if (!hostId) {
      return Response.json({ error: "Missing hostId" }, { status: 400 });
    }

    const kv = await getKv();
    const members: any[] = [];

    // Auth records are segmented by email, so we need to iterate or use an index
    // For now, we list all auth records (this would be indexed in production)
    const iter = kv.list<AuthRecord>({ prefix: ["auth"] });
    for await (const entry of iter) {
      if (entry.value.hostId === hostId) {
        const { passwordHash, salt, ...safeMember } = entry.value;
        members.push(safeMember);
      }
    }

    return Response.json({ members });
  },
};
