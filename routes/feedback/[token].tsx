import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { getSurveyToken, getBookingById, getPropertyById, saveReview } from "../../utils/db.ts";
import type { Booking, Property } from "../../utils/types.ts";

interface FeedbackData {
  booking: Booking;
  property: Property | null;
  token: string;
}

export const handler: Handlers<FeedbackData> = {
  async GET(_req, ctx) {
    const { token } = ctx.params;
    const survey = await getSurveyToken(token);
    if (!survey) return new Response("Invalid or expired feedback link.", { status: 404 });

    const booking = await getBookingById(survey.bookingId);
    if (!booking) return new Response("Booking not found.", { status: 404 });

    const property = await getPropertyById(booking.propertyId);

    return ctx.render({ booking, property, token });
  },

  async POST(req, ctx) {
    const { token } = ctx.params;
    const survey = await getSurveyToken(token);
    if (!survey) return new Response("Link expired.", { status: 403 });

    const formData = await req.formData();
    const rating = parseInt(formData.get("rating")?.toString() || "0");
    const comment = formData.get("comment")?.toString() || "";

    const booking = await getBookingById(survey.bookingId);
    if (!booking) return new Response("Booking error.", { status: 500 });

    await saveReview({
      id: crypto.randomUUID().replace(/-/g, "").slice(0, 12),
      bookingId: booking.id,
      propertyId: booking.propertyId,
      rating,
      comment,
      createdAt: new Date().toISOString(),
    });

    return new Response(null, {
      status: 303,
      headers: { Location: `/feedback/${token}?success=1` }
    });
  }
};

export default function FeedbackPage({ data, url }: PageProps<FeedbackData>) {
  const { booking, property, token } = data;
  const isSuccess = url.searchParams.has("success");

  if (isSuccess) {
    return (
      <div class="min-h-screen bg-gray-50 flex items-center justify-center p-6 text-center">
        <div class="max-w-md w-full bg-white rounded-[2.5rem] p-12 shadow-xl border border-gray-100">
           <div class="w-20 h-20 rounded-3xl bg-teal-50 flex items-center justify-center text-3xl mx-auto mb-8 animate-bounce">✨</div>
           <h1 class="text-3xl font-900 text-gray-900 mb-4 tracking-tight">Thank you!</h1>
           <p class="text-gray-500 font-500 leading-relaxed mb-8">
             Your feedback helps {property?.name || "the host"} stay amazing. We hope to see you again soon at istay.
           </p>
           <a href="/" class="inline-block px-8 py-3.5 bg-gray-900 text-white rounded-xl font-800 text-sm shadow-xl active:scale-95 transition-all">
             Back to Home
           </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>How was your stay? | {property?.name}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>

      <div class="min-h-screen bg-white py-12 px-6">
        <main class="max-w-xl mx-auto">
          <div class="text-center mb-12">
            <h1 class="text-teal-600 font-900 text-3xl tracking-tighter mb-4">istay</h1>
            <p class="text-xs font-800 text-gray-400 uppercase tracking-widest mb-2">Post-Stay Survey</p>
            <h2 class="text-2xl font-800 text-gray-900 tracking-tight">How was your stay at {property?.name}?</h2>
          </div>

          <form method="POST" class="space-y-8">
            <div class="bg-gray-50 rounded-[2rem] p-10 border border-gray-100">
              <label class="block text-center text-sm font-700 text-gray-900 mb-8 uppercase tracking-widest">Your Rating</label>
              
              <div class="flex justify-center gap-4">
                {[1, 2, 3, 4, 5].map((val) => (
                  <label key={val} class="cursor-pointer group">
                    <input type="radio" name="rating" value={val} required class="hidden peer" />
                    <div class="w-12 h-12 flex items-center justify-center rounded-2xl bg-white border-2 border-transparent shadow-sm peer-checked:border-teal-500 peer-checked:bg-teal-50 group-hover:bg-gray-100 transition-all text-2xl grayscale peer-checked:grayscale-0">
                      {val <= 2 ? "🙁" : val === 3 ? "😐" : val === 4 ? "🙂" : "🤩"}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div class="space-y-4">
              <label class="block text-sm font-800 text-gray-900 tracking-tight">Care to share more? (Optional)</label>
              <textarea 
                name="comment" 
                rows={4} 
                placeholder="What did you love? How can we improve?"
                class="w-full rounded-2xl border border-gray-100 bg-gray-50 px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
              />
            </div>

            <button 
              type="submit"
              class="w-full py-4 bg-teal-600 text-white rounded-2xl font-800 shadow-xl shadow-teal-600/20 hover:bg-teal-700 active:scale-95 transition-all text-lg"
            >
              Submit Feedback →
            </button>
          </form>

          <footer class="mt-20 pt-10 border-t border-gray-100 text-center">
             <p class="text-[10px] text-gray-400 font-500 uppercase tracking-widest leading-loose">
               istay · Ghaffar Manzil, Okhla, New Delhi 110025 <br/>
               Safe & Verified Independent Stays
             </p>
          </footer>
        </main>
      </div>
    </>
  );
}
