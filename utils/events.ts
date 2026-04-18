// ================================================================
// utils/events.ts — Outbound Webhook Event Bus
// ================================================================

import { getHost } from "./db.ts";
import { sendWhatsAppTemplate, sendWhatsAppText } from "./whatsapp.ts";

export type istayEvent =
  | "booking_confirmed"
  | "verification_complete"
  | "room_ready"
  | "notification_created";

/**
 * Dispatches a multimodal webhook event to the host's configured endpoints.
 * Includes an HMAC-SHA256 signature for verification.
 */
export async function dispatchWebhook(
  hostId: string,
  event: istayEvent,
  payload: any,
) {
  const host = await getHost(hostId);
  if (!host || !host.webhooks || host.webhooks.length === 0) return;

  const activeWebhooks = host.webhooks.filter((w) =>
    w.active && (w.event === event || w.event === "all")
  );
  if (activeWebhooks.length === 0) return;

  const timestamp = Date.now().toString();
  const body = JSON.stringify({
    event,
    timestamp,
    payload,
    istay_version: "2026-04-01",
  });

  for (const webhook of activeWebhooks) {
    try {
      // Generate HMAC signature (optional for receivers, but recommended)
      // istay_signature = hmac_sha256(webhook_secret, timestamp + "." + body)
      const signature = await generateSignature(
        webhook.secret,
        `${timestamp}.${body}`,
      );

      console.log(`[events] Dispatching ${event} to ${webhook.url}`);

      const res = await fetch(webhook.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-iStay-Timestamp": timestamp,
          "X-iStay-Signature": signature,
          "User-Agent": "iStay-Event-Bus/1.0",
        },
        body,
      });

      if (!res.ok) {
        console.error(
          `[events] Webhook delivery failed (${res.status}) for host=${hostId}`,
        );
      }
    } catch (err) {
      console.error(`[events] Webhook exception for host=${hostId}:`, err);
    }
  }

  // Phase 11: Dispatch WhatsApp Orchestration
  await dispatchWhatsApp(hostId, event, payload);
}

/**
 * Dispatches a WhatsApp notification to the host or relevant staff.
 */
export async function dispatchWhatsApp(
  hostId: string,
  event: istayEvent,
  payload: any,
) {
  const host = await getHost(hostId);
  if (!host || !host.phone) return;

  console.log(`[events] Dispatching WhatsApp ${event} for host=${hostId}`);

  try {
    switch (event) {
      case "room_ready": {
        // Notify host that the room is ready
        await sendWhatsAppTemplate(
          host.phone,
          "room_ready_notification",
          "en_US",
          [
            {
              type: "body",
              parameters: [
                { type: "text", text: payload.propertyName || "Your Property" },
                { type: "text", text: payload.bookingId || "N/A" },
              ],
            },
          ],
        );
        break;
      }

      case "verification_complete": {
        // Notify host that guest ID is verified
        await sendWhatsAppText(
          host.phone,
          `✅ ID Verified: Guest for booking ${payload.bookingId} has been verified.`,
        );
        break;
      }

      case "booking_confirmed": {
        // Welcome notification to host
        await sendWhatsAppText(
          host.phone,
          `💰 New Booking! ${payload.guestName} has booked ${payload.propertyName}.`,
        );
        break;
      }
    }
  } catch (err) {
    console.error(`[events] WhatsApp dispatch failed for host=${hostId}:`, err);
  }
}

/**
 * Generates an HMAC-SHA256 signature for webhook security.
 */
async function generateSignature(
  secret: string,
  data: string,
): Promise<string> {
  const enc = new TextEncoder();
  const keyMatch = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    keyMatch,
    enc.encode(data),
  );
  return btoa(String.fromCharCode(...new Uint8Array(signature)));
}
