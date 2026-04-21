import { type Handlers } from "$fresh/server.ts";
import { createSubscription } from "../../../utils/razorpay.ts";

const PLAN_ID = Deno.env.get("RAZORPAY_MONTHLY_PLAN_ID");

export const handler: Handlers = {
  POST: async (req) => {
    const { hostId } = await req.json();
    if (!hostId) {
      return Response.json({ error: "Missing hostId" }, { status: 400 });
    }

    if (!PLAN_ID) {
      return Response.json({ 
        error: "Automated subscriptions are not configured (Missing RAZORPAY_MONTHLY_PLAN_ID)" 
      }, { status: 503 });
    }

    try {
      const subscription = await createSubscription(hostId, PLAN_ID);
      return Response.json({ ok: true, subscriptionId: subscription.id, short_url: subscription.short_url });
    } catch (err: any) {
      return Response.json({ error: err.message }, { status: 500 });
    }
  },
};
