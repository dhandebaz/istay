// ================================================================
// routes/api/verify/status.ts — Lightweight verification status poll
//
// GET /api/verify/status?bookingId=XXX
// Returns: { status: "pending" | "processing" | "verified" | "failed" }
//
// Used by BookingFlow.tsx for real-time reactivity without page refresh.
// This endpoint is intentionally lightweight (single KV read) to
// support 5-second polling intervals without burdening the backend.
// ================================================================

import { type Handlers } from "$fresh/server.ts";
import { getGuestVerification } from "../../../utils/db.ts";

export const handler: Handlers = {
  GET: async (req) => {
    const url = new URL(req.url);
    const bookingId = url.searchParams.get("bookingId");

    if (!bookingId) {
      return Response.json({ error: "Missing bookingId" }, { status: 400 });
    }

    const verification = await getGuestVerification(bookingId);

    return Response.json({
      status: verification?.status ?? "pending",
    }, {
      headers: {
        // Short cache to prevent thundering herd on slow networks
        "Cache-Control": "private, max-age=3",
      },
    });
  },
};
