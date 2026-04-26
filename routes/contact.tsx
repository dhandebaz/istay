import { PageProps } from "$fresh/server.ts";
import Header from "../islands/Header.tsx";
import Footer from "../components/Footer.tsx";
import SEOMeta from "../components/SEOMeta.tsx";
import { MailIcon, MapPinIcon, CheckIcon } from "../components/Icons.tsx";

const SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "iStay",
  url: "https://istay.space",
  email: "support@istay.space",
  description: "Direct residency SaaS for property hosts. Operated by iStay",
});

export default function Contact({ url }: PageProps) {
  const isSuccess = url.searchParams.get("success") === "true";
  
  return (
    <>
      <SEOMeta 
        title="Assistance Protocol | iStay — Unified Residency Engine"
        description="Reach out to iStay assistance at support@istay.space. We are here to facilitate your onboarding, economics, and technical synchronization."
      />

      <Header />

      <main class="bg-white pt-24 selection:bg-emerald-100">
        {/* ── HERO ────────────────────────────────────────── */}
        <section class="bg-gray-900 py-48 lg:py-64 px-8 text-center relative overflow-hidden">
           <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15)_0%,transparent_60%)]" />
           <div class="relative z-10 max-w-7xl mx-auto space-y-12">
             <span class="inline-block px-6 py-2.5 bg-white/10 backdrop-blur-xl text-emerald-400 text-[11px] font-bold uppercase tracking-[0.4em] rounded-2xl border border-white/10 animate-fade-in">Concierge Response Node v2.0</span>
             <h1 class="text-7xl sm:text-9xl font-bold text-white tracking-tighter leading-[0.85] animate-slide-up">
               Inquiry Protocol.<br />
               <span class="text-emerald-500 italic font-medium font-serif">Concierge Online.</span>
             </h1>
             <p class="text-xl sm:text-2xl font-medium text-gray-400 max-w-3xl mx-auto leading-relaxed animate-slide-up delay-100">
               Whether you are onboarding your first residency node or scaling an entire portfolio, our concierge responds within 24 operational hours.
             </p>
           </div>
        </section>

        {/* ── ASSISTANCE GRID ────────────────────────────────── */}
        <section class="py-48 px-10 bg-white">
          <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-5 gap-20 lg:gap-32 items-start">
              {/* Left Column — Node Info */}
              <div class="lg:col-span-2 space-y-16 animate-slide-up">
                <div class="p-12 bg-white border border-gray-50 rounded-[4rem] shadow-premium-xl flex items-start gap-10 group relative overflow-hidden">
                  <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.05)_0%,transparent_50%)]" />
                  <div class="flex-shrink-0 w-20 h-20 rounded-[2rem] bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-sm transition-all duration-700 group-hover:scale-110 group-hover:rotate-12">
                    <MailIcon class="w-10 h-10" />
                  </div>
                  <div class="relative z-10">
                    <h2 class="text-[11px] font-bold text-emerald-600 uppercase tracking-[0.4em] mb-6">Direct Correspondence</h2>
                    <a href="mailto:support@istay.space" class="text-2xl sm:text-3xl font-bold text-gray-900 hover:text-emerald-500 transition-colors tracking-tighter">support@istay.space</a>
                    <p class="mt-6 text-[11px] font-bold text-gray-400 uppercase tracking-[0.3em] italic">Est. Response: 24-48 Hours</p>
                  </div>
                </div>

                <div class="p-12 bg-gray-900 border border-gray-900 rounded-[4rem] shadow-premium-lg relative overflow-hidden group">
                   <div class="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.15)_0%,transparent_60%)]" />
                   <h3 class="text-[11px] font-bold text-emerald-400 uppercase tracking-[0.4em] mb-12 flex items-center gap-4 relative z-10">
                     <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                     Service Protocol SLAs
                   </h3>
                   <div class="space-y-8 relative z-10">
                     {[
                       { label: "General Inquiries", time: "24-48 Hours" },
                       { label: "Economics Protocols", time: "12-24 Hours" },
                       { label: "Synchronization Debug", time: "4-12 Hours" },
                     ].map((sla) => (
                       <div key={sla.label} class="flex justify-between items-center border-b border-white/5 pb-6 group/item">
                         <span class="text-[11px] font-bold text-gray-400 tracking-[0.2em] uppercase transition-colors group-hover/item:text-white">{sla.label}</span>
                         <span class="text-[11px] font-bold text-emerald-400 tracking-[0.2em] uppercase">{sla.time}</span>
                       </div>
                     ))}
                   </div>
                </div>
              </div>

              {/* Right Column — Submission Context */}
              <div class="lg:col-span-3 animate-slide-up delay-100">
                 <div class="p-16 bg-white border border-gray-50 rounded-[4.5rem] shadow-premium-xl relative overflow-hidden group">
                   <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.05)_0%,transparent_50%)]" />
                   <span class="inline-block px-6 py-2.5 bg-gray-900 text-white text-[11px] font-bold uppercase tracking-[0.4em] mb-12 rounded-2xl shadow-premium">Inquiry Submission</span>
                   <h3 class="text-5xl font-bold text-gray-900 tracking-tighter mb-12 leading-tight">Initialize a protocol request.</h3>
                   
                   <p class="text-xl font-medium text-gray-400 leading-relaxed mb-16 px-1 italic">
                     Please include your <span class="text-gray-900 font-bold border-b-2 border-emerald-100">Account Node ID</span> for prioritized verification. Our concierge monitors incoming synchronization signals 24/7.
                   </p>

                   <div class="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-16">
                     <div class="p-10 bg-gray-50 border border-gray-100 rounded-[2.5rem] shadow-premium transition-all duration-700 hover:shadow-premium-lg group/card cursor-default">
                       <p class="text-[11px] font-bold text-gray-300 uppercase tracking-[0.4em] mb-6 group-hover/card:text-emerald-600 transition-colors">WhatsApp Channel</p>
                       <p class="text-2xl font-bold text-gray-900 tracking-tighter">+91 99999 99999</p>
                     </div>
                     <div class="p-10 bg-gray-50 border border-gray-100 rounded-[2.5rem] shadow-premium transition-all duration-700 hover:shadow-premium-lg group/card cursor-default">
                       <p class="text-[11px] font-bold text-gray-300 uppercase tracking-[0.4em] mb-6 group-hover/card:text-emerald-600 transition-colors">Digital Signal</p>
                       <p class="text-2xl font-bold text-gray-900 tracking-tighter">@iStay_Protocol</p>
                     </div>
                   </div>

                   <a href="mailto:support@istay.space" class="block w-full py-8 bg-emerald-500 text-white font-bold text-xs uppercase tracking-[0.4em] rounded-[1.8rem] shadow-premium-lg hover:bg-emerald-600 transition-all text-center group active:scale-95">
                     Transmit Inquiry
                     <span class="inline-block ml-3 group-hover:translate-x-1 transition-transform">→</span>
                   </a>
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

