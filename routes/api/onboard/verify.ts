// ================================================================
// routes/api/onboard/verify.ts — Verify Onboarding Payment
//
// POST /api/onboard/verify
// Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature, hostId }
// ================================================================

import { type Handlers } from "$fresh/server.ts";
import { getHost, saveHost, saveNotification } from "../../../utils/db.ts";
import type { Notification } from "../../../utils/types.ts";

const KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET");

async function verifySignature(orderId: string, paymentId: string, signature: string, secret: string) {
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
  const calculatedSignature = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return calculatedSignature === signature;
}

export const handler: Handlers = {
  POST: async (req) => {
    if (!KEY_SECRET) {
      return Response.json({ error: "Razorpay secret not set" }, { status: 503 });
    }

    let body: any = {};
    try {
      body = await req.json();
    } catch {
      return Response.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, hostId } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !hostId) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    // ── Signature Verification ─────────────────────────────────
    const isValid = await verifySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature, KEY_SECRET);
    if (!isValid) {
      return Response.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    // ── Update Host Status ─────────────────────────────────────
    const host = await getHost(hostId);
    if (!host) {
      return Response.json({ error: "Host not found" }, { status: 404 });
    }

    if (host.setupFeePaid) {
      return Response.json({ ok: true, alreadyPaid: true });
    }

    const updatedHost = {
      ...host,
      setupFeePaid: true,
      updatedAt: new Date().toISOString(),
    };
    await saveHost(updatedHost);

    // ── Send Welcome Notification ─────────────────────────────
    const notification: Notification = {
      id: crypto.randomUUID().replace(/-/g, "").slice(0, 16),
      hostId,
      type: "booking_confirmed", // Reusing type for UI highlight
      title: "Welcome to istay Premium! 🚀",
      message: "Subscription activated. You can now create unlimited properties and accept direct bookings.",
      propertyName: "System",
      read: false,
      createdAt: new Date().toISOString(),
    };
    await saveNotification(notification);

    console.log(`[onboard/verify] Host ${hostId} successfully onboarded via Razorpay.`);
    return Response.json({ ok: true });
  },
};
