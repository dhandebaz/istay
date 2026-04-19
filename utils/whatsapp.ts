// ================================================================
// utils/whatsapp.ts — Meta WhatsApp Business API Bridge
// ================================================================

const WHATSAPP_TOKEN = () => Deno.env.get("WHATSAPP_TOKEN") || "";
const WHATSAPP_PHONE_ID = () => Deno.env.get("WHATSAPP_PHONE_ID") || "";

/**
 * Sends a message via the Meta WhatsApp Business API.
 */
export async function sendWhatsApp(to: string, payload: any) {
  const token = WHATSAPP_TOKEN();
  const phoneId = WHATSAPP_PHONE_ID();

  if (!token || !phoneId) {
    console.error("[whatsapp] Missing WHATSAPP_TOKEN or WHATSAPP_PHONE_ID");
    return { ok: false, error: "Configuration missing" };
  }

  // Ensure 'to' is in international format without '+' or '00'
  const cleanTo = to.replace(/\D/g, "");
  const url = `https://graph.facebook.com/v22.0/${phoneId}/messages`;

  const body = JSON.stringify({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: cleanTo,
    ...payload,
  });

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body,
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("[whatsapp] Meta API error:", data);
      return { ok: false, error: data.error?.message || "Unknown API error" };
    }

    return { ok: true, data };
  } catch (err) {
    console.error("[whatsapp] Exception:", err);
    return { ok: false, error: "Network error" };
  }
}

/**
 * Convenience helper for standardized templates.
 */
export async function sendWhatsAppTemplate(
  to: string,
  templateName: string,
  languageCode = "en_US",
  components: any[] = [],
) {
  return await sendWhatsApp(to, {
    type: "template",
    template: {
      name: templateName,
      language: { code: languageCode },
      components,
    },
  });
}

/**
 * Simple text message (only works within 24h session).
 */
export async function sendWhatsAppText(to: string, text: string) {
  return await sendWhatsApp(to, {
    type: "text",
    text: { body: text },
  });
}

// Export as alias for broader compatibility across the codebase
export { sendWhatsAppText as sendWhatsAppMessage };

/**
 * Generates a pre-filled wa.me link for manual host actions.
 * Used when the automated API is not needed or for quick overrides.
 */
export function getWhatsAppLink(phone: string, message: string): string {
  const cleanPhone = phone.replace(/\D/g, "");
  const formattedPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
  return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Standard message text for manual WhatsApp links.
 */
export const WHATSAPP_MANUAL_TEMPLATES = {
  REVIEW_REQUEST: (guestName: string, propertyName: string, reviewUrl: string) =>
    `Hi ${guestName}! Hope you enjoyed your stay at ${propertyName}. Would you mind leaving us a quick review? It takes less than a minute: ${reviewUrl}`,
  BOOKING_CONFIRMED: (guestName: string, propertyName: string, guideUrl: string) =>
    `Hi ${guestName}, your booking at ${propertyName} is confirmed! View your check-in guide here: ${guideUrl}`,
};
