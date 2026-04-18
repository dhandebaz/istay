import {
  getBookingsCheckingOutIn,
  saveSurveyToken,
} from "../../../utils/db.ts";
import { sendEmail } from "../../../utils/email.ts";

export const handler = async (_req: Request) => {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const checkouts = await getBookingsCheckingOutIn(today);

    console.log(
      `[cron/reviews] Found ${checkouts.length} checkouts for ${today}`,
    );

    for (const booking of checkouts) {
      // 1. Generate unique survey token
      const surveyToken = crypto.randomUUID();
      await saveSurveyToken(surveyToken, booking.id);

      // 2. Send Post-Stay Survey Email
      const surveyUrl = `https://istay.space/feedback/${surveyToken}`;

      await sendEmail({
        to: booking.guestEmail,
        subject: `How was your stay at ${booking.guestName}'s property?`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 12px;">
            <h1 style="color: #0d9488;">Hope you had a great stay!</h1>
            <p>Hi ${booking.guestName.split(" ")[0]},</p>
            <p>Thank you for choosing to stay with us. We'd love to hear about your experience to help us improve.</p>
            
            <div style="margin: 30px 0;">
              <a href="${surveyUrl}" style="background-color: #0d9488; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
                Share Feedback
              </a>
            </div>
            
            <p style="color: #666; font-size: 12px;">This link will expire in 7 days.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #999;">istay | Direct Bookings, Zero Fees.</p>
          </div>
        `,
      });

      console.log(`[cron/reviews] Survey sent to ${booking.guestEmail}`);
    }

    return new Response("Cron completed successfully", { status: 200 });
  } catch (error: any) {
    console.error("[cron/reviews] Error:", error);
    return new Response(error.message, { status: 500 });
  }
};
