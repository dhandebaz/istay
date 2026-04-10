// ================================================================
// routes/api/cron/sync.ts — Manual iCal sync trigger
//
// GET /api/cron/sync?secret=CRON_SECRET
// Also used internally for testing without waiting 30 minutes.
// ================================================================

import { type Handlers } from "$fresh/server.ts";
import { syncAllProperties } from "../../../utils/sync.ts";

const CRON_SECRET = Deno.env.get("CRON_SECRET");

export const handler: Handlers = {
  async GET(req) {
    // Basic secret guard (optional — set CRON_SECRET in .env)
    if (CRON_SECRET) {
      const url = new URL(req.url);
      const providedSecret = url.searchParams.get("secret");
      if (providedSecret !== CRON_SECRET) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const start = Date.now();

    try {
      const result = await syncAllProperties();
      return Response.json({
        ok: true,
        elapsed_ms: Date.now() - start,
        ...result,
      });
    } catch (err) {
      console.error("[/api/cron/sync] Error:", err);
      return Response.json(
        { error: "Sync failed", details: String(err) },
        { status: 500 },
      );
    }
  },
};
