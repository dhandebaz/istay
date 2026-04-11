// ================================================================
// utils/email.ts — Centralized Email Dispatcher (Brevo API)
// ================================================================

const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY");
const BREVO_EMAIL = Deno.env.get("BREVO_EMAIL") || "no-reply@istay.space";
const APP_BASE_URL = Deno.env.get("APP_BASE_URL") || "https://istay.space";

/**
 * Core send routine for Brevo REST API.
 */
async function sendBrevoEmail(
  toEmail: string,
  toName: string,
  subject: string,
  htmlContent: string
): Promise<boolean> {
  if (!BREVO_API_KEY) {
    console.warn("\n[email] BREVO_API_KEY missing explicitly. Attempted to send:");
    console.warn(`To: ${toEmail}\nSubject: ${subject}\n`);
    return false;
  }

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "istay Host Operations", email: BREVO_EMAIL },
        to: [{ email: toEmail, name: toName }],
        subject,
        htmlContent,
      }),
    });

    if (!res.ok) {
      const errDetail = await res.text();
      console.error("[email] Brevo API Error:", errDetail);
      return false;
    }

    return true;
  } catch (error) {
    console.error("[email] Fetch exception:", error);
    return false;
  }
}

/**
 * Dispatches the Host Onboarding verification email.
 */
export async function sendVerificationEmail(
  email: string,
  name: string,
  verifyToken: string
): Promise<boolean> {
  const verifyLink = `${APP_BASE_URL}/verify?token=${verifyToken}&email=${encodeURIComponent(email)}`;
  
  const subject = "Verify your istay account";
  const html = `
    <div style="font-family: sans-serif; max-w-xl mx-auto; p-6 text-gray-800">
      <h2 style="color: #00E676;">Welcome to istay, ${name}! 🏡</h2>
      <p>Before you can activate your property listings and receive bookings, we need to verify your email address.</p>
      <div style="margin: 30px 0;">
        <a href="${verifyLink}" style="background-color: #00E676; color: #042f2e; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
          Verify Email Address
        </a>
      </div>
      <p style="font-size: 12px; color: #666;">
        If the button doesn't work, copy and paste this link into your browser:<br/>
        ${verifyLink}
      </p>
    </div>
  `;

  return sendBrevoEmail(email, name, subject, html);
}

/**
 * Dispatches the Password Reset challenge.
 */
export async function sendPasswordResetEmail(
  email: string,
  name: string,
  resetToken: string
): Promise<boolean> {
  const resetLink = `${APP_BASE_URL}/reset/${resetToken}?email=${encodeURIComponent(email)}`;
  
  const subject = "Reset your istay password";
  const html = `
    <div style="font-family: sans-serif; max-w-xl mx-auto; p-6 text-gray-800">
      <h2>Password Reset Request 🔐</h2>
      <p>Hello ${name},</p>
      <p>We received a request to reset the password for your istay host account. This link will expire in 1 hour.</p>
      <div style="margin: 30px 0;">
        <a href="${resetLink}" style="background-color: #111827; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
          Reset Password
        </a>
      </div>
      <p>If you did not request this, you can safely ignore this email.</p>
      <p style="font-size: 12px; color: #666;">
        If the button doesn't work, copy and paste this link into your browser:<br/>
        ${resetLink}
      </p>
    </div>
  `;

  return sendBrevoEmail(email, name, subject, html);
}

/**
 * Dispatches the Guest Booking Confirmation.
 */
export async function sendBookingConfirmation(
  guestEmail: string,
  guestName: string,
  propertyName: string,
  checkIn: string,
  checkOut: string,
  amount: number,
  bookingId: string
): Promise<boolean> {
  const subject = `Your Booking Confirmation: ${propertyName}`;
  const html = `
    <div style="font-family: sans-serif; max-w-xl mx-auto; p-6 text-gray-800">
      <h2 style="color: #00E676;">Booking Confirmed! 🎉</h2>
      <p>Hello ${guestName},</p>
      <p>Your stay at <strong>${propertyName}</strong> is locked in.</p>
      
      <div style="background-color: #f9fafb; padding: 20px; border-radius: 12px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #111827;">Reservation Details</h3>
        <ul style="list-style: none; padding: 0; margin: 0; color: #374151;">
          <li style="margin-bottom: 8px;"><strong>Check-in:</strong> ${checkIn}</li>
          <li style="margin-bottom: 8px;"><strong>Check-out:</strong> ${checkOut}</li>
          <li style="margin-bottom: 8px;"><strong>Amount Paid:</strong> ₹${amount.toLocaleString("en-IN")}</li>
          <li><strong>Booking ID:</strong> ${bookingId}</li>
        </ul>
      </div>

      <p>Your host will be in touch shortly with check-in instructions.</p>
      <p style="font-size: 13px; color: #666; margin-top: 40px;">
        Thank you for choosing istay.<br/>
        <a href="https://istay.space" style="color: #00E676; text-decoration: none;">istay.space</a>
      </p>
    </div>
  `;

  return sendBrevoEmail(guestEmail, guestName, subject, html);
}
