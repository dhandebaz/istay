import { Head } from "$fresh/runtime.ts";
import Header from "../islands/Header.tsx";
import Footer from "../components/Footer.tsx";
import ListingCarousel from "../islands/ListingCarousel.tsx";
import ScraperPreview from "../islands/ScraperPreview.tsx";

const FEATURES = [
  {
    icon: "💰",
    title: "One-Time Setup. Forever.",
    desc: "Pay ₹1,000 once. Own your booking channel forever. No monthly SaaS fees eating into your revenue.",
  },
  {
    icon: "🤖",
    title: "AI Concierge",
    desc: "Automated guest messaging, check-in instructions, and reviews — running 24/7 without lifting a finger.",
  },
  {
    icon: "📊",
    title: "Real-Time Dashboard",
    desc: "Track revenue, occupancy, and guest history across all your properties in one clean interface.",
  },
  {
    icon: "🔒",
    title: "Smart ID Verification",
    desc: "OCR-powered guest ID scanning at check-in. Legally compliant, instant, and fully secure.",
  },
  {
    icon: "📣",
    title: "Direct Booking Links",
    desc: "Share your branded booking page on WhatsApp, Instagram, or anywhere. Zero OTA dependency.",
  },
  {
    icon: "⚡",
    title: "Instant Payouts",
    desc: "Payments hit your account the moment a guest books — no 30-day holds or 15% platform cuts.",
  },
];

const PLATFORMS = [
  { name: "Airbnb", fee: "15%", color: "text-rose-500", bg: "bg-rose-50" },
  { name: "MakeMyTrip", fee: "18%", color: "text-orange-500", bg: "bg-orange-50" },
  { name: "Booking.com", fee: "15–20%", color: "text-blue-500", bg: "bg-blue-50" },
  { name: "istay", fee: "5%", color: "text-teal-600", bg: "bg-teal-50", highlight: true },
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
      description: "One-time lifetime setup fee",
    },
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

export default function Home() {
  return (
    <>
      <Head>
        <title>istay — Direct Booking Platform for Property Hosts</title>
        <meta
          name="description"
          content="Stop paying 15–18% to OTAs. istay lets you accept direct bookings with a one-time ₹1,000 setup + 5% flat fee. AI-powered guest management included."
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="istay — Own Your Booking Channel" />
        <meta
          property="og:description"
          content="Replace Airbnb commissions with a flat 5% fee. One-time ₹1,000 setup. Lifetime direct booking channel."
        />
        <meta property="og:image" content="https://istay.space/og-home.png" />
        <meta property="og:url" content="https://istay.space" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="istay — Direct Booking Platform" />
        <meta
          name="twitter:description"
          content="Stop paying 15% just to get booked. istay: flat 5% fee, one-time setup."
        />
        <meta name="twitter:image" content="https://istay.space/og-home.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: SCHEMA }}
        />
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
            {/* Badge */}
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-istay-50 border border-istay-100 text-istay-800 text-xs font-600 uppercase tracking-wider mb-6">
              <span class="w-1.5 h-1.5 rounded-full bg-mint-500 animate-pulse" />
              Now live in India
            </div>

            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-800 text-gray-900 leading-tight tracking-tight max-w-4xl mx-auto">
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
              <br />
              <span class="text-mint-500">Own your audience.</span>
            </h1>

            <p class="mt-6 text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
              istay is a direct booking platform for Airbnb and hotel hosts. Accept
              bookings through your own channel with a flat{" "}
              <span class="font-600 text-gray-700">5% fee</span> — no monthly
              subscriptions, no vendor lock-in.
            </p>

            <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/pricing"
                id="hero-cta-primary"
                class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-mint-500 text-istay-900 font-900 text-base shadow-md hover:bg-mint-400 hover:shadow-lg active:scale-95 transition-all duration-200"
              >
                Start Subscription — ₹1,000
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M2 8H14M8 2L14 8L8 14"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </a>
              <a
                href="#how-it-works"
                id="hero-cta-secondary"
                class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gray-100 text-gray-700 font-600 text-base hover:bg-gray-200 transition-all duration-200"
              >
                See how it works
              </a>
            </div>

            {/* Trust bar */}
            <div class="mt-14 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400">
              <span class="flex items-center gap-1.5">
                <span class="text-mint-500">✓</span> No monthly fees
              </span>
              <span class="flex items-center gap-1.5">
                <span class="text-mint-500">✓</span> Instant account activation
              </span>
              <span class="flex items-center gap-1.5">
                <span class="text-mint-500">✓</span> Razorpay-secured payments
              </span>
              <span class="flex items-center gap-1.5">
                <span class="text-mint-500">✓</span> GST compliant invoices
              </span>
            </div>
          </div>
        </section>

        {/* ── PLATFORM COMPARISON ───────────────────────────────── */}
        <section class="py-20 bg-gray-50" id="compare">
          <div class="max-w-5xl mx-auto px-6 lg:px-8">
            <div class="text-center mb-12">
              <h2 class="text-3xl sm:text-4xl font-800 text-gray-900 tracking-tight">
                The math is simple.
              </h2>
              <p class="mt-3 text-gray-500 text-lg">
                On ₹50,000/month revenue, here's how much you keep:
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
                  Don't waste hours copy-pasting descriptions and uploading photos. 
                  Paste your Airbnb link, and our "Magic Scraper" automatically builds 
                  your istay booking page, import reviews, and syncs your calendar.
                </p>
                <div class="mt-8 space-y-4">
                  {[
                    "Auto-syncs property descriptions",
                    "Imports high-res photo galleries",
                    "One-click calendar integration",
                  ].map((item) => (
                    <div key={item} class="flex items-center gap-3">
                      <div class="flex-shrink-0 w-6 h-6 rounded-full bg-mint-100 flex items-center justify-center text-mint-600">
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8L6 11L13 4" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                      </div>
                      <span class="text-gray-700 font-500">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Animation Mockup */}
              <div class="relative animate-slide-up">
                <div class="absolute -inset-4 bg-mint-50 rounded-3xl -rotate-2 scale-95 opacity-50 blur-xl" />
                <ScraperPreview />
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
                No tech skills needed. Just three steps to your own booking channel.
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
                    desc: "Pay the ₹1,000 setup fee. We activate your account and branded booking page instantly.",
                  },
                  {
                    step: "02",
                    title: "Share your link",
                    desc: "Send your booking page to past guests via WhatsApp, add it to your Instagram bio, anywhere.",
                  },
                  {
                    step: "03",
                    title: "Get paid directly",
                    desc: "Guests pay via UPI/Card. You receive 95% instantly. No holds, no disputes with OTAs.",
                  },
                ].map(({ step, title, desc }) => (
                  <div key={step} class="text-center">
                    <div class="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-istay-50 border-2 border-istay-100 mb-5">
                      <span class="text-2xl font-800 text-istay-900">{step}</span>
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
                Featured Properties. <span class="text-mint-500 underline decoration-mint-200">Zero Commission.</span>
              </h2>
              <p class="mt-4 text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
                Browse properties that have already switched to direct bookings. 
                Locations are verified but hidden for guest privacy until interaction.
              </p>
            </div>

            <ListingCarousel />
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
                  <div class="text-3xl mb-4">{icon}</div>
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
              Join hundreds of hosts across India who have switched to direct bookings.
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
      </main>

      <Footer />
    </>
  );
}
