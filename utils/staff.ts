import { Booking, Property } from "./types.ts";
import { getPropertyById, saveBooking } from "./db.ts";
import { sendWhatsAppMessage } from "./whatsapp.ts";

const WHATSAPP_TOKEN = () => Deno.env.get("WHATSAPP_TOKEN") || "";
const WHATSAPP_PHONE_ID = () => Deno.env.get("WHATSAPP_PHONE_ID") || "";

/**
 * Dispatches a mission alert to the assigned caretaker when a booking is confirmed.
 * Generates a caretaker token if it doesn't exist.
 */
export async function dispatchCaretakerMission(booking: Booking) {
  const property = await getPropertyById(booking.propertyId);
  if (!property || !property.caretakerPhone) return;

  // Generate a mission token for this specific booking/caretaker session if not present
  // For simplicity, we use the property's caretaker token if it exists, or generate a fresh one
  const token = property.caretakerToken || crypto.randomUUID().slice(0, 8);
  
  const protocol = "https://"; // In production, this is istay.space
  const missionUrl = `${protocol}istay.space/care/${token}?booking=${booking.id}`;
  
  const message = `🚨 *ISTAY MISSION ALERT* 🚨
Hi ${property.caretakerName || "Caretaker"}, a new booking has been confirmed for *${property.name}*.

Check-in: ${booking.checkIn}
Guest: ${booking.guestName}

Please ensure the room is cleaned and prepared. Upload Proof of Clean here:
${missionUrl}

Thank you! 🧹✨`;

  const success = await sendWhatsAppMessage(property.caretakerPhone, message);
  if (success) {
    console.log(`[staff] Mission dispatched to ${property.caretakerPhone} for booking=${booking.id}`);
  }
}
