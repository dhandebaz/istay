import { type Handlers } from "$fresh/server.ts";
import { getBookingById, saveBooking, saveNotification, getPropertyById } from "../../../utils/db.ts";
import type { Notification } from "../../../utils/types.ts";

export const handler: Handlers = {
  POST: async (req) => {
    try {
      const { bookingId, checklist, photoBase64 } = await req.json();

      if (!bookingId) {
        return Response.json({ error: "Booking ID is required" }, { status: 400 });
      }

      const booking = await getBookingById(bookingId);
      if (!booking) {
        return Response.json({ error: "Booking not found" }, { status: 404 });
      }

      const property = await getPropertyById(booking.propertyId);

      // 1. Update Booking Status
      booking.status = "room_ready";
      booking.checkoutChecklist = checklist;
      booking.cleanProofUrl = photoBase64 ? `data:image/jpeg;base64,${photoBase64}` : undefined;
      booking.updatedAt = new Date().toISOString();

      await saveBooking(booking);

      // 2. Create Host Notification
      const notification: Notification = {
        id: crypto.randomUUID(),
        hostId: booking.hostId,
        type: "housekeeping_ready",
        title: "Room Ready ✨",
        message: `Caretaker has marked "${booking.guestName}"'s room as clean and ready for check-in.`,
        propertyName: property?.name || "Property",
        meta: {
          bookingId: booking.id,
          imageUrl: booking.cleanProofUrl || "",
          checklist: JSON.stringify(checklist),
        },
        read: false,
        createdAt: new Date().toISOString(),
      };

      await saveNotification(notification);

      return Response.json({ ok: true });
    } catch (error: any) {
      console.error("[api/caretaker/ready] Error:", error);
      return Response.json({ error: error.message }, { status: 500 });
    }
  },
};
