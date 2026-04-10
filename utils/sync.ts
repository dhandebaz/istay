// ================================================================
// utils/sync.ts — iCal sync orchestration
//
// Called by:
//   1. Deno.cron every 30 minutes (registered in main.ts)
//   2. GET /api/cron/sync (manual trigger for testing)
// ================================================================

import {
  blockDate,
  getProperty,
  listAllPropertyIndices,
} from "./db.ts";
import { extractBlockedDates } from "./ical.ts";

const ICAL_FETCH_TIMEOUT_MS = 10_000;
const USER_AGENT = "istay/1.0 Calendar Sync (+https://istay.space)";

export interface SyncResult {
  propId: string;
  icsUrl: string;
  /** Number of future dates synced */
  synced: number;
  skipped: boolean;
  error?: string;
}

/**
 * Syncs one property's iCal feed into KV blocked dates.
 *
 * Upsert logic: `blockDate()` writes `["calendar", propId, date]`.
 * Since KV set() is idempotent, re-running never creates duplicates.
 * Past dates are skipped to keep KV lean.
 */
export async function syncPropertyCalendar(
  propId: string,
  icsUrl: string,
): Promise<SyncResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ICAL_FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(icsUrl, {
      headers: {
        "User-Agent": USER_AGENT,
        "Accept": "text/calendar, text/plain, */*",
      },
      signal: controller.signal,
    });

    clearTimeout(timer);

    if (!res.ok) {
      return {
        propId,
        icsUrl,
        synced: 0,
        skipped: false,
        error: `iCal URL returned HTTP ${res.status}`,
      };
    }

    const icsText = await res.text();
    const allDates = extractBlockedDates(icsText);

    const todayStr = new Date().toISOString().slice(0, 10);
    let synced = 0;

    for (const date of allDates) {
      // Only store future (or today's) dates — saves KV space
      if (date < todayStr) continue;
      await blockDate({ propertyId: propId, date, reason: "ical" });
      synced++;
    }

    console.log(`[sync] prop=${propId}: synced ${synced} future dates`);
    return { propId, icsUrl, synced, skipped: false };
  } catch (err) {
    clearTimeout(timer);
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[sync] Error for prop=${propId}:`, message);
    return { propId, icsUrl, synced: 0, skipped: false, error: message };
  }
}

// syncAllProperties — scans all property indices and syncs
// any property that has an icalUrl configured.
// Registered as a Deno.cron job (every 30 min) in main.ts.
export async function syncAllProperties(): Promise<{
  total: number;
  synced: number;
  errors: number;
  results: SyncResult[];
}> {
  const startTime = Date.now();
  console.log(`[sync] Starting full iCal sync at ${new Date().toISOString()}`);

  const indices = await listAllPropertyIndices();
  const results: SyncResult[] = [];
  let total = 0;
  let synced = 0;
  let errors = 0;

  for (const { propId, hostId } of indices) {
    try {
      const prop = await getProperty(hostId, propId);

      if (!prop?.icalUrl) continue; // No iCal configured for this property

      total++;
      const result = await syncPropertyCalendar(propId, prop.icalUrl);
      results.push(result);

      if (result.error) {
        errors++;
      } else {
        synced += result.synced;
      }
    } catch (err) {
      errors++;
      const error = err instanceof Error ? err.message : String(err);
      results.push({
        propId,
        icsUrl: "",
        synced: 0,
        skipped: false,
        error,
      });
    }
  }

  const elapsed = Date.now() - startTime;
  console.log(
    `[sync] Done in ${elapsed}ms | Properties scanned: ${total} | Dates synced: ${synced} | Errors: ${errors}`,
  );

  return { total, synced, errors, results };
}
