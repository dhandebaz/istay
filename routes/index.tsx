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
  description: "The unified hospitality dashboard for professional hosts. Synchronize Airbnb, Booking.com, and MMT while accepting direct residency with professional yield management.",
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
          .premium-hero-gradient { 
            background: radial-gradient(circle at 70% 30%, rgba(16, 185, 129, 0.15) 0%, transparent 40%), 
                        radial-gradient(circle at 20% 70%, rgba(20, 184, 166, 0.1) 0%, transparent 40%), 
                        #ffffff; 
          }
          .glass-card {
            background: rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(25px) saturate(180%);
            border: 1px solid rgba(255, 255, 255, 0.4);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.03);
          }
          .text-gradient-emerald {
            background: linear-gradient(135deg, #065f46 0%, #10b981 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        ` }} />
      </Head>

      <Header />

      <main class="bg-white selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">
        {/* ── HERO ────────────────────────────────────────── */}
        <section class="premium-hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden px-8 py-32 pt-56">
          <div class="relative z-10 max-w-7xl mx-auto text-center">
            <div class="inline-flex items-center gap-4 px-8 py-3 glass-card rounded-[2rem] border border-emerald-50/50 mb-20 animate-fade-in transition-all hover:scale-105 cursor-default">
              <span class="relative flex h-3 w-3">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
              </span>
              <p class="text-[11px] font-bold text-emerald-900 uppercase tracking-[0.4em]">{bookingsToday} Synchronization Events Today</p>
            </div>
            
            <h1 class="text-7xl sm:text-9xl lg:text-[12rem] font-bold text-gray-900 tracking-tighter leading-[0.85] mb-20 animate-slide-up">
              Direct Residency.<br />
              <span class="text-gradient-emerald italic font-medium">Yield Protocol.</span>
            </h1>

            <p class="text-xl sm:text-3xl text-gray-400 max-w-5xl mx-auto font-medium mb-24 leading-relaxed animate-slide-up delay-100 px-4">
              Eliminate platform commission volatility. Synchronize Airbnb, Booking.com & MMT into a unified <span class="text-gray-900 font-bold">Autonomous Hospitality Engine</span>. Optimize net yield with a fixed <span class="text-emerald-600 font-bold border-b-2 border-emerald-100 pb-1">5% economics structure.</span>
            </p>

            <div class="flex flex-col sm:flex-row items-center justify-center gap-10 animate-slide-up delay-200">
              <a href="/register" class="w-full sm:w-auto px-16 py-7 bg-gray-900 text-white font-bold text-lg rounded-[1.8rem] shadow-premium-lg hover:bg-emerald-600 hover:-translate-y-2 transition-all duration-700 active:scale-95">
                Host Onboarding
              </a>
              <a href="#economics" class="w-full sm:w-auto px-16 py-7 bg-white text-gray-700 font-bold text-lg rounded-[1.8rem] border border-gray-100 shadow-premium hover:border-emerald-200 hover:-translate-y-2 transition-all duration-700 active:scale-95">
                Economics Audit
              </a>
            </div>
          </div>

          {/* Environmental Ambience */}
          <div class="absolute -top-64 -right-64 w-[60rem] h-[60rem] bg-emerald-50/30 rounded-full blur-[150px] opacity-30 animate-pulse" />
          <div class="absolute -bottom-64 -left-64 w-[60rem] h-[60rem] bg-teal-50/20 rounded-full blur-[150px] opacity-30 animate-pulse" style="animation-delay: 1.5s;" />
        </section>

        {/* ── PROTOCOL TICKER ────────────────────────────────── */}
        <section class="bg-gray-50/30 py-32 border-y border-gray-50/50">
          <div class="max-w-7xl mx-auto px-10">
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-20">
              {[
                { val: "₹1,000", label: "Monthly Protocol" },
                { val: "5%", label: "Direct Economics" },
                { val: "0%", label: "Ancillary Fees" },
                { val: "95%", label: "Net Yield" },
              ].map(({ val, label }) => (
                <div key={label} class="text-center group cursor-default">
                  <div class="text-7xl font-bold text-gray-900 tracking-tighter mb-4 transition-all duration-700 group-hover:text-emerald-600 group-hover:scale-110">{val}</div>
                  <div class="text-[11px] font-bold text-emerald-400 uppercase tracking-[0.4em]">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ECONOMICS GRID ──────────────────────────────────── */}
        <section class="py-48 lg:py-72 bg-white px-10" id="economics">
          <div class="max-w-7xl mx-auto">
            <div class="mb-40 text-center lg:text-left space-y-8">
              <span class="inline-block px-6 py-2.5 bg-emerald-50 text-emerald-700 text-[11px] font-bold uppercase tracking-[0.3em] rounded-full border border-emerald-100 shadow-sm">Economics Audit</span>
              <h2 class="text-7xl sm:text-9xl font-bold text-gray-900 tracking-tighter leading-[0.85]">
                Eliminate yield erosion.<br />
                <span class="text-gray-200">Scale professional margins.</span>
              </h2>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {[
                { name: "Airbnb", fee: "15-20%", loss: "₹10,000", icon: "🏛️", color: "text-rose-500", desc: "Standard OTA overhead" },
                { name: "Booking.com", fee: "15-25%", loss: "₹12,500", icon: "💎", color: "text-blue-500", desc: "Corporate commission model" },
                { name: "iStay", fee: "5%", loss: "₹2,500", icon: "✨", color: "text-emerald-500", highlight: true, desc: "Professional direct yield protocol" },
              ].map((p) => (
                <div key={p.name} class={`p-16 rounded-[4rem] border transition-all duration-1000 relative overflow-hidden group ${p.highlight ? 'bg-gray-900 text-white border-gray-900 shadow-premium-xl lg:-translate-y-12' : 'bg-white text-gray-900 border-gray-50 shadow-premium hover:border-emerald-100 hover:shadow-premium-lg'}`}>
                   {p.highlight && <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15)_0%,transparent_60%)]" />}
                   <span class="text-6xl mb-12 block grayscale filter group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110">{p.icon}</span>
                   <p class="text-[11px] font-bold uppercase tracking-[0.4em] mb-8 opacity-40">{p.name}</p>
                   <p class={`text-8xl font-bold tracking-tighter mb-6 ${p.color}`}>{p.fee}</p>
                   <p class="text-[14px] font-medium opacity-50 mb-16 leading-relaxed">{p.desc}</p>
                   <div class="pt-12 border-t border-gray-100/10 flex items-center justify-between">
                     <p class="text-[11px] font-bold uppercase tracking-[0.3em] opacity-30">Yield Erosion</p>
                     <p class="text-4xl font-bold tracking-tighter">{p.loss}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ASSET SYNCHRONIZATION ───────────────────────────── */}
        <section class="py-48 lg:py-72 bg-emerald-50/10 px-10 relative overflow-hidden">
          <div class="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-40 relative z-10">
            <div class="flex-[1.2] space-y-12">
              <span class="inline-block px-6 py-2.5 bg-white text-emerald-800 text-[11px] font-bold uppercase tracking-[0.3em] rounded-full border border-emerald-50 shadow-sm">Autonomous Curation</span>
              <h2 class="text-7xl sm:text-9xl font-bold text-gray-900 tracking-tighter leading-[0.85]">
                Asset Sync in<br />
                <span class="text-emerald-600 italic font-medium font-serif">Seconds.</span>
              </h2>
              <p class="text-2xl font-medium text-gray-400 leading-relaxed max-w-2xl">
                Authorize any Airbnb residency node. Our autonomous engine synchronizes descriptions, ultra-high-resolution media, and <span class="text-gray-900">House Protocols</span> in real-time.
              </p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
                {[
                  { f: "Autonomous asset harvest", i: "📦" },
                  { f: "Protocol policy parsing", i: "📜" },
                  { f: "Media synchronization", i: "🖼️" },
                  { f: "Yield optimization", i: "📈" }
                ].map(item => (
                  <div key={item.f} class="flex items-center gap-6 p-6 bg-white/60 backdrop-blur-xl rounded-[1.5rem] border border-white shadow-sm transition-all duration-500 hover:bg-white hover:shadow-premium group cursor-default">
                    <div class="w-14 h-14 rounded-2xl bg-white border border-gray-50 flex items-center justify-center text-2xl shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-emerald-50 group-hover:border-emerald-100">
                      {item.i}
                    </div>
                    <span class="text-[13px] font-bold text-gray-900 uppercase tracking-[0.2em]">{item.f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div class="flex-1 w-full p-12 bg-white border border-gray-50/50 rounded-[4.5rem] shadow-premium-xl relative group overflow-hidden transition-all duration-1000 hover:shadow-premium-2xl">
               <div class="absolute inset-0 bg-gradient-to-br from-emerald-50/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-[2000ms]" />
               <LazyIsland placeholderHeight="450px">
                 <ScraperPreview />
               </LazyIsland>
            </div>
          </div>
        </section>

        {/* ── BENTO OPERATIONS ──────────────────────────────── */}
        <section class="py-48 lg:py-72 bg-white px-10" id="features">
          <div class="max-w-7xl mx-auto">
             <div class="mb-40 text-center space-y-8">
                <h2 class="text-7xl sm:text-9xl font-bold text-gray-900 tracking-tighter leading-[0.85]">
                  Precision Hospitality<br />
                  <span class="text-emerald-500 font-serif italic font-medium">Operations.</span>
                </h2>
                <p class="text-xl text-gray-400 font-medium tracking-[0.1em] uppercase">Unified hospitality dashboard for professional networks.</p>
             </div>

             <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
               {[
                 { t: "Autonomous Concierge", d: "Professional residency interactions driven by proprietary stay intelligence.", e: "🤖" },
                 { t: "Protocol Authentication", d: "Secure guest verification with encrypted synchronization protocols.", e: "🛡️" },
                 { t: "Direct Residency Engine", d: "Bespoke, high-conversion acquisition interface with zero OTA volatility.", e: "🔗" },
                 { t: "Synchronized Payouts", d: "Economics distribution via secure, instant professional gateways.", e: "⚡" },
                 { t: "Residency Intelligence", d: "Persistent recognition of global guest preferences and acquisition profiles.", e: "📊" },
                 { t: "Incident Dispatch", d: "Autonomous team synchronization and protocol resolution via WhatsApp.", e: "👥" },
               ].map(f => (
                 <div key={f.t} class="p-14 bg-white border border-gray-50 rounded-[3.5rem] shadow-premium hover:shadow-premium-lg hover:border-emerald-100 hover:-translate-y-3 transition-all duration-1000 group cursor-default">
                   <div class="text-6xl mb-12 grayscale filter group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110">{f.e}</div>
                   <h3 class="text-2xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">{f.t}</h3>
                   <p class="text-[15px] font-medium text-gray-400 leading-relaxed transition-colors group-hover:text-gray-600">{f.d}</p>
                 </div>
               ))}
             </div>
          </div>
        </section>

        {/* ── FINAL CALL TO ACTION ────────────────────────── */}
        <section class="py-64 lg:py-80 bg-gray-900 relative overflow-hidden px-10">
           <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.2)_0%,transparent_70%)]" />
           <div class="relative z-10 max-w-7xl mx-auto text-center space-y-20">
             <h2 class="text-7xl sm:text-[10rem] font-bold text-white tracking-tighter leading-[0.85]">
               Your hospitality network.<br />
               <span class="text-emerald-400 font-serif italic font-medium">Bespoke autonomy.</span>
             </h2>
             <p class="text-2xl sm:text-3xl text-gray-400 max-w-4xl mx-auto font-medium leading-relaxed">
               Join the professional network of residency managers optimizing for net yield. The era of OTA dominance has been <span class="text-white">superseded</span>.
             </p>
             <a href="/register" class="inline-flex px-20 py-8 bg-emerald-500 text-white font-bold text-xl rounded-[2rem] shadow-premium shadow-emerald-500/20 hover:bg-emerald-400 hover:-translate-y-2 transition-all duration-700 group active:scale-95">
               Initialize Onboarding
               <span class="ml-4 group-hover:translate-x-2 transition-transform duration-500">→</span>
             </a>
           </div>
           
           <div class="absolute bottom-16 left-1/2 -translate-x-1/2">
              <p class="text-[11px] font-bold text-gray-700 uppercase tracking-[0.6em]">iStay Professional Network Protocol</p>
           </div>
        </section>
      </main>

      <Footer />
    </>
  );
}


