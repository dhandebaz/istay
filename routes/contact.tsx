import { PageProps } from "$fresh/server.ts";
import Header from "../islands/Header.tsx";
import Footer from "../components/Footer.tsx";
import SEOMeta from "../components/SEOMeta.tsx";
import { MailIcon, MapPinIcon, CheckIcon } from "../components/Icons.tsx";

const SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "istay",
  url: "https://istay.space",
  email: "support@istay.space",
  description: "Direct booking SaaS for property hosts. Operated by istay",
});

export default function Contact({ url }: PageProps) {
  const isSuccess = url.searchParams.get("success") === "true";
  
  return (
    <>
      <SEOMeta 
        title="CONTACT_SUPPORT | ISTAY — DIRECT_BOOKING_STACK"
        description="REACH OUT TO ISTAY SUPPORT AT SUPPORT@ISTAY.SPACE. WE'RE HERE TO HELP YOU WITH ONBOARDING, BILLING, AND ANY TECHNICAL QUESTIONS."
      />

      <Header />

      <main class="bg-white pt-24">
        {/* ── HERO ────────────────────────────────────────── */}
        <section class="bg-gray-900 py-32 px-5 text-center relative overflow-hidden">
           <div class="relative z-10 max-w-7xl mx-auto">
             <span class="inline-block px-5 py-2 bg-white text-gray-900 text-[10px] font-950 uppercase tracking-[0.3em] mb-8 rounded-xl">SUPPORT_KERNEL_V1</span>
             <h1 class="text-6xl sm:text-8xl font-950 text-white tracking-tighter leading-[0.9] uppercase mb-10">
               QUERY_THE_STACK.<br />
               <span class="text-mint-400">SUPPORT_ONLINE.</span>
             </h1>
             <p class="text-lg sm:text-xl font-800 text-gray-400 uppercase max-w-2xl mx-auto leading-relaxed">
               WHETHER YOU ARE ONBOARDING YOUR FIRST PROPERTY OR SCALING TO FIFTY, OUR TEAM RESPONDS WITHIN 24 BUSINESS HOURS.
             </p>
           </div>
        </section>

        {/* ── CONTACT GRID ────────────────────────────────── */}
        <section class="py-32 px-5 bg-white">
          <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">
              {/* Left Column — Info */}
              <div class="lg:col-span-2 space-y-12">
                <div class="p-10 bg-white border-[4px] border-gray-900 rounded-[3rem] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex items-start gap-8">
                  <div class="flex-shrink-0 w-16 h-16 rounded-[1.5rem] bg-mint-400 border-[3px] border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                    <MailIcon class="w-8 h-8 text-gray-900" />
                  </div>
                  <div>
                    <h2 class="text-[10px] font-950 text-gray-400 uppercase tracking-[0.3em] mb-4">PROTOCOL_EMAIL</h2>
                    <a href="mailto:support@istay.space" class="text-xl sm:text-2xl font-950 text-gray-900 hover:text-mint-500 transition-colors tracking-tighter uppercase">support@istay.space</a>
                    <p class="mt-4 text-[10px] font-950 text-gray-400 uppercase tracking-widest">EST_RESPONSE: 24-48_HRS</p>
                  </div>
                </div>

                <div class="p-10 bg-gray-900 border-[4px] border-gray-900 rounded-[3rem] shadow-[12px_12px_0px_0px_#4ade80]">
                   <h3 class="text-[10px] font-950 text-mint-400 uppercase tracking-[0.3em] mb-10 flex items-center gap-3">
                     <span class="w-2 h-2 rounded-full bg-mint-400 animate-pulse" />
                     SLA_RESPONSE_TIMES
                   </h3>
                   <div class="space-y-6">
                     {[
                       { label: "GENERAL_ENQUIRIES", time: "24-48_HRS" },
                       { label: "BILLING_PROTOCOLS", time: "12-24_HRS" },
                       { label: "TECHNICAL_DEBUG", time: "4-12_HRS" },
                     ].map((sla) => (
                       <div key={sla.label} class="flex justify-between items-center border-b-[2px] border-white/5 pb-4">
                         <span class="text-[10px] font-950 text-gray-400 tracking-widest uppercase">{sla.label}</span>
                         <span class="text-[10px] font-950 text-white tracking-widest uppercase">{sla.time}</span>
                       </div>
                     ))}
                   </div>
                </div>
              </div>

              {/* Right Column — Form Context */}
              <div class="lg:col-span-3">
                 <div class="p-12 bg-white border-[4px] border-gray-900 rounded-[3rem] shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]">
                   <span class="inline-block px-5 py-2 bg-gray-900 text-white text-[10px] font-950 uppercase tracking-[0.3em] mb-10 rounded-xl">MESSAGE_TRANSMISSION</span>
                   <h3 class="text-4xl font-950 text-gray-900 uppercase tracking-tighter mb-12 leading-none">SUBMIT_A_PROTOCOL_REQUEST.</h3>
                   
                   <p class="text-lg font-800 text-gray-400 uppercase leading-snug mb-12">
                     PLEASE INCLUDE YOUR HOST_ID FOR EXPEDITED VERIFICATION. OUR KERNEL TEAM MONITORS INCOMING SIGNALS 24/7.
                   </p>

                   <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                     <div class="p-8 bg-gray-50 border-[3px] border-gray-900 rounded-[2rem] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                       <p class="text-[10px] font-950 text-gray-400 uppercase tracking-widest mb-4">WHATSAPP_CHANNEL</p>
                       <p class="text-xl font-950 text-gray-900">+91 99999 99999</p>
                     </div>
                     <div class="p-8 bg-gray-50 border-[3px] border-gray-900 rounded-[2rem] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                       <p class="text-[10px] font-950 text-gray-400 uppercase tracking-widest mb-4">X_SIGNAL</p>
                       <p class="text-xl font-950 text-gray-900">@ISTAY_OS</p>
                     </div>
                   </div>

                   <a href="mailto:support@istay.space" class="block w-full py-6 bg-mint-400 text-gray-900 font-950 text-xs uppercase tracking-[0.2em] rounded-2xl border-[4px] border-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">TRANSMIT_EMAIL_PACKET</a>
                 </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
