// ================================================================
// utils/sync.ts — iCal sync orchestration
//
// Called by:
//   1. Deno.cron every 30 minutes (registered in main.ts)
//   2. GET /api/cron/sync (manual trigger for testing)
//
// Performance notes:
//   - listBlockedDates() is called ONCE per sync (not twice)
//   - Orphan deletions + new blocks batched via kv.atomic()
//   - Past dates are skipped to keep KV lean
// ================================================================

import {
  getKv,
  getProperty,
  listAllPropertyIndices,
  listBlockedDates,
} from "./db.ts";
import { extractBlockedDates } from "./ical.ts";
import { type CalendarBlock } from "./types.ts";

const ICAL_FETCH_TIMEOUT_MS = 10_000;
const USER_AGENT = "istay/1.0 Calendar Sync (+https://istay.space)";

/** Deno KV atomic() supports max 10 mutations per transaction */
const KV_ATOMIC_BATCH_SIZE = 10;

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

    // ── Differential Sync Logic ──
    // 1. Fetch ALL current blocks ONCE (eliminates the redundant second read)
    const allBlocks = await listBlockedDates(propId);

    const icalBlocks = allBlocks.filter(
      (b) => b.reason === "ical" && b.date >= todayStr,
    );
    const currentIcalDates = new Set(icalBlocks.map((b) => b.date));

    // Build a quick lookup of ALL existing blocks (any reason) for precedence checks
    const existingByDate = new Map(allBlocks.map((b) => [b.date, b]));

    const newDates = new Set(allDates.filter((d) => d >= todayStr));

    // 2. Identify dates to remove (in KV as ical but not in fresh feed)
    const datesToDelete = [...currentIcalDates].filter((d) => !newDates.has(d));

    // 3. Identify dates to upsert (skip manual_block and booked — operational precedence)
    const datesToAdd: string[] = [];
    for (const date of newDates) {
      const existing = existingByDate.get(date);
      if (
        existing &&
        (existing.reason === "manual_block" || existing.reason === "booked")
      ) {
        continue;
      }
      datesToAdd.push(date);
    }

    // 4. Batch writes via kv.atomic() — up to 10 mutations per transaction
    const kv = await getKv();

    // Batch deletions
    for (let i = 0; i < datesToDelete.length; i += KV_ATOMIC_BATCH_SIZE) {
      const batch = datesToDelete.slice(i, i + KV_ATOMIC_BATCH_SIZE);
      const atomic = kv.atomic();
      for (const date of batch) {
        atomic.delete(["calendar", propId, date]);
      }
      await atomic.commit();
    }

    // Batch additions
    for (let i = 0; i < datesToAdd.length; i += KV_ATOMIC_BATCH_SIZE) {
      const batch = datesToAdd.slice(i, i + KV_ATOMIC_BATCH_SIZE);
      const atomic = kv.atomic();
      for (const date of batch) {
        const block: CalendarBlock = {
          propertyId: propId,
          date,
          reason: "ical",
        };
        atomic.set(["calendar", propId, date], block);
      }
      await atomic.commit();
    }

    console.log(
      `[sync] prop=${propId}: synced ${datesToAdd.length} dates, removed ${datesToDelete.length} orphaned blocks`,
    );
    return { propId, icsUrl, synced: datesToAdd.length, skipped: false };
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
