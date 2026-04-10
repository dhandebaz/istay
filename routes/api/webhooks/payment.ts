// ================================================================
// routes/api/webhooks/payment.ts — Easebuzz Payment Webhook
//
// POST /api/webhooks/payment
// Called by Easebuzz after a payment attempt.
//
// Logic:
//   1. Verify SHA-512 Response Hash
//   2. If status === "success":
//      a. Update Booking status → "confirmed"
//      b. Block booked dates in KV
//      c. Create LedgerEntry (95/5 split logic)
//      d. Notify host
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

const EASEBUZZ_SALT = Deno.env.get("EASEBUZZ_SALT");
const EASEBUZZ_KEY = Deno.env.get("EASEBUZZ_KEY");
const ISTAY_COMMISSION = 0.05;

/**
 * Verifies Easebuzz response hash.
 * Hash Format: salt|status|udf10|udf9|udf8|udf7|udf6|udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key
 */
async function verifyResponseHash(params: Record<string, string>, salt: string) {
  const hashString = [
    salt,
    params.status,
    params.udf10 || "",
    params.udf9 || "",
    params.udf8 || "",
    params.udf7 || "",
    params.udf6 || "",
    params.udf5 || "",
    params.udf4 || "",
    params.udf3 || "",
    params.udf2 || "",
    params.udf1 || "",
    params.email,
    params.firstname,
    params.productinfo,
    params.amount,
    params.txnid,
    params.key,
  ].join("|");

  const encoder = new TextEncoder();
  const data = encoder.encode(hashString);
  const hashBuffer = await crypto.subtle.digest("SHA-512", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const calculatedHash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  
  return calculatedHash === params.hash;
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
    const formData = await req.formData();
    const params: Record<string, string> = {};
    for (const [key, value] of formData.entries()) {
      params[key] = value.toString();
    }

    // ── Signature Verification ─────────────────────────────────
    if (EASEBUZZ_SALT && EASEBUZZ_KEY) {
      const isValid = await verifyResponseHash(params, EASEBUZZ_SALT);
      if (!isValid) {
        console.warn("[webhook] Invalid Easebuzz hash — rejected");
        return Response.json({ error: "Invalid hash" }, { status: 401 });
      }
    } else {
      console.warn("[webhook] Easebuzz credentials missing — skipping verification (dev only)");
    }

    const { status, txnid, udf1: bookingId, amount: amountStr } = params;
    const amount = parseFloat(amountStr);

    if (status !== "success") {
      console.log(`[webhook] Payment not successful: ${status} for ${txnid}`);
      return Response.json({ ok: true, status });
    }

    if (!bookingId) {
      console.error("[webhook] Missing udf1 (bookingId) in payload");
      return Response.json({ error: "Missing bookingId" }, { status: 400 });
    }

    // ── Load Booking ───────────────────────────────────────────
    const booking = await getBookingById(bookingId);
    if (!booking) {
      console.error(`[webhook] Booking not found: ${bookingId}`);
      return Response.json({ error: "Booking not found" }, { status: 404 });
    }

    if (booking.status === "confirmed") {
      return Response.json({ ok: true, idempotent: true });
    }

    // ── Update Booking ─────────────────────────────────────────
    const confirmedBooking = {
      ...booking,
      status: "confirmed" as const,
      gatewayOrderId: txnid,
      updatedAt: new Date().toISOString(),
    };
    await saveBooking(confirmedBooking);

    // ── Block Calendar ─────────────────────────────────────────
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

    // ── Ledger Entry ───────────────────────────────────────────
    const existingLedger = await getLedgerEntry(bookingId);
    if (!existingLedger) {
      const hostAmount = Math.round(amount * (1 - ISTAY_COMMISSION) * 100) / 100;
      const istayAmount = Math.round(amount * ISTAY_COMMISSION * 100) / 100;

      const ledgerEntry: LedgerEntry = {
        id: crypto.randomUUID().replace(/-/g, "").slice(0, 16),
        bookingId,
        hostId: booking.hostId,
        propertyId: booking.propertyId,
        gatewayOrderId: txnid,
        grossAmount: amount,
        hostAmount,
        istayAmount,
        status: "settled",
        settledAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };

      await saveLedgerEntry(ledgerEntry);
    }

    // ── Notification ───────────────────────────────────────────
    const notification: Notification = {
      id: crypto.randomUUID().replace(/-/g, "").slice(0, 16),
      hostId: booking.hostId,
      type: "booking_confirmed",
      title: "New Booking Confirmed! 🎉",
      message: `${booking.guestName} booked ${booking.nights} nights for ₹${amount.toLocaleString("en-IN")}.`,
      propertyName: booking.propertyId,
      meta: { bookingId, txnid },
      read: false,
      createdAt: new Date().toISOString(),
    };
    await saveNotification(notification);

    console.log(`[webhook] Booking ${bookingId} confirmed via Easebuzz (txnid: ${txnid})`);
    return Response.json({ ok: true, bookingId });
  },
};
