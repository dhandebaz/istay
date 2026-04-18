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
  htmlContent: string,
): Promise<boolean> {
  if (!BREVO_API_KEY) {
    console.warn(
      "\n[email] BREVO_API_KEY missing explicitly. Attempted to send:",
    );
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
 * Generic email dispatcher used for automated communications.
 */
export async function sendEmail(params: {
  to: string;
  subject: string;
  html: string;
}) {
  return sendBrevoEmail(
    params.to,
    params.to.split("@")[0],
    params.subject,
    params.html,
  );
}

/**
 * Dispatches the Host Onboarding verification email.
 */
export async function sendVerificationEmail(
  email: string,
  name: string,
  verifyToken: string,
): Promise<boolean> {
  const verifyLink = `${APP_BASE_URL}/verify?token=${verifyToken}&email=${
    encodeURIComponent(email)
  }`;

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
  resetToken: string,
): Promise<boolean> {
  const resetLink = `${APP_BASE_URL}/reset/${resetToken}?email=${
    encodeURIComponent(email)
  }`;

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
  bookingId: string,
  propertyId: string,
): Promise<boolean> {
  const portalUrl = `${APP_BASE_URL}/p/${propertyId}?bookingId=${bookingId}`;
  const invoiceUrl = `${APP_BASE_URL}/invoice/${bookingId}?download=1`;

  const subject = `Confirmed: Your stay at ${propertyName}`;
  const html = `
    <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #111827; background-color: #ffffff;">
      <div style="text-align: center; margin-bottom: 32px;">
         <h1 style="color: #0d9488; margin: 0; font-size: 28px; font-weight: 900; letter-spacing: -0.025em;">istay</h1>
      </div>

      <h2 style="font-size: 24px; font-weight: 800; margin-bottom: 16px; letter-spacing: -0.025em;">You're going to ${propertyName}! 🎉</h2>
      <p style="font-size: 16px; line-height: 1.6; color: #4b5563; margin-bottom: 32px;">
        Hi ${guestName}, your booking is confirmed. We've notified the host, and they're excited to welcome you.
      </p>

      <div style="background-color: #f9fafb; border: 1px solid #f3f4f6; border-radius: 24px; padding: 32px; margin-bottom: 32px;">
        <h3 style="font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: #9ca3af; margin: 0 0 16px 0;">Reservation Summary</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Check-in</td>
            <td style="padding: 8px 0; text-align: right; font-weight: 700;">${checkIn}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Check-out</td>
            <td style="padding: 8px 0; text-align: right; font-weight: 700;">${checkOut}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Total Paid</td>
            <td style="padding: 8px 0; text-align: right; font-weight: 700; color: #0d9488;">₹${
    amount.toLocaleString("en-IN")
  }</td>
          </tr>
        </table>
        
        <div style="margin-top: 24px; pt-16; border-top: 1px solid #e5e7eb; padding-top: 24px;">
           <a href="${invoiceUrl}" style="color: #0d9488; font-size: 13px; font-weight: 700; text-decoration: none;">Download Tax Invoice (PDF) ↗</a>
        </div>
      </div>

      <div style="text-align: center; background-color: #042f2e; border-radius: 24px; padding: 40px 32px; color: #ffffff; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);">
        <h3 style="font-size: 20px; font-weight: 800; margin: 0 0 12px 0; color: #14b8a6;">Action Required</h3>
        <p style="font-size: 15px; color: #ccfbf1; margin-bottom: 24px; line-height: 1.6;">
          For security and compliance, you must verify your government ID to unlock WiFi codes and check-in instructions.
        </p>
        <a href="${portalUrl}" style="display: inline-block; background-color: #14b8a6; color: #ffffff; padding: 16px 40px; text-decoration: none; border-radius: 14px; font-weight: 900; font-size: 16px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          Verify ID to Unlock
        </a>
      </div>

      <p style="font-size: 12px; color: #9ca3af; text-align: center; margin-top: 48px; line-height: 1.6;">
        This is an automated message from istay. You can access your booking anytime at <a href="${portalUrl}" style="color: #0d9488; text-decoration: none;">your guest portal</a>.<br/>
        Ghaffar Manzil, Okhla, New Delhi 110025.
      </p>
    </div>
  `;

  return sendBrevoEmail(guestEmail, guestName, subject, html);
}

/**
 * Dispatches a New Booking Alert to the Host.
 */
export async function sendHostNewBookingAlert(
  hostEmail: string,
  hostName: string,
  guestName: string,
  propertyName: string,
  checkIn: string,
  checkOut: string,
  amount: number,
  bookingId: string,
): Promise<boolean> {
  const dashboardUrl = `${APP_BASE_URL}/dashboard`;
  const hostEarnings = Math.round(amount * 0.95 * 100) / 100;

  const subject = `New Booking: ${guestName} — ${propertyName}`;
  const html = `
    <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #111827;">
      <div style="margin-bottom: 32px;">
         <h1 style="color: #0d9488; margin: 0; font-size: 24px; font-weight: 900;">istay Host</h1>
      </div>

      <h2 style="font-size: 22px; font-weight: 800; margin-bottom: 16px;">New Booking Confirmed! 🎉</h2>
      <p style="font-size: 16px; color: #4b5563; margin-bottom: 32px;">
        Great news ${hostName}, your property <b>${propertyName}</b> has a new confirmed booking.
      </p>

      <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 20px; padding: 24px; margin-bottom: 32px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 6px 0; color: #166534; font-size: 14px;">Guest</td>
            <td style="padding: 6px 0; text-align: right; font-weight: 700; color: #166534;">${guestName}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #166534; font-size: 14px;">Dates</td>
            <td style="padding: 6px 0; text-align: right; font-weight: 700; color: #166534;">${checkIn} → ${checkOut}</td>
          </tr>
          <tr style="border-top: 1px solid #bbf7d0; margin-top: 12px;">
            <td style="padding: 12px 0 0 0; color: #166534; font-size: 14px; font-weight: 800;">Your Earnings</td>
            <td style="padding: 12px 0 0 0; text-align: right; font-weight: 900; color: #166534; font-size: 18px;">₹${
    hostEarnings.toLocaleString("en-IN")
  }</td>
          </tr>
        </table>
      </div>

      <a href="${dashboardUrl}" style="display: block; text-align: center; background-color: #111827; color: #ffffff; padding: 16px; text-decoration: none; border-radius: 12px; font-weight: 800;">
        View Booking in Dashboard
      </a>

      <p style="font-size: 12px; color: #9ca3af; text-align: center; margin-top: 40px;">
        istay · Ghaffar Manzil, Okhla, New Delhi 110025.
      </p>
    </div>
  `;

  return sendBrevoEmail(hostEmail, hostName, subject, html);
}
