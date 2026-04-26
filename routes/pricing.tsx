import { Handlers, PageProps } from "$fresh/server.ts";
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
import { parseCookies } from "./dashboard/_middleware.ts";

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
        hostId = decoded.includes("|") ? decoded.split("|")[0].trim() : decoded.trim();
        if (hostId) {
          const host = await getHost(hostId);
          if (host) subscriptionStatus = host.subscriptionStatus;
        }
      } catch {}
    }
    return ctx.render({ hostId, subscriptionStatus });
  },
};

const FAQS = [
  { q: "How does the economics protocol work?", a: "iStay establishes a flat ₹1,000 monthly protocol to maintain your unified residency engine and direct synchronization channels. Advanced intelligence usage is facilitated via a prioritized prepaid wallet." },
  { q: "What is the Intelligence Wallet?", a: "It is your primary fuel source for autonomous concierge operations, WhatsApp synchronization, and persistent guest intelligence. Maintain your balance for uninterrupted service." },
  { q: "Does iStay supersede existing OTA channels?", a: "It synchronizes them. iStay serves as your central command node for Airbnb, Booking.com, and MMT, ensuring direct residency capture while maintaining OTA presence." },
  { q: "How are residency settlements processed?", a: "Guests settle via secure digital protocols (UPI/Card). You retain 95% of the residency value, settled directly to your linked account with real-time transparency." },
];

export default function Pricing({ data }: PageProps<PricingData>) {
  return (
    <>
      <SEOMeta 
        title="Economics Protocol | iStay — Unified Residency Engine"
        description="Synchronize every residency channel. One interface for portfolio mastery. ₹1,000 monthly protocol."
      />

      <Header />

      <main class="bg-white pt-24 selection:bg-emerald-100">
        {/* ── HERO ────────────────────────────────────────── */}
        <section class="bg-gray-900 py-48 lg:py-64 px-8 text-center relative overflow-hidden">
           <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15)_0%,transparent_60%)]" />
           <div class="relative z-10 max-w-7xl mx-auto space-y-12">
             <span class="inline-block px-6 py-2.5 bg-white/10 backdrop-blur-xl text-emerald-400 text-[11px] font-bold uppercase tracking-[0.4em] rounded-2xl border border-white/10 animate-fade-in">Economics Protocol v2.0</span>
             <h1 class="text-7xl sm:text-9xl font-bold text-white tracking-tighter leading-[0.85] animate-slide-up">
               Portfolio Mastery.<br />
               <span class="text-emerald-500 italic font-medium font-serif">Guest Sovereignty.</span>
             </h1>
             <p class="text-xl sm:text-2xl font-medium text-gray-400 max-w-4xl mx-auto leading-relaxed animate-slide-up delay-100">
               Unified command for Airbnb, Booking.com & MMT. Direct residencies optimized at a fixed <span class="text-white border-b-2 border-emerald-500 pb-1">5% margin structure.</span>
             </p>
           </div>
        </section>

        {/* ── PRICING ARCHITECTURE ──────────────────────────────── */}
        <section class="py-48 px-10 bg-white">
           <div class="max-w-7xl mx-auto">
             <div class="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
               <div class="p-16 bg-white border border-gray-50 rounded-[4rem] shadow-premium-xl relative overflow-hidden group animate-slide-up">
                  <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.05)_0%,transparent_50%)]" />
                  <span class="inline-block px-6 py-2.5 bg-emerald-50 text-emerald-700 text-[11px] font-bold uppercase tracking-[0.3em] mb-12 rounded-2xl border border-emerald-100">Professional Protocol</span>
                  <div class="flex items-baseline gap-6 mb-12">
                    <span class="text-8xl font-bold text-gray-900 tracking-tighter">₹1,000</span>
                    <span class="text-sm font-bold text-gray-400 uppercase tracking-[0.4em]">/ Monthly Protocol</span>
                  </div>

                  <ul class="space-y-8 mb-16">
                    {[
                      "Unified Multi-OTA Dashboard",
                      "Autonomous Stay Concierge",
                      "Real-time Residency Sync",
                      "Smart OCR Protocol Verification",
                      "Direct Residency Discovery",
                      "WhatsApp Incident Dispatch",
                      "Unlimited Portfolio Scaling",
                    ].map(f => (
                      <li key={f} class="flex items-center gap-6 text-[13px] font-bold text-gray-900 uppercase tracking-[0.2em] group/item">
                        <div class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-sm transition-transform group-hover/item:scale-110">
                          <CheckIcon class="w-4 h-4" />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>

                  {data.hostId ? (
                    data.subscriptionStatus === "active" ? (
                      <a href="/dashboard" class="block w-full py-8 bg-gray-900 text-emerald-400 font-bold text-xs uppercase tracking-[0.4em] rounded-[1.8rem] shadow-premium-lg hover:bg-emerald-600 transition-all text-center">Enter Command Center</a>
                    ) : (
                      <PricingCheckout hostId={data.hostId} />
                    )
                  ) : (
                    <a href="/register" class="block w-full py-8 bg-emerald-500 text-white font-bold text-xs uppercase tracking-[0.4em] rounded-[1.8rem] shadow-premium-lg hover:bg-emerald-600 transition-all text-center group active:scale-95">
                      Initialize Onboarding
                      <span class="inline-block ml-3 group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                  )}
               </div>

               <div class="space-y-16 animate-slide-up delay-100">
                 <div class="p-12 bg-gray-50 border border-gray-100 rounded-[3.5rem] shadow-premium">
                   <p class="text-[11px] font-bold text-rose-500 uppercase tracking-[0.4em] mb-8 italic">Legacy Yield Erosion</p>
                   <table class="w-full text-left uppercase text-[11px] font-bold tracking-[0.3em]">
                     <thead>
                       <tr class="border-b-2 border-gray-200">
                         <th class="py-6">ENTITY NODE</th>
                         <th class="py-6 text-right">OVERHEAD</th>
                       </tr>
                     </thead>
                     <tbody class="text-gray-400">
                       <tr class="border-b border-gray-100"><td class="py-6">Airbnb Network</td><td class="py-6 text-right">15-20%</td></tr>
                       <tr class="border-b border-gray-100"><td class="py-6">Booking Portfolio</td><td class="py-6 text-right">15-25%</td></tr>
                       <tr class="border-b border-gray-100"><td class="py-6">MMT Global</td><td class="py-6 text-right">18-22%</td></tr>
                       <tr class="text-emerald-600"><td class="py-6 font-bold">iStay Protocol</td><td class="py-6 text-right font-bold">5%</td></tr>
                     </tbody>
                   </table>
                 </div>

                 <div class="p-12 bg-emerald-50/50 border border-emerald-100 rounded-[3.5rem] shadow-premium relative group overflow-hidden">
                    <div class="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.05)_0%,transparent_50%)]" />
                    <p class="text-[11px] font-bold text-emerald-800 uppercase tracking-[0.4em] mb-4">Network Health Signal</p>
                    <p class="text-3xl font-bold text-gray-900 tracking-tighter leading-tight group-hover:text-emerald-600 transition-colors">Join 1,350+ professional managers who have eliminated yield discrepancies.</p>
                 </div>
               </div>
             </div>
           </div>
        </section>

        {/* ── REVENUE OPTIMIZATION ──────────────────────────── */}
        <section class="py-48 bg-gray-50/30 px-10 border-y border-gray-50">
           <div class="max-w-7xl mx-auto">
             <div class="text-center mb-24 space-y-4">
                <span class="text-[11px] font-bold text-emerald-600 uppercase tracking-[0.5em]">Optimization Engine</span>
                <h2 class="text-5xl font-bold text-gray-900 tracking-tighter">Project Your Net Yield</h2>
             </div>
             <LazyIsland placeholderHeight="600px">
               <EarningsCalculator />
             </LazyIsland>
           </div>
        </section>

        {/* ── INSIGHTS PROTOCOL ──────────────────────────────────── */}
        <section class="py-48 bg-white px-10">
           <div class="max-w-5xl mx-auto">
              <div class="mb-32 text-center space-y-8">
                <span class="inline-block px-6 py-2.5 bg-gray-900 text-white text-[11px] font-bold uppercase tracking-[0.4em] rounded-[1.2rem] shadow-premium">Insights Protocol</span>
                <h2 class="text-6xl font-bold text-gray-900 tracking-tighter uppercase leading-none">Discovery Insights.</h2>
                <p class="text-lg text-gray-400 font-medium tracking-widest uppercase">Answers to your most frequent operational queries.</p>
              </div>
              <FaqSearch faqs={FAQS} />
           </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

