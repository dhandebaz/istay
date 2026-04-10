// ================================================================
// routes/api/webhooks/payment.ts — Cashfree Payment Webhook
//
// POST /api/webhooks/payment
// Called by Cashfree after a successful payment.
//
// On PAYMENT_SUCCESS_WEBHOOK:
//   1. Verify HMAC-SHA256 signature
//   2. Update Booking status → "confirmed"
//   3. Block the booked dates in the calendar (["calendar"] KV)
//   4. Create LedgerEntry (95/5 split)
//   5. Create "booking_confirmed" notification for the host
// ================================================================

import { type Handlers } from "$fresh/server.ts";
import {
  blockDate,
  getBookingById,
  getLedgerEntry,
  saveBooking,
  saveLedgerEntry,
  saveNotification,
} from "../../../utils/db.ts";
import type { LedgerEntry, Notification } from "../../../utils/types.ts";

const CASHFREE_WEBHOOK_SECRET = Deno.env.get("CASHFREE_WEBHOOK_SECRET");
const ISTAY_COMMISSION = 0.05;

/**
 * Verifies Cashfree webhook signature.
 * Cashfree sends: x-webhook-signature header = base64(HMAC-SHA256(payload, secret))
 */
async function verifySignature(
  payload: string,
  signature: string,
  secret: string,
): Promise<boolean> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  const expectedSig = btoa(String.fromCharCode(...new Uint8Array(sig)));
  return expectedSig === signature;
}

function enumerateDates(checkIn: string, checkOut: string): string[] {
  const dates: string[] = [];
  const cur = new Date(checkIn + "T00:00:00Z");
  const end = new Date(checkOut + "T00:00:00Z");
  while (cur < end) {
    dates.push(cur.toISOString().slice(0, 10));
    cur.setUTCDate(cur.getUTCDate() + 1);
  }
  return dates;
}

export const handler: Handlers = {
  async POST(req) {
    const rawBody = await req.text();

    // ── Signature Verification ─────────────────────────────────
    if (CASHFREE_WEBHOOK_SECRET) {
      const signature = req.headers.get("x-webhook-signature") ?? "";
      const isValid = await verifySignature(
        rawBody,
        signature,
        CASHFREE_WEBHOOK_SECRET,
      );
      if (!isValid) {
        console.warn("[webhook] Invalid signature — rejected");
        return Response.json({ error: "Invalid signature" }, { status: 401 });
      }
    } else {
      console.warn(
        "[webhook] CASHFREE_WEBHOOK_SECRET not set — skipping signature verification (dev only)",
      );
    }

    // ── Parse Payload ──────────────────────────────────────────
    let payload: Record<string, unknown>;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return Response.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    const eventType = payload["type"] as string | undefined;

    // Only handle payment success events
    if (eventType !== "PAYMENT_SUCCESS_WEBHOOK") {
      console.log(`[webhook] Ignoring event type: ${eventType}`);
      return Response.json({ ok: true, skipped: true, eventType });
    }

    const data = payload["data"] as Record<string, unknown> | undefined;
    const order = data?.["order"] as Record<string, unknown> | undefined;
    const cashfreeOrderId = order?.["order_id"] as string | undefined;

    if (!cashfreeOrderId) {
      return Response.json({ error: "Missing order_id in payload" }, { status: 400 });
    }

    // Extract bookingId from orderId format: "istay_{bookingId}_{timestamp}"
    const parts = cashfreeOrderId.split("_");
    if (parts.length < 3 || parts[0] !== "istay") {
      console.warn(`[webhook] Unrecognized orderId format: ${cashfreeOrderId}`);
      return Response.json({ ok: true, skipped: true, reason: "Not an istay order" });
    }

    const bookingId = parts[1];

    // ── Load Booking ───────────────────────────────────────────
    const booking = await getBookingById(bookingId);
    if (!booking) {
      console.error(`[webhook] Booking not found: ${bookingId}`);
      return Response.json({ error: "Booking not found" }, { status: 404 });
    }

    // Idempotency: already processed this payment
    if (booking.status === "confirmed") {
      console.log(`[webhook] Booking ${bookingId} already confirmed — idempotent skip`);
      return Response.json({ ok: true, idempotent: true });
    }

    // ── Update Booking Status ──────────────────────────────────
    const confirmedBooking = {
      ...booking,
      status: "confirmed" as const,
      cashfreeOrderId,
      updatedAt: new Date().toISOString(),
    };
    await saveBooking(confirmedBooking);

    // ── Block Calendar Dates ───────────────────────────────────
    const datesToBlock = enumerateDates(booking.checkIn, booking.checkOut);
    await Promise.all(
      datesToBlock.map((date) =>
        blockDate({
          propertyId: booking.propertyId,
          date,
          reason: "booked",
          bookingId: booking.id,
        })
      ),
    );

    // ── Save Ledger Entry (95/5 split) ─────────────────────────
    // Only create if not already exists (idempotency)
    const existingLedger = await getLedgerEntry(bookingId);
    if (!existingLedger) {
      const grossAmount = booking.amount;
      const hostAmount = Math.round(grossAmount * (1 - ISTAY_COMMISSION) * 100) / 100;
      const istayAmount = Math.round(grossAmount * ISTAY_COMMISSION * 100) / 100;

      const ledgerEntry: LedgerEntry = {
        id: crypto.randomUUID().replace(/-/g, "").slice(0, 16),
        bookingId,
        hostId: booking.hostId,
        propertyId: booking.propertyId,
        cashfreeOrderId,
        grossAmount,
        hostAmount,
        istayAmount,
        status: "settled",
        settledAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };

      await saveLedgerEntry(ledgerEntry);
    }

    // ── Host Notification ──────────────────────────────────────
    const notification: Notification = {
      id: crypto.randomUUID().replace(/-/g, "").slice(0, 16),
      hostId: booking.hostId,
      type: "booking_confirmed",
      title: "New Booking Confirmed! 🎉",
      message: `${booking.guestName} booked ${booking.nights} night${booking.nights > 1 ? "s" : ""} (${booking.checkIn} → ${booking.checkOut}) for ₹${booking.amount.toLocaleString("en-IN")}.`,
      propertyName: booking.propertyId,
      meta: {
        bookingId,
        guestName: booking.guestName,
        guestEmail: booking.guestEmail,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
      },
      read: false,
      createdAt: new Date().toISOString(),
    };

    await saveNotification(notification);

    console.log(
      `[webhook] Booking ${bookingId} confirmed. ` +
        `Blocked ${datesToBlock.length} dates. ` +
        `Ledger: ₹${booking.amount} gross.`,
    );

    return Response.json({
      ok: true,
      bookingId,
      datesBlocked: datesToBlock.length,
      ledger: { gross: booking.amount },
    });
  },
};
