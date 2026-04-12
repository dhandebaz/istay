import { type Handlers } from "$fresh/server.ts";
import { getBookingById, saveBooking, saveNotification } from "../../../utils/db.ts";
import type { Notification } from "../../../utils/types.ts";

export const handler: Handlers = {
  POST: async (req) => {
    try {
      const { bookingId, guestName, photoBase64, checklist } = await req.json();

      if (!bookingId || !photoBase64) {
        return Response.json({ error: "Missing required fields" }, { status: 400 });
      }

      const booking = await getBookingById(bookingId);
      if (!booking) {
        return Response.json({ error: "Booking not found" }, { status: 404 });
      }

      // Update Booking Status & Checklist
      booking.status = "room_ready";
      booking.checkoutChecklist = checklist;
      booking.updatedAt = new Date().toISOString();
      await saveBooking(booking);

      // Create Notification for Host
      const notification: Notification = {
        id: crypto.randomUUID().replace(/-/g, "").slice(0, 16),
        hostId: booking.hostId,
        type: "supply_request", // Reusing this generic actionable type for UI purposes, or could add 'room_ready' type
        title: `Housekeeping: ${guestName}'s room is ready ✨`,
        message: "The caretaker has marked the room as ready and attached a photo. The guest will now see 'Room Ready' in their portal.",
        propertyName: booking.propertyId,
        meta: {
          bookingId: booking.id,
          photoBase64: photoBase64, // The dashboard can render this using `data:image/jpeg;base64,${meta.photoBase64}`
        },
        read: false,
        createdAt: new Date().toISOString(),
      };

      await saveNotification(notification);

      return Response.json({ ok: true });
    } catch (err: any) {
      console.error("[caretaker] Ready error:", err);
      return Response.json({ error: "Internal server error" }, { status: 500 });
    }
  },
};
