import { type Handlers } from "$fresh/server.ts";
import { topupWallet, updateSubscription } from "../../../utils/db.ts";

const KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET");

async function verifySignature(
  orderId: string,
  paymentId: string,
  signature: string,
  secret: string,
) {
  const text = orderId + "|" + paymentId;
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(text));
  const hashArray = Array.from(new Uint8Array(sig));
  const calculatedSignature = hashArray.map((b) =>
    b.toString(16).padStart(2, "0")
  ).join("");
  return calculatedSignature === signature;
}

export const handler: Handlers = {
  POST: async (req) => {
    if (!KEY_SECRET) {
      return Response.json({ error: "Razorpay secret not set" }, { status: 503 });
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      hostId,
      type,
      amount
    } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !hostId) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    // ── Signature Verification ─────────────────────────────────
    const isValid = await verifySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      KEY_SECRET,
    );
    if (!isValid) {
      return Response.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    // ── Update Host Account ────────────────────────────────────
    try {
      if (type === "subscription") {
        await updateSubscription(hostId);
      } else if (type === "wallet_topup") {
        await topupWallet(hostId, amount, razorpay_payment_id);
      }

      console.log(`[billing/verify] Success: ${type} for Host ${hostId}`);
      return Response.json({ ok: true });
    } catch (err) {
      console.error("[billing/verify] Error updating DB:", err);
      return Response.json({ error: "Database update failed" }, { status: 500 });
    }
  },
};
