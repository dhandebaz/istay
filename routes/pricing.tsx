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
  { q: "HOW DOES PRICING WORK?", a: "ISTAY CHARGES A FLAT ₹1,000 MONTHLY KERNEL FEE TO KEEP YOUR UNIFIED DASHBOARD AND DIRECT CHANNEL LIVE. AI USAGE IS BILLED VIA PREPAID WALLET." },
  { q: "WHAT IS THE AI WALLET?", a: "IT IS YOUR FUEL CELL FOR ADVANCED TASKS LIKE AUTONOMOUS WHATSAPP RESPONSES AND GLOBAL GUEST INTELLIGENCE. TOP UP AS NEEDED." },
  { q: "DOES ISTAY REPLACE OTAS?", a: "NO. IT CONNECTS THEM. WE ARE YOUR CENTRAL COMMAND CENTER FOR AIRBNB, MMT, AND BOOKING.COM." },
  { q: "HOW ARE GUESTS CHARGED?", a: "GUESTS PAY VIA UPI OR CARD. YOU RETAIN 95% DIRECTLY TO YOUR LINKED BANK ACCOUNT INSTANTLY." },
];

export default function Pricing({ data }: PageProps<PricingData>) {
  return (
    <>
      <SEOMeta 
        title="PRICING_KERNEL | ISTAY — UNIFIED_HOST_OS"
        description="CONNECT EVERY CHANNEL. ONE INTERFACE TO RULE THEM ALL. ₹1,000/MO FLAT FEE."
      />

      <Header />

      <main class="bg-white pt-24">
        {/* ── HERO ────────────────────────────────────────── */}
        <section class="bg-gray-900 py-32 px-5 text-center relative overflow-hidden">
           <div class="relative z-10 max-w-7xl mx-auto">
             <span class="inline-block px-5 py-2 bg-white text-gray-900 text-[10px] font-950 uppercase tracking-[0.3em] mb-8 rounded-xl">PRICING_PROTOCOL_V4</span>
             <h1 class="text-6xl sm:text-8xl font-950 text-white tracking-tighter leading-[0.9] uppercase mb-10">
               OWN_EVERY_CHANNEL.<br />
               <span class="text-mint-400">OWN_EVERY_GUEST.</span>
             </h1>
             <p class="text-lg sm:text-xl font-800 text-gray-400 uppercase max-w-3xl mx-auto leading-relaxed">
               ONE COMMAND CENTER FOR AIRBNB, BOOKING.COM & MMT. DIRECT BOOKINGS AT A FLAT <span class="text-white border-b-[3px] border-mint-400">5%_MARGIN_LEAK.</span>
             </p>
           </div>
        </section>

        {/* ── PRICING KERNEL ──────────────────────────────── */}
        <section class="py-32 px-5 bg-white">
           <div class="max-w-6xl mx-auto">
             <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
               <div class="p-12 bg-white border-[4px] border-gray-900 rounded-[3rem] shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]">
                  <span class="inline-block px-5 py-2 bg-mint-400 text-gray-900 text-[10px] font-950 uppercase tracking-[0.3em] mb-10 rounded-xl">PROFESSIONAL_STACK</span>
                  <div class="flex items-baseline gap-4 mb-10">
                    <span class="text-7xl font-950 text-gray-900 tracking-tighter">₹1,000</span>
                    <span class="text-xs font-950 text-gray-400 uppercase tracking-widest">/MO_KERNEL</span>
                  </div>

                  <ul class="space-y-6 mb-12">
                    {[
                      "UNIFIED_MULTI_OTA_DASHBOARD",
                      "24/7_AI_GUEST_CONCIERGE",
                      "REAL_TIME_CALENDAR_SYNC",
                      "SMART_OCR_ID_VERIFICATION",
                      "DIRECT_BOOKING_PROTOCOL",
                      "WHATSAPP_INCIDENT_DISPATCH",
                      "UNLIMITED_PROPERTIES",
                    ].map(f => (
                      <li key={f} class="flex items-center gap-4 text-[11px] font-950 text-gray-900 uppercase tracking-widest">
                        <div class="w-6 h-6 rounded-lg bg-mint-400 border-[2px] border-gray-900 flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                          <CheckIcon class="w-3 h-3" />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>

                  {data.hostId ? (
                    data.subscriptionStatus === "active" ? (
                      <a href="/dashboard" class="block w-full py-6 bg-gray-900 text-mint-400 font-950 text-xs uppercase tracking-[0.2em] rounded-2xl border-[4px] border-gray-900 shadow-[8px_8px_0px_0px_#4ade80] text-center">ACCESS_DASHBOARD</a>
                    ) : (
                      <PricingCheckout hostId={data.hostId} />
                    )
                  ) : (
                    <a href="/register" class="block w-full py-6 bg-mint-400 text-gray-900 font-950 text-xs uppercase tracking-[0.2em] rounded-2xl border-[4px] border-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">INITIALIZE_STACK</a>
                  )}
               </div>

               <div class="space-y-12">
                 <div class="p-10 bg-gray-50 border-[4px] border-gray-900 rounded-[2.5rem] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                   <p class="text-[10px] font-950 text-rose-500 uppercase tracking-widest mb-4">THE_ALTERNATIVE_LOSS</p>
                   <table class="w-full text-left uppercase text-[10px] font-950 tracking-widest">
                     <thead>
                       <tr class="border-b-2 border-gray-900">
                         <th class="py-4">ENTITY</th>
                         <th class="py-4 text-right">COMMISSION</th>
                       </tr>
                     </thead>
                     <tbody class="text-gray-500">
                       <tr class="border-b-[1px] border-gray-200"><td class="py-4">AIRBNB</td><td class="py-4 text-right">15-20%</td></tr>
                       <tr class="border-b-[1px] border-gray-200"><td class="py-4">BOOKING.COM</td><td class="py-4 text-right">15-25%</td></tr>
                       <tr class="border-b-[1px] border-gray-200"><td class="py-4">MMT</td><td class="py-4 text-right">18-22%</td></tr>
                       <tr class="text-mint-500"><td class="py-4 font-950">ISTAY_CORE</td><td class="py-4 text-right font-950">5%</td></tr>
                     </tbody>
                   </table>
                 </div>

                 <div class="p-10 bg-mint-400 border-[4px] border-gray-900 rounded-[2.5rem] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                    <p class="text-[10px] font-950 text-gray-900 uppercase tracking-widest mb-2">SYSTEM_HEALTH_SIGNAL</p>
                    <p class="text-2xl font-950 text-gray-900 uppercase leading-snug">JOIN_1350+_HOSTS_WHO_STOPPED_THE_BLEEDING.</p>
                 </div>
               </div>
             </div>
           </div>
        </section>

        {/* ── REVENUE CALCULATOR ──────────────────────────── */}
        <section class="py-32 bg-gray-50 px-5">
           <div class="max-w-7xl mx-auto">
             <LazyIsland placeholderHeight="600px">
               <EarningsCalculator />
             </LazyIsland>
           </div>
        </section>

        {/* ── FAQ SEARCH ──────────────────────────────────── */}
        <section class="py-32 bg-white px-5">
           <div class="max-w-4xl mx-auto">
              <div class="mb-20 text-center">
                <span class="inline-block px-5 py-2 bg-gray-900 text-white text-[10px] font-950 uppercase tracking-[0.3em] mb-8 rounded-xl">KNOWLEDGE_BASE</span>
                <h2 class="text-5xl font-950 text-gray-900 tracking-tighter uppercase">QUERY_THE_CORE.</h2>
              </div>
              <FaqSearch faqs={FAQS} />
           </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
