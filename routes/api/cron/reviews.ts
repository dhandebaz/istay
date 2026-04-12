import { type Handlers } from "$fresh/server.ts";
import { getBookingsCheckingOutIn, saveSurveyToken } from "../../../utils/db.ts";

const CRON_SECRET = Deno.env.get("CRON_SECRET");

export const handler: Handlers = {
  GET: async (req) => {
    if (CRON_SECRET) {
      const url = new URL(req.url);
      if (url.searchParams.get("secret") !== CRON_SECRET) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const today = new Date().toISOString().slice(0, 10);
    const bookings = await getBookingsCheckingOutIn(today);

    const generatedTokens: string[] = [];

    for (const booking of bookings) {
       // Generate unique token
       const token = crypto.randomUUID().replace(/-/g, "");
       await saveSurveyToken(token, booking.id);
       
       // Stub: Send WhatsApp/Email with link
       // console.log(`Triggering post-stay survey for ${booking.guestName} / ${booking.id}`);
       // const surveyUrl = `${APP_BASE_URL}/feedback/${token}`;
       
       generatedTokens.push(token);
    }

    return Response.json({
      ok: true,
      today,
      processed: bookings.length,
      tokens: generatedTokens
    });
  },
};
