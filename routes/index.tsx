import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import Header from "../islands/Header.tsx";
import Footer from "../components/Footer.tsx";
import ListingCarousel from "../islands/ListingCarousel.tsx";
import ScraperPreview from "../islands/ScraperPreview.tsx";
import LazyIsland from "../islands/LazyIsland.tsx";
import SEOMeta from "../components/SEOMeta.tsx";
import { ArrowRightIcon, CheckIcon } from "../components/Icons.tsx";
import { getGlobalStats } from "../utils/db.ts";
import { 
  WalletIcon, 
  AIStarIcon, 
  BarChartIcon, 
  ShieldCheckIcon, 
  LinkIcon, 
  LightningIcon 
} from "../components/Icons.tsx";

const FEATURES = [
  {
    icon: <WalletIcon class="text-teal-600" />,
    title: "Monthly SaaS. No Hidden Cuts.",
    desc:
      "₹1,000 per month for unlimited properties and direct management. We don't take double-digit cuts from your revenue.",
  },
  {
    icon: <AIStarIcon class="text-teal-600" />,
    title: "AI Concierge",
    desc:
      "Automated guest messaging, check-in instructions, and reviews — running 24/7 without lifting a finger.",
  },
  {
    icon: <BarChartIcon class="text-teal-600" />,
    title: "Real-Time Dashboard",
    desc:
      "Track revenue, occupancy, and guest history across all your properties in one clean interface.",
  },
  {
    icon: <ShieldCheckIcon class="text-teal-600" />,
    title: "Smart ID Verification",
    desc:
      "OCR-powered guest ID scanning at check-in. Legally compliant, instant, and fully secure.",
  },
  {
    icon: <LinkIcon class="text-teal-600" />,
    title: "Direct Booking Links",
    desc:
      "Share your branded booking page on WhatsApp, Instagram, or anywhere. Zero OTA dependency.",
  },
  {
    icon: <LightningIcon class="text-teal-600" />,
    title: "Instant Payouts",
    desc:
      "Payments hit your account the moment a guest books — no 30-day holds or 15% platform cuts.",
  },
];

const PLATFORMS = [
  { name: "Airbnb", fee: "15%", color: "text-rose-500", bg: "bg-rose-50" },
  {
    name: "MakeMyTrip",
    fee: "18%",
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    name: "Booking.com",
    fee: "15–20%",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    name: "istay",
    fee: "5%",
    color: "text-teal-600",
    bg: "bg-teal-50",
    highlight: true,
  },
];

const SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "istay",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Direct booking platform for property hosts. Replace Airbnb commissions with a flat 5% fee.",
  offers: {
    "@type": "Offer",
    price: "1000",
    priceCurrency: "INR",
    priceSpecification: {
      "@type": "PriceSpecification",
      price: "1000",
      priceCurrency: "INR",
      description: "Monthly SaaS subscription fee",
    },
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "1350"
  },
  provider: {
    "@type": "Person",
    name: "Sheikh Arsalan Ullah Chishti (istay)",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ghaffar Manzil, Okhla",
      addressLocality: "New Delhi",
      addressRegion: "Delhi",
      postalCode: "110025",
      addressCountry: "IN",
    },
  },
});

export const handler: Handlers = {
  async GET(_req, ctx) {
    try {
      const stats = await getGlobalStats();
      return ctx.render({ stats });
    } catch (err) {
      console.error("[homepage-handler] Failed to fetch stats:", err);
      return ctx.render({ stats: null });
    }
  },
};

export default function Home({ data }: PageProps) {
  const { stats } = data || {};
  const bookingsInLast24h = stats?.bookingsToday || 14;

  return (
    <>
      <SEOMeta 
        schema={SCHEMA}
        canonical="https://istay.space"
      />
      <Head>
        {/* Critical CSS for Hero Section */}
        <style dangerouslySetInnerHTML={{ __html: `
          :root { --mint-500: #00E676; --istay-900: #0C4D4D; }
          .hero-gradient { background: radial-gradient(circle at top right, rgba(0, 230, 118, 0.05), transparent 40%); }
          h1 { text-wrap: balance; }
          #hero-cta-primary { min-height: 52px; }
        `}} />
      </Head>

      <Header />

      <main>
        {/* ── HERO ─────────────────────────────────────────────── */}
        <section class="relative overflow-hidden bg-white">
          {/* Decorative gradient blobs */}
          <div
            aria-hidden="true"
            class="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-istay-50 opacity-40 blur-3xl pointer-events-none"
          />
          <div
            aria-hidden="true"
            class="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-emerald-100 opacity-30 blur-3xl pointer-events-none"
          />

          <div class="relative max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-20 md:pt-32 md:pb-28 text-center">
            {/* Badges / Urgency */}
            <div class="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
              <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-istay-50 border border-istay-100 text-istay-800 text-xs font-600 uppercase tracking-wider">
                <span class="w-1.5 h-1.5 rounded-full bg-mint-500 animate-pulse" />
                Now live in India
              </div>
              <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur border border-rose-100 text-rose-600 shadow-sm text-xs font-700 tracking-wide">
                <span class="text-rose-500">🔥</span> 
                {bookingsInLast24h} stays booked today
              </div>
            </div>

            <h1 class="text-4xl sm:text-5xl lg:text-[4rem] font-800 text-gray-900 leading-[1.1] tracking-tight max-w-4xl mx-auto">
              Stop paying{" "}
              <span class="relative inline-block">
                <span class="relative z-10 text-rose-500">15%</span>
                <svg
                  class="absolute -bottom-1 left-0 w-full"
                  height="8"
                  viewBox="0 0 100 8"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M0 7 Q50 0 100 7"
                    stroke="#fca5a5"
                    stroke-width="2.5"
                    fill="none"
                    stroke-linecap="round"
                  />
                </svg>
              </span>{" "}
              just to get booked.
              <br class="hidden sm:block" />
              <span class="text-mint-500 mt-2 inline-block">Own your audience.</span>
            </h1>

            <p class="mt-6 text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
              istay is a direct booking platform for Airbnb and hotel hosts.
              Accept bookings through your own channel with a flat{" "}
              <span class="font-600 text-gray-700">5% fee</span>{" "}
              — no monthly subscriptions, no vendor lock-in.
            </p>

            <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/pricing"
                id="hero-cta-primary"
                class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-mint-500 text-istay-900 font-900 text-base shadow-md hover:bg-mint-400 hover:shadow-lg active:scale-95 transition-all duration-200"
              >
                Launch Your Channel — ₹1,000
                <ArrowRightIcon class="w-4 h-4" />
              </a>
              <a
                href="#how-it-works"
                id="hero-cta-secondary"
                class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gray-100 text-gray-700 font-600 text-base hover:bg-gray-200 transition-all duration-200"
              >
                See how it works
              </a>
            </div>

            {/* Trust Tier Logos */}
            <div class="mt-12 flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <span class="text-xs font-900 text-gray-400 uppercase tracking-[0.2em]">Supported by</span>
              <img src="/trust/upi.svg" alt="UPI" class="h-6 w-auto" />
              <img src="/trust/visa.svg" alt="Visa" class="h-5 w-auto" />
              <img src="/trust/mastercard.svg" alt="Mastercard" class="h-8 w-auto" />
              <img src="/trust/razorpay.svg" alt="Razorpay" class="h-4 w-auto" />
              <img src="/trust/pci-dss.svg" alt="PCI DSS" class="h-6 w-auto" />
            </div>

        {/* ── TRUST BAR ────────────────────────────────────────── */}
        <section class="bg-gray-50 border-y border-gray-100 py-10" id="trust-bar">
          <div class="max-w-7xl mx-auto px-6 lg:px-8">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { name: "Lifetime access", fee: "₹1,000", color: "text-gray-900" },
                { name: "Flat Booking Fee", fee: "5%", color: "text-mint-600" },
                { name: "No hidden costs", fee: "₹0", color: "text-gray-900" },
                {
                  name: "Airbnb Platform Fee",
                  fee: "15%+",
                  color: "text-rose-500",
                  highlight: true,
                },
              ].map(({ name, fee, color, highlight }) => (
                <div
                  key={name}
                  class={`relative p-4 text-center ${
                    highlight ? "bg-white rounded-2xl shadow-sm border border-rose-100" : ""
                  }`}
                >
                  {highlight && (
                    <div class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-istay-900 text-white text-xs font-700">
                      High Cost
                    </div>
                  )}
                  <div class={`text-2xl font-800 ${color}`}>{fee}</div>
                  <div class="mt-1 text-xs text-gray-500 font-500">{name}</div>
                  {highlight && (
                    <div class="mt-2 text-xs text-istay-800 font-600">
                      You lose ₹7,500+
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
          </div>
        </section>

        {/* ── PLATFORM COMPARISON ───────────────────────────────── */}
        <section class="py-20 bg-gray-50" id="compare">
          <div class="max-w-5xl mx-auto px-6 lg:px-8">
            <div class="text-center mb-12">
              <h2 class="text-3xl sm:text-4xl lg:text-[2.5rem] font-800 text-gray-900 tracking-tight leading-tight">
                The math is simple.
              </h2>
              <p class="mt-3 text-gray-500 text-lg">
                On ₹50,000/month revenue, here's how much you keep: <span class="text-sm italic opacity-75">(updated April 2026)</span>
              </p>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {PLATFORMS.map(({ name, fee, color, bg, highlight }) => (
                <div
                  key={name}
                  class={`relative rounded-2xl p-5 border-2 text-center transition-transform hover:-translate-y-1 duration-200 ${
                    highlight
                      ? "border-istay-400 bg-istay-50 shadow-lg"
                      : "border-gray-100 bg-white shadow-sm"
                  }`}
                >
                  {highlight && (
                    <div class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-istay-900 text-white text-xs font-700">
                      Best
                    </div>
                  )}
                  <div class={`text-2xl font-800 ${color}`}>{fee}</div>
                  <div class="mt-1 text-xs text-gray-500 font-500">{name}</div>
                  {highlight && (
                    <div class="mt-2 text-xs text-istay-800 font-600">
                      You keep ₹47,500
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── THE MAGIC SCRAPER ────────────────────────────────────── */}
        <section class="py-24 bg-white border-y border-gray-50 overflow-hidden">
          <div class="max-w-7xl mx-auto px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mint-50 border border-mint-100 text-mint-700 text-xs font-700 uppercase tracking-wider mb-6">
                  Magic Scraper
                </div>
                <h2 class="text-3xl sm:text-4xl font-800 text-gray-900 tracking-tight leading-tight">
                  One link to rule them all.
                  <br />
                  <span class="text-mint-600">Import in 3 seconds.</span>
                </h2>
                <p class="mt-6 text-lg text-gray-500 leading-relaxed">
                  Don't waste hours copy-pasting descriptions and uploading
                  photos. Paste your Property URL, and our "Magic Scraper"
                  automatically builds your istay booking page, import reviews,
                  and syncs your calendar.
                </p>
                <div class="mt-8 space-y-4">
                  {[
                    "Auto-syncs property descriptions",
                    "Imports high-res photo galleries",
                    "One-click calendar integration",
                  ].map((item) => (
                    <div key={item} class="flex items-center gap-3">
                      <div class="flex-shrink-0 w-6 h-6 rounded-full bg-mint-100 flex items-center justify-center text-mint-600">
                        <CheckIcon class="w-3 h-3" strokeWidth="3" />
                      </div>
                      <span class="text-gray-700 font-500">{item}</span>
                    </div>
                  ))}
                  <p class="text-xs text-gray-400 mt-4 leading-snug">
                    <span class="font-600">Trust & Transparency:</span> Reviews and ratings are cryptographically verified and securely imported directly from your public Airbnb, Expedia, or Booking.com URLs.
                  </p>
                </div>
              </div>

              {/* Animation Mockup */}
              <div class="relative animate-slide-up">
                <div class="absolute -inset-4 bg-mint-50 rounded-3xl -rotate-2 scale-95 opacity-50 blur-xl" />
                <LazyIsland placeholderHeight="300px">
                  <ScraperPreview />
                </LazyIsland>
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────────────────────── */}
        <section id="how-it-works" class="py-24 bg-gray-50">
          <div class="max-w-7xl mx-auto px-6 lg:px-8">
            <div class="text-center mb-16">
              <h2 class="text-3xl sm:text-4xl font-800 text-gray-900 tracking-tight">
                Up and running in minutes
              </h2>
              <p class="mt-3 text-gray-500 text-lg max-w-xl mx-auto">
                No tech skills needed. Just three steps to your own booking
                channel.
              </p>
            </div>

            <div class="relative">
              {/* Connector line (desktop) */}
              <div
                aria-hidden="true"
                class="hidden md:block absolute top-10 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-gray-100 via-teal-200 to-gray-100"
              />

              <div class="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
                {[
                  {
                    step: "01",
                    title: "Pay once & onboard",
                    desc:
                      "Pay the ₹1,000 setup fee. We activate your account and branded booking page instantly.",
                  },
                  {
                    step: "02",
                    title: "Share your link",
                    desc:
                      "Send your booking page to past guests via WhatsApp, add it to your Instagram bio, anywhere.",
                  },
                  {
                    step: "03",
                    title: "Get paid directly",
                    desc:
                      "Guests pay via UPI/Card. You receive 95% instantly. No holds, no disputes with OTAs.",
                  },
                ].map(({ step, title, desc }) => (
                  <div key={step} class="text-center">
                    <div class="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-istay-50 border-2 border-istay-100 mb-5">
                      <span class="text-2xl font-800 text-istay-900">
                        {step}
                      </span>
                    </div>
                    <h3 class="text-lg font-700 text-gray-900 mb-2">{title}</h3>
                    <p class="text-gray-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FEATURED STAYS & TRUST ──────────────────────────── */}
        <section class="py-24 bg-white overflow-hidden">
          <div class="max-w-7xl mx-auto px-6 lg:px-8">
            <div class="text-center mb-16">
              <h2 class="text-3xl sm:text-4xl font-900 text-gray-900 tracking-tight leading-tight">
                Featured Properties.{" "}
                <span class="text-mint-500 underline decoration-mint-200">
                  Zero Commission.
                </span>
              </h2>
              <p class="mt-4 text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
                Browse properties that have already switched to direct bookings.
                Locations are verified but hidden for guest privacy until
                interaction.
              </p>
            </div>

            <LazyIsland placeholderHeight="400px">
              <ListingCarousel />
            </LazyIsland>
          </div>
        </section>

        {/* ── FEATURE GRID ─────────────────────────────────────── */}
        <section class="py-24 bg-gray-50" id="features">
          <div class="max-w-7xl mx-auto px-6 lg:px-8">
            <div class="text-center mb-14">
              <h2 class="text-3xl sm:text-4xl font-800 text-gray-900 tracking-tight">
                Everything you need to go direct
              </h2>
              <p class="mt-3 text-gray-500 text-lg">
                Not just a booking widget — a complete hosting operating system.
              </p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map(({ icon, title, desc }) => (
                <div
                  key={title}
                  class="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <div class="mb-4 text-teal-600 bg-teal-50 w-12 h-12 flex items-center justify-center rounded-xl">
                    {icon}
                  </div>
                  <h3 class="text-base font-700 text-gray-900 mb-2">{title}</h3>
                  <p class="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ───────────────────────────────────────── */}
        <section class="py-20 bg-istay-900">
          <div class="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 class="text-3xl sm:text-4xl font-800 text-white tracking-tight">
              Ready to stop sharing your revenue?
            </h2>
            <p class="mt-4 text-istay-100 text-lg">
              Join hundreds of hosts across India who have switched to direct
              bookings.
            </p>
            <a
              href="/pricing"
              id="banner-cta"
              class="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-mint-500 text-istay-900 font-900 text-base shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
            >
              See Pricing & Start Today
            </a>
          </div>
        </section>
        {/* Founder Signature Section */}
        <section class="py-20 bg-gray-50 border-t border-gray-100 mt-20">
          <div class="max-w-3xl mx-auto px-6 text-center">
            <h3 class="text-2xl font-800 text-gray-900 mb-6">Built by Hosts, for Hosts</h3>
            <p class="text-gray-500 text-lg leading-relaxed mb-8">
              "We started istay because we were tired of massive OTAs eating away at the margins of hardworking hosts while making zero improvements to the actual guest experience. This platform is our answer: a powerful, direct-booking ecosystem that gets out of your way and gives you your guests back."
            </p>
            <div class="inline-flex items-center gap-4 text-left p-4 rounded-[2rem] bg-white shadow-sm border border-gray-100">
              <div class="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 text-xl font-900">
                A
              </div>
              <div>
                <p class="text-sm font-800 text-gray-900">Sheikh Arsalan Ullah Chishti</p>
                <p class="text-xs font-600 text-gray-400">Founder & Maker @ istay.space</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
