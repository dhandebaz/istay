import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import Header from "../islands/Header.tsx";
import Footer from "../components/Footer.tsx";
import ScraperPreview from "../islands/ScraperPreview.tsx";
import LazyIsland from "../islands/LazyIsland.tsx";
import SEOMeta from "../components/SEOMeta.tsx";
import { CheckIcon } from "../components/Icons.tsx";
import { getGlobalStats } from "../utils/db.ts";

const SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "iStay",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "The unified hospitality dashboard for independent hosts. Connect Airbnb, Booking.com, and MMT while accepting direct bookings with a flat 5% fee.",
  offers: {
    "@type": "Offer",
    price: "1000",
    priceCurrency: "INR",
  },
});

export const handler: Handlers = {
  async GET(_req, ctx) {
    try {
      const stats = await getGlobalStats();
      return ctx.render({ stats });
    } catch {
      return ctx.render({ stats: null });
    }
  },
};

export default function Home({ data }: PageProps) {
  const { stats } = data || {};
  const bookingsToday = stats?.bookingsToday || 14;

  return (
    <>
      <SEOMeta schema={SCHEMA} canonical="https://istay.space" />
      <Head>
        <style dangerouslySetInnerHTML={{ __html: `
          .premium-gradient { 
            background: radial-gradient(circle at top right, rgba(16, 185, 129, 0.08) 0%, transparent 40%), 
                        radial-gradient(circle at bottom left, rgba(20, 184, 166, 0.05) 0%, transparent 40%), 
                        #ffffff; 
          }
        ` }} />
      </Head>

      <Header />

      <main class="bg-white">
        {/* ── HERO ────────────────────────────────────────── */}
        <section class="premium-gradient min-h-screen flex items-center justify-center relative overflow-hidden px-5 py-20 pt-32">
          <div class="relative z-10 max-w-7xl mx-auto text-center">
            <div class="inline-flex items-center gap-3 px-5 py-2 bg-emerald-50 rounded-full border border-emerald-100 shadow-sm mb-12 animate-fade-in">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p class="text-[11px] font-bold text-emerald-700 uppercase tracking-widest">{bookingsToday} bookings managed today</p>
            </div>
            
            <h1 class="text-6xl sm:text-8xl lg:text-[9rem] font-bold text-gray-900 tracking-tight leading-[1] mb-12 animate-slide-up">
              Direct Bookings.<br />
              <span class="text-emerald-500 font-serif italic">Higher Margins.</span>
            </h1>

            <p class="text-lg sm:text-xl text-gray-500 max-w-3xl mx-auto font-medium mb-16 leading-relaxed animate-slide-up delay-100">
              Stop paying 20% commission to OTAs. Connect Airbnb, Booking.com & MMT into one premium dashboard and accept direct bookings for a flat <span class="text-gray-900 font-bold border-b-2 border-emerald-400">5% fee.</span>
            </p>

            <div class="flex flex-col sm:flex-row items-center justify-center gap-6 animate-slide-up delay-200">
              <a href="/register" class="w-full sm:w-auto px-10 py-5 bg-gray-900 text-white font-bold text-base rounded-2xl shadow-premium hover:shadow-premium-hover hover:-translate-y-1 transition-all">
                Get Started
              </a>
              <a href="#how-it-works" class="w-full sm:w-auto px-10 py-5 bg-white text-gray-700 font-bold text-base rounded-2xl border border-gray-100 shadow-premium hover:shadow-premium-hover hover:-translate-y-1 transition-all">
                How it Works
              </a>
            </div>
          </div>

          {/* Decorative Elements */}
          <div class="absolute -top-48 -right-48 w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-50" />
          <div class="absolute -bottom-48 -left-48 w-96 h-96 bg-teal-50 rounded-full blur-3xl opacity-50" />
        </section>

        {/* ── STATS TICKER ────────────────────────────────── */}
        <section class="bg-gray-50 py-24 border-y border-gray-100">
          <div class="max-w-7xl mx-auto px-5">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-12">
              {[
                { val: "₹1,000", label: "Monthly Base" },
                { val: "5%", label: "Direct Commission" },
                { val: "0%", label: "Hidden Fees" },
                { val: "95%", label: "You Keep" },
              ].map(({ val, label }) => (
                <div key={label} class="text-center animate-fade-in">
                  <div class="text-5xl font-bold text-gray-900 tracking-tight mb-2">{val}</div>
                  <div class="text-[11px] font-bold text-emerald-600 uppercase tracking-widest">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LOGIC GRID ──────────────────────────────────── */}
        <section class="py-32 sm:py-48 bg-white px-5" id="compare">
          <div class="max-w-7xl mx-auto">
            <div class="mb-24 text-center lg:text-left">
              <span class="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 text-[11px] font-bold uppercase tracking-widest mb-8 rounded-full border border-emerald-100">The Math</span>
              <h2 class="text-5xl sm:text-7xl font-bold text-gray-900 tracking-tight leading-[1.1]">
                Stop leaking margins.<br />
                <span class="text-gray-300">Start scaling profit.</span>
              </h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Airbnb", fee: "15-20%", loss: "₹10,000", icon: "🏠", color: "text-rose-500" },
                { name: "Booking.com", fee: "15-25%", loss: "₹12,500", icon: "🏨", color: "text-blue-500" },
                { name: "iStay", fee: "5%", loss: "₹2,500", icon: "✨", color: "text-emerald-500", highlight: true },
              ].map((p) => (
                <div key={p.name} class={`p-10 rounded-[2.5rem] border transition-all duration-500 ${p.highlight ? 'bg-gray-900 text-white border-gray-900 shadow-premium-lg -translate-y-4' : 'bg-white text-gray-900 border-gray-100 shadow-premium'}`}>
                   <span class="text-4xl mb-8 block">{p.icon}</span>
                   <p class="text-[11px] font-bold uppercase tracking-widest mb-4 opacity-50">{p.name}</p>
                   <p class={`text-5xl font-bold tracking-tight mb-10 ${p.color}`}>{p.fee}</p>
                   <div class="pt-8 border-t border-gray-100/10 flex items-center justify-between">
                     <p class="text-[10px] font-bold uppercase tracking-widest opacity-50">Margin Leak</p>
                     <p class="text-2xl font-bold">{p.loss}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SCRAPER INTERFACE ───────────────────────────── */}
        <section class="py-32 sm:py-48 bg-emerald-50/30 px-5 relative overflow-hidden">
          <div class="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20 relative z-10">
            <div class="flex-1">
              <span class="inline-block px-4 py-1.5 bg-white text-emerald-700 text-[11px] font-bold uppercase tracking-widest mb-8 rounded-full border border-emerald-100">Smart Import</span>
              <h2 class="text-5xl sm:text-7xl font-bold text-gray-900 tracking-tight leading-[1.1] mb-10">
                Import in<br />
                <span class="text-emerald-600 font-serif italic">Seconds.</span>
              </h2>
              <p class="text-lg font-medium text-gray-500 leading-relaxed mb-12">
                Paste any Airbnb link. Our smart importer extracts descriptions, amenities, and policies in under 10 seconds. Zero manual entry required.
              </p>
              <div class="space-y-4">
                {["Automated asset harvest", "Smart policy parsing", "High-res photo sync"].map(f => (
                  <div key={f} class="flex items-center gap-4 text-sm font-bold text-gray-900">
                    <div class="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                      <CheckIcon class="w-3.5 h-3.5" />
                    </div>
                    {f}
                  </div>
                ))}
              </div>
            </div>
            <div class="flex-1 w-full p-6 bg-white border border-gray-100 rounded-[2.5rem] shadow-premium-lg">
               <LazyIsland placeholderHeight="400px">
                 <ScraperPreview />
               </LazyIsland>
            </div>
          </div>
        </section>

        {/* ── BENTO FEATURES ──────────────────────────────── */}
        <section class="py-32 sm:py-48 bg-white px-5" id="features">
          <div class="max-w-7xl mx-auto">
             <div class="mb-24 text-center">
                <h2 class="text-5xl sm:text-7xl font-bold text-gray-900 tracking-tight leading-[1.1]">
                  Everything you need<br />
                  <span class="text-emerald-500 font-serif italic">to scale.</span>
                </h2>
             </div>

             <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {[
                 { t: "AI Concierge", d: "Automated guest interactions and instant property knowledge.", e: "🤖" },
                 { t: "ID Verification", d: "Secure guest verification pipeline with OCR technology.", e: "🛡️" },
                 { t: "Direct Bookings", d: "Beautiful, branded booking engine with zero dependencies.", e: "🔗" },
                 { t: "Instant Payouts", d: "Revenue hits your account instantly via secure gateways.", e: "⚡" },
                 { t: "Guest Insights", d: "Persistent preference recognition for returning guests.", e: "📊" },
                 { t: "Team Dashboard", d: "Coordinate staff and manage incidents via WhatsApp.", e: "👥" },
               ].map(f => (
                 <div key={f.t} class="p-10 bg-white border border-gray-100 rounded-[2rem] shadow-premium hover:shadow-premium-hover hover:-translate-y-1 transition-all group">
                   <div class="text-4xl mb-6 transition-transform group-hover:scale-110">{f.e}</div>
                   <h3 class="text-lg font-bold text-gray-900 mb-3">{f.t}</h3>
                   <p class="text-sm font-medium text-gray-400 leading-relaxed">{f.d}</p>
                 </div>
               ))}
             </div>
          </div>
        </section>

        {/* ── FINAL CALL TO ACTION ────────────────────────── */}
        <section class="py-40 sm:py-60 bg-gray-900 relative overflow-hidden px-5">
           <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1)_0%,transparent_70%)]" />
           <div class="relative z-10 max-w-5xl mx-auto text-center">
             <h2 class="text-5xl sm:text-8xl font-bold text-white tracking-tight leading-[1.1] mb-12">
               Your guests love you.<br />
               <span class="text-emerald-400 font-serif italic">Stop overpaying for it.</span>
             </h2>
             <p class="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto font-medium mb-16">
               Join the elite hosts keeping 95% of their revenue. The era of OTA dominance is over.
             </p>
             <a href="/register" class="inline-flex px-12 py-6 bg-emerald-500 text-white font-bold text-lg rounded-2xl shadow-premium shadow-emerald-500/20 hover:bg-emerald-400 hover:-translate-y-1 transition-all">
               Join iStay Today
             </a>
           </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
