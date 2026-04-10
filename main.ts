/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />

import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";
import config from "./fresh.config.ts";
import { syncAllProperties } from "./utils/sync.ts";

// ── iCal Cron — runs every 30 minutes ─────────────────────────
// Requires --unstable-cron flag (already in deno.json tasks).
// On Deno Deploy, this is natively supported without the flag.
Deno.cron("ical-sync", "*/30 * * * *", async () => {
  try {
    const result = await syncAllProperties();
    console.log(
      `[cron] iCal sync complete: ${result.synced} dates synced across ${result.total} properties`,
    );
  } catch (err) {
    console.error("[cron] iCal sync failed:", err);
  }
});

await start(manifest, config);
