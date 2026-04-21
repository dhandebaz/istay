import { Head } from "$fresh/runtime.ts";
import Header from "../islands/Header.tsx";
import Footer from "../components/Footer.tsx";
import EarningsCalculator from "../islands/EarningsCalculator.tsx";
import PricingCheckout from "../islands/PricingCheckout.tsx";
import FaqSearch from "../islands/FaqSearch.tsx";
import LazyIsland from "../islands/LazyIsland.tsx";
import SEOMeta from "../components/SEOMeta.tsx";
import { ArrowRightIcon, CheckIcon, StarIcon } from "../components/Icons.tsx";
import { getHost } from "../utils/db.ts";

interface PricingData {
  hostId: string | null;
  subscriptionStatus: string | null;
}

export const handler: Handlers<PricingData> = {
  async GET(req, ctx) {
    const cookies = parseCookies(req.headers.get("cookie"));
    const session = cookies["host_session"];
    let hostId: string | null = null;
    let subscriptionStatus: string | null = null;

    if (session) {
      try {
        const decoded = decodeURIComponent(session);
        hostId = decoded.split("|")[0]?.trim() || null;
      } catch {
        hostId = session.trim() || null;
      }

      if (hostId) {
        const host = await getHost(hostId);
        if (host) {
          subscriptionStatus = host.subscriptionStatus;
        }
      }
    }
    return ctx.render({ hostId, subscriptionStatus });
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
    description: "₹1,000 monthly SaaS subscription for a Unified Hospitality Dashboard. AI usage credits are prepaid via wallet.",
  },
});

const FAQS = [
  {
    q: "How does the pricing work?",
    a: "istay charging a simple ₹1,000 monthly SaaS fee to keep your unified dashboard and direct booking channel live. AI token usage (Concierge chats, OCR) is billed separately through a prepaid wallet to ensure you only pay for what you use.",
  },
  {
    q: "What is the AI Wallet?",
    a: "The AI Wallet is where you top up credits (₹100, ₹500, or ₹1,000) for advanced AI tasks like autonomous WhatsApp responses and Global Guest Intelligence. We charge a fair rate based on actual tokens used.",
  },
  {
    q: "Does istay replace Airbnb or MakeMyTrip?",
    a: "No. istay connects them. We aren't here to replace the OTAs but to act as your central command center—connecting your calendars, messages, and reviews into one dashboard while giving you a low-fee direct channel for your repeat guests.",
  },
  {
    q: "What happened to the lifetime fee?",
    a: "We've moved to a monthly subscription of ₹1,000 to ensure we can provide continuous enterprise-grade support, real-time OTA syncing, and ongoing platform updates for all hosts.",
  },
  {
    q: "How are guests charged?",
    a: "Guests pay via UPI, debit/credit card, or net banking through our Easebuzz integration. You receive 95% directly to your linked bank account.",
  },
];

export default function Pricing({ data }: PageProps<PricingData>) {
  return (
    <>
      <SEOMeta 
        title="Pricing | istay — One Dashboard to Connect Them All"
        description="istay connects your Airbnb, MMT, Booking.com, and more into one powerful dashboard. ₹1,000/mo flat fee. Own your guests, keep your margins."
        schema={SCHEMA}
      />

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
              Unified Host Dashboard
            </div>
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-800 text-gray-900 tracking-tight leading-tight max-w-4xl mx-auto">
              Connect every channel.
              <br />
              <span class="text-mint-500">One interface to manage it all.</span>
            </h1>
            <p class="mt-6 text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
              We aren't here to replace the OTAs — we're here to connect them. Sync your Airbnb, MMT, Agoda, and more into one powerful command center.
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
                      ✦ Monthly Plan
                    </div>
                    <div class="mb-8">
                      <div class="flex items-baseline gap-2 mb-1">
                        <span class="text-5xl font-900 text-gray-900">
                          ₹1,000
                        </span>
                        <span class="text-gray-400 text-sm font-500 uppercase tracking-wide">
                          per month
                        </span>
                      </div>
                      <div class="flex items-baseline gap-2">
                        <span class="text-3xl font-800 text-mint-500">
                          + Usage
                        </span>
                        <span class="text-gray-400 text-sm font-500 uppercase tracking-wide">
                          AI Wallet
                        </span>
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
                        <li
                          key={item}
                          class="flex items-start gap-3 text-sm text-gray-600 font-500"
                        >
                          <span class="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-mint-50 flex items-center justify-center">
                            <CheckIcon class="w-2.5 h-2.5" />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    {data.hostId ? (
                      data.subscriptionStatus === "active" ? (
                        <a
                          href="/dashboard"
                          class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-istay-900 text-white font-800 shadow-md hover:bg-istay-800 hover:shadow-lg active:scale-95 transition-all duration-200"
                        >
                          Go to Dashboard
                          <ArrowRightIcon class="w-4 h-4" />
                        </a>
                      ) : (
                        <PricingCheckout hostId={data.hostId} />
                      )
                    ) : (
                      <a
                        href="/register"
                        class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-mint-500 text-istay-900 font-900 text-base shadow-md hover:bg-mint-400 hover:shadow-lg active:scale-95 transition-all duration-200"
                      >
                        Launch Your Channel — ₹1,000
                        <ArrowRightIcon class="w-4 h-4" />
                      </a>
                    )}
                    <div class="mt-6 text-xs text-gray-400 font-500">
                      Looking for Enterprise / Multi-user? <span class="text-mint-600 cursor-pointer hover:underline">Coming Soon.</span>
                    </div>
                  </div>

                  {/* Comparison table */}
                  <div class="rounded-2xl bg-gray-50 border border-gray-100 p-2">
                    <table class="w-full text-sm">
                      <thead>
                        <tr>
                          <th class="text-left px-4 py-4 text-xs font-700 text-gray-400 uppercase tracking-widest">
                            Platform
                          </th>
                          <th class="text-right px-4 py-4 text-xs font-700 text-gray-400 uppercase tracking-widest">
                            Fee
                          </th>
                          <th class="text-right px-4 py-4 text-xs font-700 text-gray-400 uppercase tracking-widest">
                            Take Home
                          </th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-100">
                        {[
                          {
                            name: "istay",
                            pct: "5%",
                            home: "₹95,000",
                            highlight: true,
                          },
                          { name: "Airbnb", pct: "15%", home: "₹85,000" },
                          { name: "MakeMyTrip", pct: "18%", home: "₹82,000" },
                          { name: "Agoda", pct: "18%", home: "₹82,000" },
                          { name: "Expedia", pct: "18%", home: "₹82,000" },
                          { name: "VRBO", pct: "12%", home: "₹88,000" },
                          { name: "Booking.com", pct: "≈17%", home: "₹83,000" },
                        ].map(({ name, pct, home, highlight }) => (
                          <tr
                            key={name}
                            class={`${
                              highlight ? "bg-white shadow-sm rounded-xl" : ""
                            }`}
                          >
                            <td
                              class={`px-4 py-4 font-700 ${
                                highlight ? "text-istay-900" : "text-gray-700"
                              }`}
                            >
                              {name}
                              {highlight && (
                                <span class="ml-2 text-[10px] bg-mint-500 text-istay-900 font-900 px-1.5 py-0.5 rounded-full">
                                  RECOMMENDED
                                </span>
                              )}
                            </td>
                            <td
                              class={`px-4 py-4 text-right font-600 ${
                                highlight ? "text-mint-500" : "text-rose-400"
                              }`}
                            >
                              {pct}
                            </td>
                            <td class="px-4 py-4 text-right font-800 text-gray-900">
                              {home}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p class="mt-6 text-[10px] text-gray-400 text-center uppercase tracking-widest font-700">
                    * Rates are exclusive of 18% GST as per Indian Tax Laws.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* ── SOCIAL PROOF ────────────────────────────────────── */}
        <section class="py-24 bg-istay-900 overflow-hidden relative">
          <div class="absolute inset-0 opacity-10 pointer-events-none">
            <div class="absolute top-10 left-10 w-64 h-64 bg-mint-500 rounded-full blur-[100px]" />
            <div class="absolute bottom-10 right-10 w-96 h-96 bg-teal-500 rounded-full blur-[120px]" />
          </div>
          
          <div class="max-w-7xl mx-auto px-6 lg:px-8 relative">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  quote: "Switched from Airbnb and saved ₹1.2L in commissions in the first 3 months. The direct booking experience is seamless.",
                  author: "Aditi S.",
                  role: "Superhost, Delhi"
                },
                { 
                  quote: "istay gives me full control over guest selection. No more middleman taking a cut of my hard-earned revenue.",
                  author: "Rahul M.",
                  role: "Villa Owner, Goa"
                },
                { 
                  quote: "The AI concierge handled 90% of my booking inquiries. It's like having a co-host that never sleeps.",
                  author: "Priya V.",
                  role: "Apartment Chain, Bangalore"
                }
              ].map((t) => (
                <div key={t.author} class="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl">
                  <div class="flex gap-1 mb-4 text-mint-500">
                    {[1,2,3,4,5].map(i => <StarIcon key={i} class="w-4 h-4 fill-current" />)}
                  </div>
                  <p class="text-lg text-white font-500 italic mb-6">"{t.quote}"</p>
                  <div>
                    <div class="text-white font-800 text-sm">{t.author}</div>
                    <div class="text-white/40 text-xs">{t.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ── EARNINGS CALCULATOR ──────────────────────────── */}
        <section class="py-24 bg-gray-50">
          <div class="max-w-4xl mx-auto px-4 text-center mb-12">
            <h2 class="text-3xl sm:text-4xl font-900 text-gray-900 tracking-tight">
              Calculate your freedom
            </h2>
            <p class="mt-4 text-gray-500 text-lg">
              See exactly how much more you earn compared to high-commission
              platforms.
            </p>
          </div>
          <div class="max-w-4xl mx-auto px-4">
            <LazyIsland placeholderHeight="400px">
              <EarningsCalculator />
            </LazyIsland>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────── */}
        <section class="py-24 bg-white">
          <div class="max-w-3xl mx-auto px-4">
            <h2 class="text-3xl font-900 text-gray-900 text-center mb-16 underline decoration-istay-100 decoration-8 underline-offset-8">
              Common Questions
            </h2>
            <LazyIsland placeholderHeight="300px">
              <FaqSearch faqs={FAQS} />
            </LazyIsland>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
