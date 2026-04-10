// ================================================================
// routes/api/pay.ts — Booking Payment Initiation (Cashfree Split)
//
// POST /api/pay
// Body: PayRequestBody
// Returns: { ok, order, paymentSessionId, split } | { error }
//
// Architecture: 95% → Host vendor account, 5% → istay vendor account
// Requires Hosts to be onboarded as Cashfree sub-merchants (Vendors).
//
// Environment Variables:
//   CASHFREE_APP_ID        — Cashfree Client ID
//   CASHFREE_SECRET_KEY    — Cashfree Client Secret
//   CASHFREE_ENV           — "production" | "sandbox" (default: sandbox)
//   CASHFREE_ISTAY_VENDOR_ID — istay's own Cashfree vendor ID
// ================================================================

import { type Handlers } from "$fresh/server.ts";
import type { PaymentOrder, PayRequestBody } from "../../utils/types.ts";

const ISTAY_COMMISSION = 0.05; // 5%
const HOST_SHARE = 1 - ISTAY_COMMISSION; // 95%

const CASHFREE_APP_ID = Deno.env.get("CASHFREE_APP_ID");
const CASHFREE_SECRET_KEY = Deno.env.get("CASHFREE_SECRET_KEY");
const CASHFREE_ISTAY_VENDOR_ID = Deno.env.get("CASHFREE_ISTAY_VENDOR_ID");
const IS_PRODUCTION = Deno.env.get("CASHFREE_ENV") === "production";

const CASHFREE_BASE_URL = IS_PRODUCTION
  ? "https://api.cashfree.com"
  : "https://sandbox.cashfree.com";

const API_VERSION = "2023-08-01";

export const handler: Handlers = {
  async POST(req) {
    // ── Credential Guard ───────────────────────────────────────
    if (!CASHFREE_APP_ID || !CASHFREE_SECRET_KEY) {
      return Response.json(
        {
          error:
            "Payment gateway not configured. Set CASHFREE_APP_ID and CASHFREE_SECRET_KEY in your environment.",
          setup: {
            docs: "https://docs.cashfree.com/docs/create-order",
            required_env_vars: [
              "CASHFREE_APP_ID",
              "CASHFREE_SECRET_KEY",
              "CASHFREE_ENV",
              "CASHFREE_ISTAY_VENDOR_ID",
            ],
          },
        },
        { status: 503 },
      );
    }

    // ── Parse Body ─────────────────────────────────────────────
    let body: Partial<PayRequestBody>;
    try {
      body = await req.json();
    } catch {
      return Response.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { bookingId, amount, hostVendorId, guestEmail, guestName, guestPhone } =
      body;

    if (!bookingId || !amount || !hostVendorId || !guestEmail || !guestName) {
      return Response.json(
        {
          error:
            "Required: bookingId, amount, hostVendorId, guestEmail, guestName",
        },
        { status: 400 },
      );
    }

    if (typeof amount !== "number" || amount < 100) {
      return Response.json(
        { error: "amount must be a number and at least ₹100" },
        { status: 400 },
      );
    }

    // ── Calculate Split ────────────────────────────────────────
    const hostAmount = Math.round(amount * HOST_SHARE * 100) / 100;
    const istayAmount = Math.round(amount * ISTAY_COMMISSION * 100) / 100;
    const orderId = `istay_${bookingId}_${Date.now()}`;

    // ── Cashfree Order Creation ────────────────────────────────
    const orderPayload: Record<string, unknown> = {
      order_id: orderId,
      order_amount: amount,
      order_currency: "INR",
      customer_details: {
        customer_id: `guest_${bookingId}`,
        customer_email: guestEmail,
        customer_name: guestName,
        customer_phone: guestPhone ?? "9999999999",
      },
      order_meta: {
        return_url:
          `https://istay.space/booking/confirm?order_id={order_id}&booking_id=${bookingId}`,
        notify_url: `https://istay.space/api/payment-webhook`,
      },
      order_note: `istay booking #${bookingId}`,
    };

    // ── Vendor Split (active when istay vendor ID is configured) ───
    if (CASHFREE_ISTAY_VENDOR_ID) {
      orderPayload.vendor_split = [
        {
          vendor_id: hostVendorId,
          amount: hostAmount,
          percentage: null,
        },
        {
          vendor_id: CASHFREE_ISTAY_VENDOR_ID,
          amount: istayAmount,
          percentage: null,
        },
      ];
    }

    try {
      const cfRes = await fetch(`${CASHFREE_BASE_URL}/pg/orders`, {
        method: "POST",
        headers: {
          "x-client-id": CASHFREE_APP_ID,
          "x-client-secret": CASHFREE_SECRET_KEY,
          "x-api-version": API_VERSION,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(orderPayload),
      });

      const cfData = await cfRes.json();

      if (!cfRes.ok) {
        console.error("[pay] Cashfree error:", cfData);
        return Response.json(
          {
            error: "Payment gateway error",
            // Expose Cashfree message in non-production
            ...(IS_PRODUCTION ? {} : { details: cfData }),
          },
          { status: 502 },
        );
      }

      const order: PaymentOrder = {
        orderId,
        bookingId: bookingId!,
        amount,
        hostAmount,
        istayAmount,
        paymentSessionId: cfData.payment_session_id,
        status: "created",
        createdAt: new Date().toISOString(),
      };

      return Response.json({
        ok: true,
        order,
        // Frontend: use paymentSessionId with Cashfree.js
        // https://docs.cashfree.com/docs/cashfree-js
        paymentSessionId: cfData.payment_session_id,
        split: {
          hostAmount,
          istayAmount,
          hostSharePct: HOST_SHARE * 100,
          istaySharePct: ISTAY_COMMISSION * 100,
        },
      });
    } catch (err) {
      console.error("[pay] Error calling Cashfree:", err);
      return Response.json(
        { error: "Internal error initiating payment. Please try again." },
        { status: 500 },
      );
    }
  },
};
