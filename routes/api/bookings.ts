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

const EASEBUZZ_KEY = Deno.env.get("EASEBUZZ_KEY");
const EASEBUZZ_SALT = Deno.env.get("EASEBUZZ_SALT");
const EASEBUZZ_ENV = Deno.env.get("EASEBUZZ_ENV") || "test";
const IS_PRODUCTION = EASEBUZZ_ENV === "production";
const EASEBUZZ_BASE_URL = IS_PRODUCTION
  ? "https://pay.easebuzz.in"
  : "https://testpay.easebuzz.in";
const APP_BASE_URL = Deno.env.get("APP_BASE_URL") ?? "http://localhost:8000";

const ISTAY_COMMISSION = 0.05; // 5%
const HOST_SHARE = 1 - ISTAY_COMMISSION; // 95%

/** Easy hash encoder for Easebuzz */
async function generateHash(params: Record<string, string>, salt: string) {
  const hashString = [
    params.key,
    params.txnid,
    params.amount,
    params.productinfo,
    params.firstname,
    params.email,
    params.udf1 || "",
    params.udf2 || "",
    params.udf3 || "",
    params.udf4 || "",
    params.udf5 || "",
    params.udf6 || "",
    params.udf7 || "",
    params.udf8 || "",
    params.udf9 || "",
    params.udf10 || "",
    salt,
  ].join("|");

  const encoder = new TextEncoder();
  const data = encoder.encode(hashString);
  const hashBuffer = await crypto.subtle.digest("SHA-512", data);
  return Array.from(new Uint8Array(hashBuffer)).map((b) =>
    b.toString(16).padStart(2, "0")
  ).join("");
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
    if (
      !propId || !checkIn || !checkOut || !guestName || !guestEmail ||
      !guestPhone
    ) {
      return Response.json(
        {
          error:
            "Required: propId, checkIn, checkOut, guestName, guestEmail, guestPhone",
        },
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
      return Response.json({ error: "Check-in date cannot be in the past" }, {
        status: 400,
      });
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
          error:
            `Date ${conflictDate} is unavailable. Please choose different dates.`,
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

    // ── Initiate Easebuzz Splitting Payment ──────────────────────
    if (!EASEBUZZ_KEY || !EASEBUZZ_SALT) {
      return Response.json(
        {
          error:
            "Payment gateway not configured. Set EASEBUZZ_KEY and EASEBUZZ_SALT.",
          bookingId,
          amount,
          nights,
        },
        { status: 503 },
      );
    }

    const txnid = `istay_${bookingId}_${Date.now()}`;
    const hostAmount = Math.round(amount * HOST_SHARE * 100) / 100;

    // Easebuzz Slices Payload
    const splitDetails = {
      label: `split_istay_${bookingId}`,
      commission_type: "fixed",
      split_payments: [
        {
          merchant_id: property.hostId, // Assumes hostId resolves to Easebuzz Vendor ID right now
          amount: hostAmount.toFixed(2),
        },
      ],
    };

    const params: any = {
      key: EASEBUZZ_KEY,
      txnid,
      amount: amount.toFixed(2),
      productinfo: `istay booking at ${property.name}`,
      firstname: guestName,
      phone: guestPhone || "9999999999",
      email: guestEmail,
      surl: `${APP_BASE_URL}/p/${propId}?bookingId=${bookingId}`,
      furl: `${APP_BASE_URL}/p/${propId}?payment=failed&bookingId=${bookingId}`,
      udf1: bookingId,
      split_payments: JSON.stringify(splitDetails),
    };

    params.hash = await generateHash(params, EASEBUZZ_SALT);

    try {
      const formData = new URLSearchParams();
      for (const [k, v] of Object.entries(params)) {
        formData.append(k, v as string);
      }

      const ebRes = await fetch(`${EASEBUZZ_BASE_URL}/payment/initiate.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json",
        },
        body: formData.toString(),
      });

      const ebData = await ebRes.json();

      if (ebData.status !== 1) {
        console.error("[bookings] Easebuzz error:", ebData.data);
        return Response.json(
          {
            error:
              "Payment gateway error — booking saved, please contact support",
            bookingId,
          },
          { status: 502 },
        );
      }

      // Update booking with Easebuzz transaction ID and access key
      await saveBooking({
        ...booking,
        paymentSessionId: ebData.data, // access_key
        updatedAt: new Date().toISOString(),
      });

      return Response.json({
        ok: true,
        bookingId,
        amount,
        nights,
        paymentSessionId: ebData.data,
        paymentLink: `${EASEBUZZ_BASE_URL}/pay/${ebData.data}`,
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
