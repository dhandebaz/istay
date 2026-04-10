// ================================================================
// utils/ical.ts — Lightweight iCal (RFC 5545) parser
//
// No external dependencies. Uses regex-based extraction.
// Handles Airbnb, Booking.com, and Google Calendar iCal feeds.
// ================================================================

export interface ICalEvent {
  /** Inclusive start date (YYYY-MM-DD) */
  startDate: string;
  /** Exclusive end date per RFC 5545 (YYYY-MM-DD). A 1-night stay has DTEND = DTSTART+1 */
  endDate: string;
  summary?: string;
  uid?: string;
}

/**
 * Parses a DTSTART or DTEND line value into a YYYY-MM-DD string.
 *
 * Handles all common iCal date formats:
 *   DTSTART:20240101             → "2024-01-01"  (date-only)
 *   DTSTART:20240101T120000Z     → "2024-01-01"  (UTC datetime)
 *   DTSTART;TZID=Asia/K:20240101T180000 → "2024-01-01"  (zoned datetime)
 *   DTSTART;VALUE=DATE:20240101  → "2024-01-01"  (explicit date type)
 */
function parseICalLine(line: string): string | null {
  const colonIdx = line.indexOf(":");
  if (colonIdx === -1) return null;

  const value = line.slice(colonIdx + 1).trim();
  const match = value.match(/^(\d{4})(\d{2})(\d{2})/);
  if (!match) return null;

  return `${match[1]}-${match[2]}-${match[3]}`;
}

/**
 * Enumerates all dates from start (inclusive) to end (exclusive).
 *
 * Per RFC 5545, DTEND is exclusive:
 *   DTSTART=2024-01-01, DTEND=2024-01-03 → blocks 2024-01-01, 2024-01-02
 */
export function enumerateDateRange(start: string, end: string): string[] {
  const dates: string[] = [];
  const current = new Date(start + "T00:00:00Z");
  const endDate = new Date(end + "T00:00:00Z");

  while (current < endDate) {
    dates.push(current.toISOString().slice(0, 10));
    current.setUTCDate(current.getUTCDate() + 1);
  }

  return dates;
}

/**
 * Parses a raw iCal string into an array of ICalEvent objects.
 * Handles line-folding (RFC 5545 §3.1) and CRLF/LF line endings.
 */
export function parseICal(icsText: string): ICalEvent[] {
  const events: ICalEvent[] = [];

  // Unfold long lines: CRLF followed by space/tab is a continuation
  const unfolded = icsText.replace(/\r?\n[ \t]/g, "");

  // Extract all VEVENT blocks
  const blockRegex = /BEGIN:VEVENT([\s\S]*?)END:VEVENT/g;
  let blockMatch: RegExpExecArray | null;

  while ((blockMatch = blockRegex.exec(unfolded)) !== null) {
    const block = blockMatch[1];
    const lines = block.split(/\r?\n/);

    let startDate: string | null = null;
    let endDate: string | null = null;
    let summary: string | undefined;
    let uid: string | undefined;

    for (const line of lines) {
      const upper = line.toUpperCase();

      if (upper.startsWith("DTSTART")) {
        startDate = parseICalLine(line);
      } else if (upper.startsWith("DTEND")) {
        endDate = parseICalLine(line);
      } else if (upper.startsWith("SUMMARY:")) {
        summary = decodeICalText(line.slice(8).trim());
      } else if (upper.startsWith("UID:")) {
        uid = line.slice(4).trim();
      }
    }

    if (!startDate) continue;

    // If DTEND is missing or same as DTSTART, synthesize next-day DTEND
    // so that enumerateDateRange includes the startDate
    if (!endDate || endDate <= startDate) {
      const d = new Date(startDate + "T00:00:00Z");
      d.setUTCDate(d.getUTCDate() + 1);
      endDate = d.toISOString().slice(0, 10);
    }

    events.push({ startDate, endDate, summary, uid });
  }

  return events;
}

/** Decode iCal text escaping (\\n → \n, \\, → comma, etc.) */
function decodeICalText(text: string): string {
  return text
    .replace(/\\n/g, "\n")
    .replace(/\\,/g, ",")
    .replace(/\\;/g, ";")
    .replace(/\\\\/g, "\\");
}

/**
 * Extracts all blocked dates from an array of ICalEvent objects.
 * Returns a sorted, deduplicated array of YYYY-MM-DD strings.
 */
export function getDatesFromEvents(events: ICalEvent[]): string[] {
  const allDates = new Set<string>();

  for (const event of events) {
    const dates = enumerateDateRange(event.startDate, event.endDate);
    for (const date of dates) {
      allDates.add(date);
    }
  }

  return Array.from(allDates).sort();
}

/**
 * One-shot: parse iCal text → sorted, deduplicated blocked date strings.
 * Main entry point for the sync engine.
 */
export function extractBlockedDates(icsText: string): string[] {
  const events = parseICal(icsText);
  return getDatesFromEvents(events);
}
