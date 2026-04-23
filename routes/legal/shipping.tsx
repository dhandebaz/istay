import { Head } from "$fresh/runtime.ts";
import Header from "../../islands/Header.tsx";
import Footer from "../../components/Footer.tsx";

const LAST_UPDATED = "APRIL 11, 2026";

export default function Shipping() {
  return (
    <>
      <Head>
        <title>Delivery Protocol | iStay</title>
        <meta
          name="description"
          content="istay Shipping & Delivery Policy. istay is a digital platform — there is no physical shipping. All deliverables are digital: instant booking confirmations and dashboard access."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Delivery Protocol | istay"
        />
        <meta
          property="og:description"
          content="istay delivers instantly — no physical goods are shipped. Access your booking dashboard the moment payment is confirmed."
        />
        <meta name="twitter:card" content="summary" />
      </Head>

      <Header />

      <main class="bg-white pt-32 pb-24 selection:bg-mint-400">
        {/* Page Header */}
        <section class="max-w-7xl mx-auto px-5 sm:px-8 mb-20">
          <div class="flex items-center gap-4 mb-8">
            <div class="px-3 py-1 bg-gray-900 text-mint-400 text-[10px] font-950 uppercase tracking-[0.2em] rounded-full border-[2px] border-gray-900 shadow-[3px_3px_0px_0px_#4ade80]">
              DELIVERY_STATS
            </div>
            <div class="h-[2px] flex-1 bg-gray-100" />
          </div>
          
          <h1 class="text-5xl sm:text-7xl font-950 text-gray-900 tracking-tighter uppercase leading-[0.85] mb-8">
            INSTANT_<br />
            <span class="text-mint-500">PROVISIONING.</span>
          </h1>
          <p class="text-xs text-gray-400 font-800 uppercase tracking-widest">
            LAST_REVISION: {LAST_UPDATED} // OPERATED_BY_ISTAY
          </p>
        </section>

        <div class="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Commitment Sidebar */}
          <aside class="lg:col-span-1">
            <div class="sticky top-40 bg-gray-900 border-[4px] border-gray-900 rounded-[2.5rem] p-10 shadow-[12px_12px_0px_0px_#4ade80]">
              <h2 class="text-white font-950 text-xl uppercase tracking-tighter mb-8 flex items-center gap-3">
                <span class="text-2xl">🌍</span>
                GLOBAL_ACCESS
              </h2>
              <ul class="space-y-6">
                {[
                  "No physical freight — 100% digital transmission.",
                  "Dashboard activation within 0-3 business days.",
                  "Instant email confirmation for all transactions.",
                  "Booking URLs generated immediately post-setup."
                ].map((item) => (
                  <li class="flex items-start gap-4">
                    <span class="w-2 h-2 rounded-full bg-mint-400 mt-2 shrink-0" />
                    <p class="text-[10px] font-950 text-gray-400 uppercase tracking-widest leading-relaxed">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main Shipping Content */}
          <div class="lg:col-span-2 space-y-16">
            <div class="prose-brutalist">
              <section class="space-y-6">
                <h2 class="text-3xl font-950 text-gray-900 uppercase tracking-tighter">01. DIGITAL_ONLY</h2>
                <p class="text-sm text-gray-500 font-600 leading-relaxed">
                  iStay is exclusively a <strong>digital Software-as-a-Service (SaaS) platform</strong>. We do not sell, manufacture, or ship any physical goods. There is no physical product associated with any purchase made on or through the iStay platform.
                </p>
              </section>

              <section class="space-y-8 pt-16 border-t-[4px] border-gray-100">
                <h2 class="text-3xl font-950 text-gray-900 uppercase tracking-tighter">02. ACTIVATION_WINDOW</h2>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div class="p-8 bg-mint-50 rounded-3xl border-[3px] border-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <h3 class="text-xs font-950 text-gray-900 uppercase tracking-[0.2em] mb-4">FOR_HOSTS</h3>
                    <p class="text-[10px] text-gray-700 font-800 leading-relaxed uppercase tracking-widest">
                      DASHBOARD ACCESS AND BRANDED URLS ARE PROVISIONED ELECTRONICALLY WITHIN 72 HOURS OF THE SETUP FEE VERIFICATION.
                    </p>
                  </div>
                  <div class="p-8 bg-gray-50 rounded-3xl border-[3px] border-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <h3 class="text-xs font-950 text-gray-900 uppercase tracking-[0.2em] mb-4">FOR_GUESTS</h3>
                    <p class="text-[10px] text-gray-700 font-800 leading-relaxed uppercase tracking-widest">
                      BOOKING CONFIRMATIONS ARE TRANSMITTED VIA EMAIL AND WHATSAPP IMMEDIATELY UPON SUCCESSFUL PAYMENT AUTHORIZATION.
                    </p>
                  </div>
                </div>
              </section>

              <section class="space-y-6 pt-16 border-t-[4px] border-gray-100">
                <h2 class="text-3xl font-950 text-gray-900 uppercase tracking-tighter">03. AUDIT_TRAILS</h2>
                <p class="text-sm text-gray-500 font-600 leading-relaxed">
                  Every successful delivery of service is logged with a unique transaction hash. Hosts can view all provisioned services and their activation status within the 'System Registry' section of the dashboard.
                </p>
              </section>
            </div>
            
            <div class="p-10 bg-gray-900 rounded-[2.5rem] border-[4px] border-gray-900 shadow-[12px_12px_0px_0px_#4ade80]">
              <p class="text-[10px] font-950 text-mint-400 uppercase tracking-[0.3em] mb-4">DELIVERY_SIGNAL</p>
              <p class="text-sm text-white font-700 leading-relaxed">
                SINCE ALL DELIVERABLES ARE DIGITAL, NO SHIPPING CHARGES APPLY TO ANY TRANSACTION ON THE iSTAY PLATFORM. DELIVERY IS GLOBAL AND INSTANTANEOUS UPON PROTOCOL CLEARANCE.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
