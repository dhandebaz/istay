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

const SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "istay",
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
          .hero-gradient { background: radial-gradient(circle at top right, #4ade80 0%, transparent 40%), radial-gradient(circle at bottom left, #4ade80 0%, transparent 40%), #000; }
          .neo-shadow { shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]; }
        ` }} />
      </Head>

      <Header />

      <main class="bg-white pt-24">
        {/* ── HERO ────────────────────────────────────────── */}
        <section class="hero-gradient min-h-[90vh] flex items-center justify-center relative overflow-hidden px-5 py-20">
          <div class="relative z-10 max-w-7xl mx-auto text-center">
            <div class="inline-flex items-center gap-3 px-6 py-2 bg-white border-[3px] border-gray-900 rounded-full shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-12 animate-bounce">
              <span class="w-3 h-3 rounded-full bg-mint-500 animate-ping" />
              <p class="text-[10px] font-950 text-gray-900 uppercase tracking-widest">{bookingsToday}_PROXIES_ENGAGED_TODAY</p>
            </div>
            
            <h1 class="text-6xl sm:text-8xl lg:text-[10rem] font-950 text-white tracking-tighter leading-[0.85] uppercase mb-12">
              HOST_DIRECT.<br />
              <span class="text-mint-400">MARGIN_PROFIT.</span>
            </h1>

            <p class="text-lg sm:text-2xl text-gray-400 max-w-3xl mx-auto font-700 uppercase tracking-tight mb-16 leading-relaxed">
              DITCH THE 20% COMMISSION TRAP. CONNECT AIRBNB, BOOKING.COM & MMT INTO ONE ELITE DASHBOARD. ACCEPT DIRECT BOOKINGS FOR A FLAT <span class="text-white border-b-[4px] border-mint-400">5%_FEE.</span>
            </p>

            <div class="flex flex-col sm:flex-row items-center justify-center gap-8">
              <a href="/register" class="w-full sm:w-auto px-12 py-6 bg-mint-400 text-gray-900 font-950 text-base uppercase tracking-[0.2em] rounded-2xl border-[4px] border-white shadow-[10px_10px_0px_0px_rgba(74,222,128,0.3)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all">
                INITIALIZE_ONBOARDING
              </a>
              <a href="#how-it-works" class="w-full sm:w-auto px-12 py-6 bg-transparent text-white font-950 text-base uppercase tracking-[0.2em] rounded-2xl border-[4px] border-white/20 hover:border-white/50 transition-all">
                PROTOCOL_OVERVIEW
              </a>
            </div>
          </div>
        </section>

        {/* ── STATS TICKER ────────────────────────────────── */}
        <section class="bg-gray-900 border-y-[6px] border-gray-900 py-16 overflow-hidden">
          <div class="max-w-7xl mx-auto px-5">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-12 sm:gap-20">
              {[
                { val: "₹1,000", label: "FLAT_KERNEL_FEE" },
                { val: "5%", label: "PROTOCOL_OVERHEAD" },
                { val: "0%", label: "HIDDEN_TAX" },
                { val: "95%", label: "HOST_RETENTION" },
              ].map(({ val, label }) => (
                <div key={label} class="text-center">
                  <div class="text-5xl sm:text-7xl font-950 text-white tracking-tighter mb-4">{val}</div>
                  <div class="text-[10px] font-950 text-mint-400 uppercase tracking-[0.3em]">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LOGIC GRID ──────────────────────────────────── */}
        <section class="py-32 sm:py-48 bg-white px-5" id="compare">
          <div class="max-w-7xl mx-auto">
            <div class="mb-24 text-center sm:text-left">
              <span class="inline-block px-5 py-2 bg-gray-900 text-mint-400 text-[10px] font-950 uppercase tracking-[0.3em] mb-8 rounded-xl">SYSTEM_LOGIC_V2</span>
              <h2 class="text-6xl sm:text-8xl font-950 text-gray-900 tracking-tighter leading-[0.9] uppercase">
                THE_COLD_MATH.<br />
                <span class="text-gray-300">NO_GHOSTS.</span>
              </h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { name: "Airbnb", fee: "15-20%", loss: "₹10,000", icon: "🏠", color: "text-rose-600" },
                { name: "Booking.com", fee: "15-25%", loss: "₹12,500", icon: "🏨", color: "text-blue-600" },
                { name: "istay", fee: "5%", loss: "₹2,500", icon: "⚡", color: "text-mint-500", highlight: true },
              ].map((p) => (
                <div key={p.name} class={`p-12 rounded-[3rem] border-[4px] border-gray-900 transition-all ${p.highlight ? 'bg-gray-900 text-white shadow-[16px_16px_0px_0px_#4ade80]' : 'bg-white text-gray-900 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]'}`}>
                   <span class="text-4xl mb-8 block">{p.icon}</span>
                   <p class="text-[10px] font-950 uppercase tracking-[0.3em] mb-4 opacity-50">{p.name}</p>
                   <p class={`text-6xl font-950 tracking-tighter mb-10 ${p.color}`}>{p.fee}</p>
                   <div class="pt-8 border-t-[3px] border-gray-100/10 flex items-center justify-between">
                     <p class="text-[10px] font-950 uppercase">MARGIN_LEAK</p>
                     <p class="text-2xl font-950">{p.loss}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SCRAPER INTERFACE ───────────────────────────── */}
        <section class="py-32 sm:py-48 bg-gray-50 px-5 relative overflow-hidden">
          <div class="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24 relative z-10">
            <div class="flex-1">
              <span class="inline-block px-5 py-2 bg-mint-500 text-gray-900 text-[10px] font-950 uppercase tracking-[0.3em] mb-8 rounded-xl">KERNEL_SYNC</span>
              <h2 class="text-6xl sm:text-8xl font-950 text-gray-900 tracking-tighter leading-[0.9] uppercase mb-10">
                IMPORT_LIFE.<br />
                <span class="text-mint-500">ZERO_ENTRY.</span>
              </h2>
              <p class="text-lg sm:text-xl font-800 text-gray-500 uppercase leading-snug mb-12">
                PASTE ANY AIRBNB LINK. OUR AI KERNEL EXTRACTS ASSETS, AMENITIES & POLICIES IN &lt;10S. NO MANUAL OVERHEAD.
              </p>
              <div class="space-y-4">
                {["AI_ASSET_HARVEST", "POL_AUTO_PARSE", "HIGH_RES_SYNC"].map(f => (
                  <div key={f} class="flex items-center gap-4 text-[11px] font-950 text-gray-900 uppercase tracking-widest">
                    <div class="w-6 h-6 rounded-lg bg-mint-400 border-[2px] border-gray-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                      <CheckIcon class="w-3 h-3" />
                    </div>
                    {f}
                  </div>
                ))}
              </div>
            </div>
            <div class="flex-1 w-full p-8 bg-white border-[4px] border-gray-900 rounded-[3rem] shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]">
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
                <h2 class="text-6xl sm:text-8xl font-950 text-gray-900 tracking-tighter leading-[0.9] uppercase">
                  NOT_A_WIDGET.<br />
                  <span class="text-mint-500">A_HOSTING_OS.</span>
                </h2>
             </div>

             <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
               {[
                 { t: "AI_CONCIERGE", d: "24/7 AUTOMATED GUEST INTERFACE & PROTOCOLS.", e: "🤖" },
                 { t: "SMART_ID_SCAN", d: "OCR-POWERED GUEST VERIFICATION PIPELINE.", e: "🛡️" },
                 { t: "DIRECT_CORE", d: "BRANDED BOOKING ENGINE. ZERO OTA DEPENDENCY.", e: "🔗" },
                 { t: "INSTANT_SETTLE", d: "REVENUE HITS YOUR ACCOUNT AT SIGNAL.", e: "⚡" },
                 { t: "GLOBAL_GUESTS", d: "PERSISTENT PREFERENCE RECOGNITION.", e: "📊" },
                 { t: "TEAM_KERNEL", d: "MULTI-PARTY INCIDENT DISPATCH VIA WHATSAPP.", e: "👥" },
               ].map(f => (
                 <div key={f.t} class="p-10 bg-white border-[3px] border-gray-900 rounded-[2.5rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all group">
                   <div class="text-4xl mb-6 group-hover:scale-110 transition-transform">{f.e}</div>
                   <h3 class="text-sm font-950 text-gray-900 uppercase tracking-widest mb-4">{f.t}</h3>
                   <p class="text-[11px] font-800 text-gray-400 uppercase leading-relaxed">{f.d}</p>
                 </div>
               ))}
             </div>
          </div>
        </section>

        {/* ── FINAL PROTOCOL ──────────────────────────────── */}
        <section class="py-40 sm:py-60 bg-gray-900 relative overflow-hidden px-5">
           <div class="relative z-10 max-w-5xl mx-auto text-center">
             <h2 class="text-6xl sm:text-9xl font-950 text-white tracking-tighter leading-[0.85] uppercase mb-12">
               YOUR_GUESTS_LOVE_YOU.<br />
               <span class="text-mint-400">STOP_PAYING_FOR_IT.</span>
             </h2>
             <p class="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto font-800 uppercase tracking-tight mb-16">
               JOIN THE ELITE HOSTS KEEPING 95% OF THEIR REVENUE. THE ERA OF OTA DOMINANCE IS OVER.
             </p>
             <a href="/register" class="inline-flex px-16 py-8 bg-mint-400 text-gray-900 font-950 text-lg uppercase tracking-[0.3em] rounded-2xl border-[4px] border-white shadow-[12px_12px_0px_0px_rgba(74,222,128,0.4)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all">
               ACTIVATE_DASHBOARD_NOW
             </a>
           </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
