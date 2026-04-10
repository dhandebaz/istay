// ================================================================
// routes/api/caretaker/supply.ts — Caretaker Supply Request
//
// POST /api/caretaker/supply
// Body: { token, item, propertyName }
// Writes a Notification to the host's KV notification feed.
// The token is verified against ["caretaker_token", token] in KV.
// ================================================================

import { type Handlers } from "$fresh/server.ts";
import {
  getCaretakerToken,
  saveNotification,
} from "../../../utils/db.ts";
import type { Notification } from "../../../utils/types.ts";

const ALLOWED_ITEMS = [
  "Tissues",
  "Coffee",
  "Towels",
  "Toiletries",
  "Extra Blanket",
  "Pillows",
  "Shampoo",
  "Drinking Water",
] as const;

type SupplyItem = typeof ALLOWED_ITEMS[number];

export const handler: Handlers = {
  async POST(req) {
    let body: {
      token?: string;
      item?: string;
      propertyName?: string;
    };

    try {
      body = await req.json();
    } catch {
      return Response.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { token, item, propertyName } = body;

    if (!token || !item) {
      return Response.json(
        { error: "Required: token, item" },
        { status: 400 },
      );
    }

    if (!ALLOWED_ITEMS.includes(item as SupplyItem)) {
      return Response.json(
        { error: `item must be one of: ${ALLOWED_ITEMS.join(", ")}` },
        { status: 400 },
      );
    }

    // Verify the caretaker token
    const caretakerData = await getCaretakerToken(token);
    if (!caretakerData) {
      return Response.json(
        { error: "Invalid or expired caretaker access token" },
        { status: 401 },
      );
    }

    const propName = typeof propertyName === "string"
      ? propertyName
      : caretakerData.propertyId;

    const now = new Date().toISOString();

    const notification: Notification = {
      id: crypto.randomUUID().replace(/-/g, "").slice(0, 16),
      hostId: caretakerData.hostId,
      type: "supply_request",
      title: `🛎️ Supply Request — ${item}`,
      message: `Your caretaker at "${propName}" has requested: ${item}.`,
      propertyName: propName,
      meta: {
        item,
        propertyId: caretakerData.propertyId,
        requestedAt: now,
      },
      read: false,
      createdAt: now,
    };

    await saveNotification(notification);

    console.log(
      `[supply] prop=${caretakerData.propertyId} item="${item}" → notified host=${caretakerData.hostId}`,
    );

    return Response.json({
      ok: true,
      message: `Request for "${item}" sent to your host.`,
    });
  },
};
