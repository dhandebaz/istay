const KEY_ID = Deno.env.get("RAZORPAY_KEY_ID");
const KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET");

/**
 * Creates a Razorpay Payment Link for instant top-ups.
 */
export async function createPaymentLink(
  hostId: string,
  amount: number, // in INR
  description: string = "AI Wallet Top-up",
) {
  if (!KEY_ID || !KEY_SECRET) {
    throw new Error("Razorpay credentials missing");
  }

  const auth = btoa(`${KEY_ID}:${KEY_SECRET}`);
  const payload = {
    amount: amount * 100, // to paise
    currency: "INR",
    accept_partial: false,
    description,
    customer: {
      name: `Host ${hostId}`,
      contact: "", // Will be filled by Razorpay UI or we can pass host phone if available
    },
    notify: {
      sms: true,
      email: true
    },
    reminder_enable: true,
    notes: {
      hostId,
      type: "wallet_topup",
      auto_generated: "true"
    },
    callback_url: `https://istay.space/dashboard/billing?status=success`,
    callback_method: "get"
  };

  const res = await fetch("https://api.razorpay.com/v1/payment_links", {
    method: "POST",
    headers: {
      "Authorization": `Basic ${auth}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  if (!res.ok) {
    console.error("[razorpay] Link creation failed:", data);
    throw new Error(data.error?.description || "Payment link generation failed");
  }

  return data.short_url as string;
}

/**
 * Creates a Razorpay Subscription link.
 * Needs a pre-defined Plan ID.
 */
export async function createSubscription(
  hostId: string,
  planId: string,
) {
  if (!KEY_ID || !KEY_SECRET) {
    throw new Error("Razorpay credentials missing");
  }

  const auth = btoa(`${KEY_ID}:${KEY_SECRET}`);
  const res = await fetch("https://api.razorpay.com/v1/subscriptions", {
    method: "POST",
    headers: {
      "Authorization": `Basic ${auth}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      plan_id: planId,
      total_count: 12, // For 1 year initially
      quantity: 1,
      customer_notify: 1,
      notes: { hostId }
    })
  });

  const data = await res.json();
  if (!res.ok) {
     console.error("[razorpay] Subscription failed:", data);
     throw new Error(data.error?.description || "Subscription creation failed");
  }

  return data;
}
