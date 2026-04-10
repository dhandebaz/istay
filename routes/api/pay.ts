// ================================================================
// routes/api/pay.ts — Booking Payment Initiation (Easebuzz Split)
//
// POST /api/pay
// Body: PayRequestBody
// Returns: { ok, order, access_key, split } | { error }
//
// Architecture: 95% → Host bank account, 5% → istay commission
// Uses Easebuzz "Slices" / Marketplace API for automated splitting.
//
// Environment Variables:
//   EASEBUZZ_KEY          — Easebuzz Client Key
//   EASEBUZZ_SALT         — Easebuzz Client Salt
//   EASEBUZZ_ENV          — "production" | "test" (default: test)
// ================================================================

import { type Handlers } from "$fresh/server.ts";
import type { PaymentOrder, PayRequestBody } from "../../utils/types.ts";

const ISTAY_COMMISSION = 0.05; // 5%
const HOST_SHARE = 1 - ISTAY_COMMISSION; // 95%

const EASEBUZZ_KEY = Deno.env.get("EASEBUZZ_KEY");
const EASEBUZZ_SALT = Deno.env.get("EASEBUZZ_SALT");
const EASEBUZZ_ENV = Deno.env.get("EASEBUZZ_ENV") || "test";
const IS_PRODUCTION = EASEBUZZ_ENV === "production";

const EASEBUZZ_BASE_URL = IS_PRODUCTION
  ? "https://pay.easebuzz.in"
  : "https://testpay.easebuzz.in";

/**
 * Encodes the hash for Easebuzz.
 * Format: key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5|udf6|udf7|udf8|udf9|udf10|salt
 */
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
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export const handler: Handlers = {
  async POST(req) {
    if (!EASEBUZZ_KEY || !EASEBUZZ_SALT) {
      return Response.json(
        {
          error: "Easebuzz not configured. Set EASEBUZZ_KEY and EASEBUZZ_SALT.",
        },
        { status: 503 },
      );
    }

    let body: Partial<PayRequestBody>;
    try {
      body = await req.json();
    } catch {
      return Response.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { bookingId, amount, hostVendorId, guestEmail, guestName, guestPhone } = body;

    if (!bookingId || !amount || !hostVendorId || !guestEmail || !guestName) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const hostAmount = Math.round(amount * HOST_SHARE * 100) / 100;
    const istayAmount = Math.round(amount * ISTAY_COMMISSION * 100) / 100;
    const txnid = `istay_${bookingId}_${Date.now()}`;

    // ── Easebuzz Slices / Marketplace Split ──────────────────────
    // Constructing the split details JSON
    const splitDetails = {
      label: `split_istay_${bookingId}`,
      commission_type: "fixed",
      split_payments: [
        {
          merchant_id: hostVendorId, // The Host's sub-merchant ID
          amount: hostAmount.toFixed(2),
        },
      ],
    };

    const params: any = {
      key: EASEBUZZ_KEY,
      txnid,
      amount: amount.toFixed(2),
      productinfo: `Booking #${bookingId}`,
      firstname: guestName,
      phone: guestPhone || "9999999999",
      email: guestEmail,
      surl: `https://istay.space/booking/confirm?booking_id=${bookingId}`,
      furl: `https://istay.space/booking/failed?booking_id=${bookingId}`,
      udf1: bookingId,
      split_payments: JSON.stringify(splitDetails),
    };

    params.hash = await generateHash(params, EASEBUZZ_SALT);

    try {
      // Easebuzz expects form-data for initiation
      const formData = new URLSearchParams();
      for (const [key, value] of Object.entries(params)) {
        formData.append(key, value as string);
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
        console.error("[pay] Easebuzz error:", ebData.data);
        return Response.json(
          { error: "Easebuzz initiation failed", details: ebData.data },
          { status: 502 },
        );
      }

      const order: PaymentOrder = {
        orderId: txnid,
        bookingId: bookingId!,
        amount,
        hostAmount,
        istayAmount,
        paymentLink: ebData.data, // This is the access key or initiation URL
        status: "created",
        createdAt: new Date().toISOString(),
      };

      return Response.json({
        ok: true,
        order,
        access_key: ebData.data,
        split: { hostAmount, istayAmount },
      });
    } catch (err) {
      console.error("[pay] Easebuzz initiation exception:", err);
      return Response.json({ error: "Internal payment error" }, { status: 500 });
    }
  },
};
