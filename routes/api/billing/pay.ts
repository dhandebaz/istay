import { type Handlers } from "$fresh/server.ts";

const KEY_ID = Deno.env.get("RAZORPAY_KEY_ID");
const KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET");

export const handler: Handlers = {
  POST: async (req) => {
    if (!KEY_ID || !KEY_SECRET) {
      return Response.json({ error: "Razorpay not configured" }, { status: 503 });
    }

    const { hostId, amount, type } = await req.json();
    if (!hostId || !amount || !type) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const auth = btoa(`${KEY_ID}:${KEY_SECRET}`);
    const amountInPaise = amount * 100;

    try {
      const res = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${auth}`,
        },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: "INR",
          receipt: `receipt_${type}_${hostId}_${Date.now()}`,
          notes: {
            purpose: `istay_${type}`,
            hostId,
            type
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error("Razorpay order creation failed");

      return Response.json({
        ok: true,
        orderId: data.id,
        amount: data.amount,
        keyId: KEY_ID,
      });
    } catch (err) {
      console.error("[billing/pay] Error:", err);
      return Response.json({ error: "Internal server error" }, { status: 500 });
    }
  },
};
