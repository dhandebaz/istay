// ================================================================
// routes/api/onboard/pay.ts — Host Onboarding Payment (Razorpay)
//
// POST /api/onboard/pay
// Body: { hostId }
// Returns: { ok, orderId, amount, keyId }
//
// Environment Variables:
//   RAZORPAY_KEY_ID
//   RAZORPAY_KEY_SECRET
// ================================================================

import { type Handlers } from "$fresh/server.ts";

const KEY_ID = Deno.env.get("RAZORPAY_KEY_ID");
const KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET");

export const handler: Handlers = {
  POST: async (req) => {
    if (!KEY_ID || !KEY_SECRET) {
      return Response.json({ error: "Razorpay not configured" }, {
        status: 503,
      });
    }

    const auth = btoa(`${KEY_ID}:${KEY_SECRET}`);
    const amount = 1000 * 100; // ₹1,000 in paise

    let bodyData: { hostId?: string } = {};
    try {
      bodyData = await req.json();
    } catch {
      return Response.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { hostId } = bodyData;
    if (!hostId) {
      return Response.json({ error: "hostId is required" }, { status: 400 });
    }

    try {
      const res = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${auth}`,
        },
        body: JSON.stringify({
          amount,
          currency: "INR",
          receipt: `receipt_saas_sub_${hostId}_${Date.now()}`,
          notes: {
            purpose: "istay_saas_subscription",
            plan: "standard",
            hostId,
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        return Response.json({
          error: "Razorpay order creation failed",
          details: data,
        }, { status: 502 });
      }

      return Response.json({
        ok: true,
        orderId: data.id,
        amount: data.amount,
        keyId: KEY_ID,
      });
    } catch (err) {
      console.error("[onboard/pay] Error:", err);
      return Response.json({ error: "Internal server error" }, { status: 500 });
    }
  },
};
