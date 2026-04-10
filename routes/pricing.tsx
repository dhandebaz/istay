import { Head } from "$fresh/runtime.ts";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import EarningsCalculator from "../islands/EarningsCalculator.tsx";

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
    a: "The 5% per-transaction fee covers payment processing (Razorpay), platform hosting, AI concierge compute, and 24/7 support.",
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
    a: "Guests pay via UPI, debit/credit card, or net banking through our Razorpay integration. You receive 95% directly to your linked bank account.",
  },
  {
    q: "Do I need any technical skills?",
    a: "None. Setup takes under 10 minutes — just fill in your property details, set your rates, and share your link. No code required.",
  },
];

export default function Pricing() {
  return (
    <>
      <Head>
        <title>Pricing | istay — ₹1,000 Setup + 5% Flat Fee</title>
        <meta
          name="description"
          content="istay charges a one-time ₹1,000 setup fee and a flat 5% per booking. Compare vs Airbnb (15%) and MakeMyTrip (18%) — and see how much you keep."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="istay Pricing — Stop paying 15% just to get booked"
        />
        <meta
          property="og:description"
          content="₹1,000 lifetime setup. 5% flat fee. Zero monthly subscriptions. Calculate your earnings now."
        />
        <meta property="og:image" content="https://istay.space/og-pricing.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="istay Pricing — 5% flat vs Airbnb 15%"
        />
        <meta
          name="twitter:description"
          content="One-time setup, one flat fee. No monthly charges. See the math."
        />
        <meta name="twitter:image" content="https://istay.space/og-pricing.png" />
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
            class="absolute top-0 right-0 w-96 h-96 rounded-full bg-teal-100 opacity-50 blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"
          />
          <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-600 uppercase tracking-wider mb-6">
              Transparent Pricing
            </div>
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-800 text-gray-900 tracking-tight leading-tight max-w-4xl mx-auto">
              Stop paying{" "}
              <span class="text-rose-500">15%</span> just to get booked.
              <br />
              <span class="text-teal-500">Own your audience.</span>
            </h1>
            <p class="mt-6 text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
              One lifetime fee. One flat transaction rate. No monthly bills, no surprise charges, no OTA dependency.
            </p>
          </div>
        </section>

        {/* ── PRICING CARD ──────────────────────────────────── */}
        <section class="py-4 pb-20 bg-white">
          <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="relative rounded-3xl bg-gradient-to-br from-teal-500 to-emerald-600 p-px shadow-xl">
              <div class="rounded-3xl bg-white p-8 sm:p-12">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                  {/* Left — Pricing details */}
                  <div>
                    <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-700 mb-5">
                      ✦ Lifetime Plan
                    </div>
                    <div class="mb-6">
                      <div class="flex items-baseline gap-2 mb-1">
                        <span class="text-5xl font-800 text-gray-900">₹1,000</span>
                        <span class="text-gray-400 text-sm">one-time setup</span>
                      </div>
                      <div class="flex items-baseline gap-2">
                        <span class="text-3xl font-800 text-teal-600">5%</span>
                        <span class="text-gray-400 text-sm">
                          flat per booking — that's it
                        </span>
                      </div>
                    </div>

                    <ul class="space-y-3 mb-8">
                      {[
                        "Branded direct booking page",
                        "AI Guest Concierge (24/7)",
                        "OCR guest ID verification",
                        "Real-time revenue dashboard",
                        "Razorpay payment processing",
                        "WhatsApp booking notifications",
                        "GST-compliant invoices",
                        "Unlimited properties",
                      ].map((item) => (
                        <li key={item} class="flex items-start gap-3 text-sm text-gray-600">
                          <span class="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center">
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 10 10"
                              fill="none"
                              aria-hidden="true"
                            >
                              <path
                                d="M2 5L4 7L8 3"
                                stroke="#0d9488"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    <a
                      href="/contact"
                      id="pricing-cta"
                      class="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-teal-500 text-white font-700 shadow-md hover:bg-teal-600 hover:shadow-lg active:scale-95 transition-all duration-200"
                    >
                      Start Hosting Today
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M2 8H14M8 2L14 8L8 14"
                          stroke="white"
                          stroke-width="1.8"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </a>
                  </div>

                  {/* Right — Comparison table */}
                  <div class="rounded-2xl bg-gray-50 border border-gray-100 overflow-hidden">
                    <table class="w-full text-sm">
                      <thead>
                        <tr class="border-b border-gray-100">
                          <th class="text-left px-5 py-3 text-xs font-700 text-gray-400 uppercase tracking-wider">
                            Platform
                          </th>
                          <th class="text-right px-5 py-3 text-xs font-700 text-gray-400 uppercase tracking-wider">
                            Commission
                          </th>
                          <th class="text-right px-5 py-3 text-xs font-700 text-gray-400 uppercase tracking-wider">
                            on ₹1L
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { name: "istay", pct: "5%", amt: "₹5,000", highlight: true },
                          { name: "Airbnb", pct: "15%", amt: "₹15,000" },
                          { name: "MakeMyTrip", pct: "18%", amt: "₹18,000" },
                          { name: "Booking.com", pct: "~17%", amt: "₹17,000" },
                        ].map(({ name, pct, amt, highlight }) => (
                          <tr
                            key={name}
                            class={`border-b border-gray-100 last:border-0 ${
                              highlight ? "bg-teal-50" : ""
                            }`}
                          >
                            <td
                              class={`px-5 py-3.5 font-600 ${
                                highlight ? "text-teal-700" : "text-gray-700"
                              }`}
                            >
                              {name}
                              {highlight && (
                                <span class="ml-2 text-xs px-1.5 py-0.5 rounded-full bg-teal-500 text-white font-700">
                                  You
                                </span>
                              )}
                            </td>
                            <td
                              class={`px-5 py-3.5 text-right font-700 ${
                                highlight ? "text-teal-600" : "text-rose-500"
                              }`}
                            >
                              {pct}
                            </td>
                            <td class="px-5 py-3.5 text-right text-gray-500">
                              {amt}
                            </td>
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

        {/* ── EARNINGS CALCULATOR ISLAND ────────────────────── */}
        <section class="py-20 bg-gray-50" id="calculator">
          <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-10">
              <h2 class="text-3xl sm:text-4xl font-800 text-gray-900 tracking-tight">
                Calculate your earnings
              </h2>
              <p class="mt-3 text-gray-500 text-lg">
                Move the sliders below to see your exact take-home with each platform.
              </p>
            </div>
            <EarningsCalculator />
          </div>
        </section>

        {/* ── FAQ ACCORDION ─────────────────────────────────── */}
        <section class="py-20 bg-white" id="faq">
          <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
              <h2 class="text-3xl font-800 text-gray-900 tracking-tight">
                Frequently asked questions
              </h2>
            </div>

            <div class="space-y-3">
              {FAQS.map(({ q, a }, i) => (
                <details
                  key={i}
                  class="group rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden"
                >
                  <summary class="flex items-center justify-between px-6 py-5 cursor-pointer text-base font-600 text-gray-900 hover:bg-gray-50 transition-colors duration-150 list-none">
                    {q}
                    <svg
                      class="flex-shrink-0 ml-4 w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform duration-200"
                      viewBox="0 0 20 20"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 7.5L10 12.5L15 7.5"
                        stroke="currentColor"
                        stroke-width="1.75"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </summary>
                  <div class="px-6 pb-5 text-sm text-gray-500 leading-relaxed border-t border-gray-50 pt-4">
                    {a}
                  </div>
                </details>
              ))}
            </div>

            <div class="mt-10 text-center">
              <p class="text-gray-500 text-sm">
                Still have questions?{" "}
                <a
                  href="/contact"
                  class="text-teal-600 font-600 hover:text-teal-700 hover:underline"
                >
                  Contact our team →
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
