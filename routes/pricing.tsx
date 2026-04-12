import { Head } from "$fresh/runtime.ts";
import Header from "../islands/Header.tsx";
import Footer from "../components/Footer.tsx";
import EarningsCalculator from "../islands/EarningsCalculator.tsx";
import PricingCheckout from "../islands/PricingCheckout.tsx";
import { parseCookies } from "../routes/dashboard/_middleware.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

interface PricingData {
  hostId: string | null;
}

export const handler: Handlers<PricingData> = {
  GET(req, ctx) {
    const cookies = parseCookies(req.headers.get("cookie"));
    const session = cookies["host_session"];
    let hostId: string | null = null;
    if (session) {
      try {
        const decoded = decodeURIComponent(session);
        hostId = decoded.split("|")[0]?.trim() || null;
      } catch {
        hostId = session.trim() || null;
      }
    }
    return ctx.render({ hostId });
  },
};

const SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "istay",
  applicationCategory: "BusinessApplication",
  offers: {
    "@type": "Offer",
    price: "1000",
    priceCurrency: "INR",
    description: "One-time lifetime setup fee. 5% flat commission on bookings.",
  },
});

const FAQS = [
  {
    q: "Is the ₹1,000 fee a one-time payment?",
    a: "Yes. You pay ₹1,000 once and your booking channel is live forever. There are no monthly or annual subscription fees.",
  },
  {
    q: "What does the 5% fee cover?",
    a: "The 5% per-transaction fee covers payment processing, platform hosting, AI concierge compute, and 24/7 support.",
  },
  {
    q: "Can I still use Airbnb alongside istay?",
    a: "Absolutely. istay is an additional direct channel, not a replacement. Many hosts use it to convert repeat guests and social followers away from OTAs.",
  },
  {
    q: "Is the setup fee refundable?",
    a: "No — once your account is activated and your booking page is live, the ₹1,000 setup fee is non-refundable. Please review our Cancellation Policy for details.",
  },
  {
    q: "How are guests charged?",
    a: "Guests pay via UPI, debit/credit card, or net banking through our Easebuzz integration. You receive 95% directly to your linked bank account.",
  },
  {
    q: "Do I need any technical skills?",
    a: "None. Setup takes under 10 minutes — just fill in your property details, set your rates, and share your link. No code required.",
  },
];

export default function Pricing({ data }: PageProps<PricingData>) {
  return (
    <>
      <Head>
        <title>Pricing | istay — ₹1,000 Setup + 5% Flat Fee</title>
        <meta
          name="description"
          content="istay charges a one-time ₹1,000 setup fee and a flat 5% per booking. Compare vs Airbnb (15%) and MakeMyTrip (18%) — and see how much you keep."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: SCHEMA }}
        />
      </Head>

      <Header />

      <main>
        {/* ── HERO ─────────────────────────────────────────── */}
        <section class="relative overflow-hidden bg-white py-20 sm:py-28">
          <div
            aria-hidden="true"
            class="absolute top-0 right-0 w-96 h-96 rounded-full bg-mint-50 opacity-50 blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"
          />
          <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-mint-100 border border-mint-200 text-istay-900 text-xs font-800 uppercase tracking-wider mb-6">
              Transparent Pricing
            </div>
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-800 text-gray-900 tracking-tight leading-tight max-w-4xl mx-auto">
              Stop paying <span class="text-rose-500 underline decoration-rose-200 decoration-4 underline-offset-4">15%</span> just to get booked.
              <br />
              <span class="text-mint-500">Own your audience.</span>
            </h1>
            <p class="mt-6 text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
              One lifetime fee. One flat transaction rate. No monthly bills, no OTA dependency.
            </p>
          </div>
        </section>

        {/* ── PRICING CARD ──────────────────────────────────── */}
        <section class="py-4 pb-20 bg-white">
          <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="relative rounded-3xl bg-gradient-to-br from-mint-400 to-emerald-600 p-px shadow-xl">
              <div class="rounded-[23px] bg-white p-8 sm:p-12">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div>
                    <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mint-100 text-istay-900 text-xs font-900 mb-5 tracking-tight uppercase">
                      ✦ Lifetime Plan
                    </div>
                    <div class="mb-8">
                      <div class="flex items-baseline gap-2 mb-1">
                        <span class="text-5xl font-900 text-gray-900">₹1,000</span>
                        <span class="text-gray-400 text-sm font-500 uppercase tracking-wide">one-time</span>
                      </div>
                      <div class="flex items-baseline gap-2">
                        <span class="text-3xl font-800 text-mint-500">+ 5%</span>
                        <span class="text-gray-400 text-sm font-500 uppercase tracking-wide">per booking</span>
                      </div>
                    </div>

                    <ul class="space-y-4 mb-10">
                      {[
                        "Branded direct booking page",
                        "AI Guest Concierge (24/7)",
                        "OCR guest ID verification",
                        "Real-time revenue dashboard",
                        "Easebuzz Slices (95/5 split)",
                        "WhatsApp booking notifications",
                        "Unlimited properties",
                      ].map((item) => (
                        <li key={item} class="flex items-start gap-3 text-sm text-gray-600 font-500">
                          <span class="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-mint-50 flex items-center justify-center">
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                              <path d="M2 5L4 7L8 3" stroke="#0C4D4D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    {data.hostId ? (
                      <PricingCheckout hostId={data.hostId} />
                    ) : (
                      <a
                        href="/contact"
                        class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-mint-500 text-istay-900 font-800 shadow-md hover:bg-mint-400 hover:shadow-lg active:scale-95 transition-all duration-200"
                      >
                        Register to Start Hosting
                        <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                          <path d="M2 8H14M8 2L14 8L8 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                      </a>
                    )}
                  </div>

                  {/* Comparison table */}
                  <div class="rounded-2xl bg-gray-50 border border-gray-100 p-2">
                    <table class="w-full text-sm">
                      <thead>
                        <tr>
                          <th class="text-left px-4 py-4 text-xs font-700 text-gray-400 uppercase tracking-widest">Platform</th>
                          <th class="text-right px-4 py-4 text-xs font-700 text-gray-400 uppercase tracking-widest">Fee</th>
                          <th class="text-right px-4 py-4 text-xs font-700 text-gray-400 uppercase tracking-widest">Take Home</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-100">
                        {[
                          { name: "istay", pct: "5%", home: "₹95,000", highlight: true },
                          { name: "Airbnb", pct: "15%", home: "₹85,000" },
                          { name: "MakeMyTrip", pct: "18%", home: "₹82,000" },
                          { name: "Booking.com", pct: "≈17%", home: "₹83,000" },
                        ].map(({ name, pct, home, highlight }) => (
                          <tr key={name} class={`${highlight ? "bg-white shadow-sm rounded-xl" : ""}`}>
                            <td class={`px-4 py-4 font-700 ${highlight ? "text-istay-900" : "text-gray-700"}`}>
                              {name}
                              {highlight && <span class="ml-2 text-[10px] bg-mint-500 text-istay-900 font-900 px-1.5 py-0.5 rounded-full">RECOMMENDED</span>}
                            </td>
                            <td class={`px-4 py-4 text-right font-600 ${highlight ? "text-mint-500" : "text-rose-400"}`}>{pct}</td>
                            <td class="px-4 py-4 text-right font-800 text-gray-900">{home}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── EARNINGS CALCULATOR ──────────────────────────── */}
        <section class="py-24 bg-gray-50">
          <div class="max-w-4xl mx-auto px-4 text-center mb-12">
            <h2 class="text-3xl sm:text-4xl font-900 text-gray-900 tracking-tight">Calculate your freedom</h2>
            <p class="mt-4 text-gray-500 text-lg">See exactly how much more you earn compared to high-commission platforms.</p>
          </div>
          <div class="max-w-4xl mx-auto px-4">
            <EarningsCalculator />
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────── */}
        <section class="py-24 bg-white">
          <div class="max-w-3xl mx-auto px-4">
            <h2 class="text-3xl font-900 text-gray-900 text-center mb-16 underline decoration-istay-100 decoration-8 underline-offset-8">Common Questions</h2>
            <div class="space-y-4">
              {FAQS.map(({ q, a }, i) => (
                <details key={i} class="group rounded-2xl border border-gray-100 hover:border-mint-200 transition-colors duration-200">
                  <summary class="flex items-center justify-between px-6 py-5 cursor-pointer list-none font-700 text-gray-900">
                    {q}
                    <svg class="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div class="px-6 pb-6 text-gray-500 text-sm leading-relaxed">{a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
