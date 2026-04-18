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
  getGuestProfile,
  getHost,
  getLedgerEntry,
  getPropertyById,
  saveBooking,
  saveGuestProfile,
  saveHost,
  saveLedgerEntry,
  saveNotification,
} from "../../../utils/db.ts";
import {
  sendBookingConfirmation,
  sendHostNewBookingAlert,
} from "../../../utils/email.ts";
import { sendWhatsAppMessage } from "../../../utils/whatsapp.ts";
import { dispatchCaretakerMission } from "../../../utils/staff.ts";
import { dispatchWebhook } from "../../../utils/events.ts";
import type {
  GuestProfile,
  LedgerEntry,
  Notification,
} from "../../../utils/types.ts";

const EASEBUZZ_SALT = Deno.env.get("EASEBUZZ_SALT");
const EASEBUZZ_KEY = Deno.env.get("EASEBUZZ_KEY");
const ISTAY_COMMISSION = 0.05;

/**
 * Verifies Easebuzz response hash.
 * Hash Format: salt|status|udf10|udf9|udf8|udf7|udf6|udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key
 */
async function verifyResponseHash(
  params: Record<string, string>,
  salt: string,
) {
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
  const calculatedHash = hashArray.map((b) => b.toString(16).padStart(2, "0"))
    .join("");

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
  POST: async (req) => {
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
      console.warn(
        "[webhook] Easebuzz credentials missing — skipping verification (dev only)",
      );
    }

    const { status, txnid, udf1, udf2, amount: amountStr } = params;
    const amount = parseFloat(amountStr);

    if (status !== "success") {
      console.log(`[webhook] Payment not successful: ${status} for ${txnid}`);
      return Response.json({ ok: true, status });
    }

    // ── ONBOARDING FLOW ───────────────────────────────────────
    if (udf2 === "onboarding") {
      const hostId = udf1;
      const host = await getHost(hostId);
      if (host) {
        await saveHost({ ...host, setupFeePaid: true });
        console.log(`[webhook] Host ${hostId} verified — Setup Fee Paid.`);

        // WhatsApp Welcome Dispatch
        const welcomeMsg =
          `Welcome to iStay, ${host.name}! 🚀 Your lifetime account is now verified. Next step: Sync your first property iCal in the dashboard to go live.`;
        await sendWhatsAppMessage(host.phone, welcomeMsg);
      }
      return Response.json({ ok: true, type: "onboarding" });
    }

    const bookingId = udf1;
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

    // ── Phase 8: Dispatch Webhook Event ──────────────────────
    await dispatchWebhook(booking.hostId, "booking_confirmed", {
      bookingId: booking.id,
      amount: booking.amount,
      guestName: booking.guestName,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
    });
    await saveBooking(confirmedBooking);

    // ── Dispatch Caretaker ─────────────────────────────────────
    dispatchCaretakerMission(confirmedBooking).catch((e) =>
      console.error("[webhook] Staff dispatch error:", e)
    );

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
      const hostAmount = Math.round(amount * (1 - ISTAY_COMMISSION) * 100) /
        100;
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
      message: `${booking.guestName} booked ${booking.nights} nights for ₹${
        amount.toLocaleString("en-IN")
      }.`,
      propertyName: booking.propertyId,
      meta: { bookingId, txnid },
      read: false,
      createdAt: new Date().toISOString(),
    };
    await saveNotification(notification);

    // ── Email Confirmation ───────────────────────────────────────
    try {
      const property = await getPropertyById(booking.propertyId);
      const propName = property?.name || "istay Property";

      // Dispatch securely (non-blocking)
      sendBookingConfirmation(
        booking.guestEmail,
        booking.guestName,
        propName,
        booking.checkIn,
        booking.checkOut,
        amount,
        bookingId,
        booking.propertyId,
      ).catch((err) => console.error("[webhook] Guest email error:", err));

      // ── Host New Booking Alert ─────────────────────────────────
      const host = await getHost(booking.hostId);
      if (host) {
        sendHostNewBookingAlert(
          host.email,
          host.name,
          booking.guestName,
          propName,
          booking.checkIn,
          booking.checkOut,
          amount,
          bookingId,
        ).catch((err) => console.error("[webhook] Host email error:", err));
      }
    } catch (e) {
      console.error("[webhook] Error preparing confirmation email", e);
    }

    console.log(
      `[webhook] Booking ${bookingId} confirmed via Easebuzz (txnid: ${txnid})`,
    );
    return Response.json({ ok: true, bookingId });
  },
};
