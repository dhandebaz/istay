import { Head } from "$fresh/runtime.ts";
import Header from "../../islands/Header.tsx";
import Footer from "../../components/Footer.tsx";

const LAST_UPDATED = "APRIL 11, 2026";

export default function Cancellation() {
  return (
    <>
      <Head>
        <title>Refund Logic | iStay</title>
        <meta
          name="description"
          content="istay Cancellation & Refund Policy. The ₹1,000 Host setup fee is non-refundable. Guest booking refunds are subject to each Host's individual policy."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Refund Logic | istay"
        />
        <meta
          property="og:description"
          content="Understand istay's refund rules for Hosts (SaaS fees) and Guests (booking refunds)."
        />
        <meta name="twitter:card" content="summary" />
      </Head>

      <Header />

      <main class="bg-white pt-32 pb-24 selection:bg-mint-400">
        {/* Page Header */}
        <section class="max-w-7xl mx-auto px-5 sm:px-8 mb-20">
          <div class="flex items-center gap-4 mb-8">
            <div class="px-3 py-1 bg-gray-900 text-mint-400 text-[10px] font-950 uppercase tracking-[0.2em] rounded-full border-[2px] border-gray-900 shadow-[3px_3px_0px_0px_#4ade80]">
              REFUND_LOGIC
            </div>
            <div class="h-[2px] flex-1 bg-gray-100" />
          </div>
          
          <h1 class="text-5xl sm:text-7xl font-950 text-gray-900 tracking-tighter uppercase leading-[0.85] mb-8">
            REVERSAL_<br />
            <span class="text-mint-500">PROTOCOLS.</span>
          </h1>
          <p class="text-xs text-gray-400 font-800 uppercase tracking-widest">
            LAST_REVISION: {LAST_UPDATED} // OPERATED_BY_ISTAY
          </p>
        </section>

        <div class="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Commitment Sidebar */}
          <aside class="lg:col-span-1">
            <div class="sticky top-40 bg-rose-50 border-[4px] border-gray-900 rounded-[2.5rem] p-10 shadow-[12px_12px_0px_0px_#f43f5e]">
              <h2 class="text-gray-900 font-950 text-xl uppercase tracking-tighter mb-8 flex items-center gap-3">
                <span class="text-2xl">⚠️</span>
                CRITICAL_INFO
              </h2>
              <ul class="space-y-6">
                {[
                  "Host setup fees (₹1,000) are strictly non-reversible.",
                  "Guest booking refunds are governed by host-specific policies.",
                  "iStay protocol fees (5%) follow host refund logic.",
                  "Transaction disputes are resolved via Easebuzz arbitration."
                ].map((item) => (
                  <li class="flex items-start gap-4">
                    <span class="w-2 h-2 rounded-full bg-rose-500 mt-2 shrink-0" />
                    <p class="text-[10px] font-950 text-gray-900 uppercase tracking-widest leading-relaxed">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main Cancellation Content */}
          <div class="lg:col-span-2 space-y-16">
            <div class="prose-brutalist">
              <section class="space-y-8">
                <h2 class="text-3xl font-950 text-gray-900 uppercase tracking-tighter">01. HOST_SUBSCRIPTION</h2>
                
                <div class="p-8 bg-gray-900 rounded-3xl border-[3px] border-gray-900 shadow-[8px_8px_0px_0px_#4ade80]">
                  <h3 class="text-xs font-950 text-mint-400 uppercase tracking-[0.2em] mb-4">SETUP_FEE (₹1,000)</h3>
                  <p class="text-sm text-gray-300 font-700 leading-relaxed uppercase tracking-tight">
                    THE ONE-TIME PLATFORM SETUP FEE IS NON-REFUNDABLE ONCE ACCOUNT ACTIVATION IS FINALIZED. THIS COVERS PROVISIONING AND INFRASTRUCTURE OVERHEAD.
                  </p>
                </div>

                <p class="text-sm text-gray-500 font-600 leading-relaxed">
                  <strong>Exception Clause:</strong> If iStay fails to activate the system within 3 business days of payment without technical cause from the host side, a full reversal may be requested within 7 days of the transaction.
                </p>
              </section>

              <section class="space-y-6 pt-16 border-t-[4px] border-gray-100">
                <h2 class="text-3xl font-950 text-gray-900 uppercase tracking-tighter">02. PROTOCOL_FEE_REVERSAL</h2>
                <p class="text-sm text-gray-500 font-600 leading-relaxed">
                  The 5% infrastructure fee is linked to the primary transaction. If a host initiates a full guest refund, the iStay protocol fee will also be credited back to the host's settlement account, minus any gateway processing charges levied by Easebuzz.
                </p>
              </section>

              <section class="space-y-6 pt-16 border-t-[4px] border-gray-100">
                <h2 class="text-3xl font-950 text-gray-900 uppercase tracking-tighter">03. GUEST_CANCELLATIONS</h2>
                <p class="text-sm text-gray-500 font-600 leading-relaxed">
                  iStay is a software layer. Refund eligibility for guests is determined by the specific cancellation policy configured by the Host for each property. Guests must initiate refund requests through the Host's dashboard or support coordinates.
                </p>
              </section>
            </div>
            
            <div class="p-10 bg-gray-50 rounded-[2.5rem] border-[4px] border-gray-900 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <p class="text-[10px] font-950 text-gray-900 uppercase tracking-[0.3em] mb-4">ARBITRATION_SIGNAL</p>
              <p class="text-sm text-gray-700 font-700 leading-relaxed">
                ALL DISPUTES ARE SUBJECT TO THE JURISDICTION OF NEW DELHI COURTS. iSTAY ACTS AS A NEUTRAL TECHNOLOGY FACILITATOR IN ALL FINANCIAL REVERSAL PROCESSES.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
