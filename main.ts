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

import { scrubOldPii } from "./utils/db.ts";

/**
 * PHASE 8: INSTITUTIONAL COMPLIANCE & EDGE WARMUP
 * Automated background operations for agency scaling.
 */

// 1. PII Scrubbing Loop (Daily 2 AM IST)
Deno.cron("PII Retention Scrubbing", "30 20 * * *", async () => {
  console.log("[cron] Starting daily PII scrub...");
  const { scrubbedCount } = await scrubOldPii();
  console.log(`[cron] Scrubbing complete. Records sanitized: ${scrubbedCount}`);
});

// 2. Monthly Performance Statements (1st of every month at 8 AM IST)
Deno.cron("Monthly Performance Statements", "30 2 * 1 *", async () => {
  console.log("[cron] Starting monthly reporting run...");
  const { listAllHosts, saveNotification } = await import("./utils/db.ts");
  const { generateMonthlyStatement } = await import("./utils/reports.ts");
  
  const now = new Date();
  const prevDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const month = prevDate.toISOString().slice(0, 7);

  const hosts = await listAllHosts();
  for (const host of hosts) {
    try {
      const statement = await generateMonthlyStatement(host.id, month);
      await saveNotification({
        id: crypto.randomUUID(),
        hostId: host.id,
        type: "booking_confirmed", // Reusing established type for critical finance
        title: `Monthly Growth Statement — ${month}`,
        message: `Your performance statement for ${month} is ready. Total Revenue: 95% share credited.`,
        propertyName: "Platform Analytics",
        meta: { statement, month },
        read: false,
        createdAt: now.toISOString(),
      });
      console.log(`[cron] Report generated for host=${host.id}`);
    } catch (err) {
      console.error(`[cron] Failed reporting for host=${host.id}:`, err);
    }
  }
});

// 3. Edge Warmup (Every 15 mins)
Deno.cron("Edge Warmup", "*/15 * * * *", async () => {
  console.log("[cron] Warming up edge worker...");
  await fetch("https://istay.space/api/public/health").catch(() => {});
});

await start(manifest, config);
