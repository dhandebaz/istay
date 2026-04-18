import { type Handlers } from "$fresh/server.ts";
import {
  getKv,
  listBlockedDates,
  listBookingsByProperty,
} from "../../../utils/db.ts";

export const handler: Handlers = {
  GET: async (_req, ctx) => {
    const { propId } = ctx.params;
    const kv = await getKv();

    // 1. Resolve hostId from the property index
    const idx = await kv.get<{ hostId: string }>(["prop_index", propId]);
    if (!idx.value) {
      return new Response("Property not found", { status: 404 });
    }
    const hostId = idx.value.hostId;

    // 2. Fetch all calendar-impacting data
    const [bookings, manualBlocks] = await Promise.all([
      listBookingsByProperty(hostId, propId),
      listBlockedDates(propId),
    ]);

    // 3. Generate VEVENT blocks
    const events: string[] = [];

    // Confirmed Bookings
    bookings.filter((b) =>
      b.status === "confirmed" || b.status === "room_ready"
    ).forEach((b) => {
      events.push(formatEvent(
        `istay-B-${b.id}`,
        b.checkIn,
        b.checkOut,
        "istay Booking",
      ));
    });

    // Manual Blocks
    manualBlocks.forEach((block) => {
      // Manual blocks are stored per day, but iCal prefers ranges.
      // For simplicity/safety, we emit single-day events.
      const end = new Date(block.date + "T00:00:00Z");
      end.setUTCDate(end.getUTCDate() + 1);
      const nextDay = end.toISOString().slice(0, 10);

      events.push(formatEvent(
        `istay-M-${block.date}-${propId}`,
        block.date,
        nextDay,
        "ISTAY: Blocked",
      ));
    });

    // 4. Wrap in RFC 5545 Container
    const ical = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//istay//NONSGML v1.0//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      ...events,
      "END:VCALENDAR",
    ].join("\r\n");

    return new Response(ical, {
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": `attachment; filename="istay-${propId}.ics"`,
      },
    });
  },
};

function formatEvent(uid: string, start: string, end: string, summary: string) {
  // RFC 5545 dates are YYYYMMDD
  const format = (d: string) => d.replace(/-/g, "");
  return [
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
    `DTSTART;VALUE=DATE:${format(start)}`,
    `DTEND;VALUE=DATE:${format(end)}`,
    `SUMMARY:${summary}`,
    "END:VEVENT",
  ].join("\r\n");
}
