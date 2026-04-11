// ================================================================
// routes/api/bookings.ts — Create a pending booking
//
// POST /api/bookings
// Body: CreateBookingPayload
// Returns: { bookingId, paymentLink, amount } | { error }
//
// Flow:
//   1. Validate input and property
//   2. Check no blocked dates in range (server-side guard)
//   3. Save Booking with status "pending"
//   4. Create Cashfree order → return paymentLink
//   5. Frontend redirects guest to paymentLink
// ================================================================

import { type Handlers } from "$fresh/server.ts";
import {
  blockDate,
  getPropertyById,
  listBlockedDates,
  saveBooking,
} from "../../utils/db.ts";
import type { Booking, CreateBookingPayload } from "../../utils/types.ts";

const CASHFREE_APP_ID = Deno.env.get("CASHFREE_APP_ID");
const CASHFREE_SECRET_KEY = Deno.env.get("CASHFREE_SECRET_KEY");
const IS_PRODUCTION = Deno.env.get("CASHFREE_ENV") === "production";
const CASHFREE_BASE_URL = IS_PRODUCTION
  ? "https://api.cashfree.com"
  : "https://sandbox.cashfree.com";
const APP_BASE_URL = Deno.env.get("APP_BASE_URL") ?? "http://localhost:8000";

function parseCookies(header: string | null): Record<string, string> {
  const result: Record<string, string> = {};
  if (!header) return result;
  for (const pair of header.split(";")) {
    const [k, ...v] = pair.trim().split("=");
    if (k?.trim()) result[k.trim()] = v.join("=").trim();
  }
  return result;
}

function daysBetween(start: string, end: string): number {
  return Math.round(
    (new Date(end).getTime() - new Date(start).getTime()) / 86_400_000,
  );
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
    let body: Partial<CreateBookingPayload>;
    try {
      body = await req.json();
    } catch {
      return Response.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { propId, checkIn, checkOut, guestName, guestEmail, guestPhone } =
      body;

    // ── Input Validation ───────────────────────────────────────
    if (!propId || !checkIn || !checkOut || !guestName || !guestEmail || !guestPhone) {
      return Response.json(
        { error: "Required: propId, checkIn, checkOut, guestName, guestEmail, guestPhone" },
        { status: 400 },
      );
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(checkIn) || !dateRegex.test(checkOut)) {
      return Response.json(
        { error: "checkIn and checkOut must be YYYY-MM-DD" },
        { status: 400 },
      );
    }

    const today = new Date().toISOString().slice(0, 10);
    if (checkIn < today) {
      return Response.json({ error: "Check-in date cannot be in the past" }, { status: 400 });
    }
    if (checkOut <= checkIn) {
      return Response.json(
        { error: "Check-out must be after check-in" },
        { status: 400 },
      );
    }

    const nights = daysBetween(checkIn, checkOut);
    if (nights < 1 || nights > 365) {
      return Response.json(
        { error: "Booking must be between 1 and 365 nights" },
        { status: 400 },
      );
    }

    // ── Load Property ──────────────────────────────────────────
    const property = await getPropertyById(propId);
    if (!property) {
      return Response.json({ error: "Property not found" }, { status: 404 });
    }

    if (property.status !== "active") {
      return Response.json(
        { error: "This property is not available for bookings" },
        { status: 409 },
      );
    }

    // ── Check Date Availability (server-side guard) ────────────
    const blockedBlocks = await listBlockedDates(propId);
    const blockedSet = new Set(blockedBlocks.map((b) => b.date));
    const requestedDates = enumerateDates(checkIn, checkOut);

    const conflictDate = requestedDates.find((d) => blockedSet.has(d));
    if (conflictDate) {
      return Response.json(
        {
          error: `Date ${conflictDate} is unavailable. Please choose different dates.`,
          conflictDate,
        },
        { status: 409 },
      );
    }

    // ── Create Booking ─────────────────────────────────────────
    const now = new Date().toISOString();
    const bookingId = crypto.randomUUID().replace(/-/g, "").slice(0, 16);
    const amount = nights * property.basePrice;

    const booking: Booking = {
      id: bookingId,
      propertyId: propId,
      hostId: property.hostId,
      guestName: guestName!.trim(),
      guestEmail: guestEmail!.trim(),
      guestPhone: guestPhone!.trim(),
      checkIn: checkIn!,
      checkOut: checkOut!,
      nights,
      amount,
      status: "pending",
      createdAt: now,
      updatedAt: now,
    };

    await saveBooking(booking);

    // ── Initiate Payment ───────────────────────────────────────
    if (!CASHFREE_APP_ID || !CASHFREE_SECRET_KEY) {
      // Payment gateway not configured — return error with booking ID
      // so it can be recovered once payment is set up
      return Response.json(
        {
          error: "Payment gateway not configured. Set CASHFREE_APP_ID and CASHFREE_SECRET_KEY.",
          bookingId,
          amount,
          nights,
        },
        { status: 503 },
      );
    }

    const orderId = `istay_${bookingId}_${Date.now()}`;

    try {
      const cfRes = await fetch(`${CASHFREE_BASE_URL}/pg/orders`, {
        method: "POST",
        headers: {
          "x-client-id": CASHFREE_APP_ID,
          "x-client-secret": CASHFREE_SECRET_KEY,
          "x-api-version": "2023-08-01",
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          order_id: orderId,
          order_amount: amount,
          order_currency: "INR",
          customer_details: {
            customer_id: `guest_${bookingId}`,
            customer_email: guestEmail,
            customer_name: guestName,
            customer_phone: guestPhone,
          },
          order_meta: {
            return_url: `${APP_BASE_URL}/p/checkout/confirm?order_id={order_id}&booking_id=${bookingId}`,
            notify_url: `${APP_BASE_URL}/api/webhooks/payment`,
          },
          order_note: `istay booking at ${property.name}`,
        }),
      });

      const cfData = await cfRes.json();

      if (!cfRes.ok) {
        console.error("[bookings] Cashfree error:", cfData);
        return Response.json(
          { error: "Payment gateway error — booking saved, please contact support", bookingId },
          { status: 502 },
        );
      }

      // Update booking with Cashfree order ID and session ID
      await saveBooking({
        ...booking,
        cashfreeOrderId: orderId,
        paymentSessionId: cfData.payment_session_id,
        updatedAt: new Date().toISOString(),
      });

      return Response.json({
        ok: true,
        bookingId,
        amount,
        nights,
        paymentSessionId: cfData.payment_session_id,
        // Cashfree hosted payment page URL
        paymentLink: cfData.payment_link ?? `https://payments.cashfree.com/order/#${cfData.payment_session_id}`,
      });
    } catch (err) {
      console.error("[bookings] Error creating payment:", err);
      return Response.json(
        { error: "Payment creation failed — booking saved", bookingId },
        { status: 502 },
      );
    }
  },
};
