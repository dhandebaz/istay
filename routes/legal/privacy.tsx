import { Head } from "$fresh/runtime.ts";
import Header from "../../islands/Header.tsx";
import Footer from "../../components/Footer.tsx";

const LAST_UPDATED = "APRIL 11, 2026";

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Protocol | iStay</title>
        <meta
          name="description"
          content="istay's Privacy Policy. Learn how we collect, use, and protect your data — including our secure OCR-based guest ID processing. We never sell your data."
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Privacy Protocol | istay" />
        <meta
          property="og:description"
          content="istay takes privacy seriously. Read our policy on data collection, OCR ID processing, and our zero-data-selling commitment."
        />
        <meta name="twitter:card" content="summary" />
      </Head>

      <Header />

      <main class="bg-white pt-32 pb-24 selection:bg-mint-400">
        {/* Page Header */}
        <section class="max-w-7xl mx-auto px-5 sm:px-8 mb-20">
          <div class="flex items-center gap-4 mb-8">
            <div class="px-3 py-1 bg-gray-900 text-mint-400 text-[10px] font-950 uppercase tracking-[0.2em] rounded-full border-[2px] border-gray-900 shadow-[3px_3px_0px_0px_#4ade80]">
              PRIVACY_PROTOCOL
            </div>
            <div class="h-[2px] flex-1 bg-gray-100" />
          </div>
          
          <h1 class="text-5xl sm:text-7xl font-950 text-gray-900 tracking-tighter uppercase leading-[0.85] mb-8">
            DATA_<br />
            <span class="text-mint-500">PROTECTION.</span>
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
                <span class="text-2xl">🛡️</span>
                OUR_PLEDGE
              </h2>
              <ul class="space-y-6">
                {[
                  "We never sell guest or host intelligence to third parties.",
                  "OCR ID processing is transient — we don't store plain images.",
                  "Military-grade encryption for all financial transit data.",
                  "100% GDPR-aligned data handling protocols."
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

          {/* Main Privacy Content */}
          <div class="lg:col-span-2 space-y-16">
            <div class="prose-brutalist">
              <section class="space-y-6">
                <h2 class="text-3xl font-950 text-gray-900 uppercase tracking-tighter">01. INTRODUCTION</h2>
                <p class="text-sm text-gray-500 font-600 leading-relaxed">
                  Sheikh Arsalan Ullah Chishti (istay) ("istay", "we", "us") is committed to protecting the privacy of our users. This Privacy Policy explains what information we collect, why we collect it, how we use it, and your rights in relation to your data.
                </p>
              </section>

              <section class="space-y-8 pt-16 border-t-[4px] border-gray-100">
                <h2 class="text-3xl font-950 text-gray-900 uppercase tracking-tighter">02. DATA_ACQUISITION</h2>
                
                <div class="space-y-6">
                  <h3 class="text-xs font-950 text-gray-900 uppercase tracking-[0.2em] px-4 py-2 bg-gray-100 rounded-lg inline-block">HOST_INTELLIGENCE</h3>
                  <ul class="space-y-3">
                    {[
                      "Account Metadata: Name, email, phone, and business registry.",
                      "Asset Portfolio: Address, pricing, and availability matrix.",
                      "Settlement Logic: Bank details (stored securely via Razorpay).",
                      "Operational Logs: UI interactions and session telemetry."
                    ].map(item => (
                      <li class="flex items-center gap-3 text-xs font-700 text-gray-500 uppercase tracking-widest">
                        <span class="w-1.5 h-1.5 bg-mint-500 rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div class="space-y-6">
                  <h3 class="text-xs font-950 text-gray-900 uppercase tracking-[0.2em] px-4 py-2 bg-gray-100 rounded-lg inline-block">GUEST_INTELLIGENCE</h3>
                  <ul class="space-y-3">
                    {[
                      "Booking Context: Name, contact coordinates, and stay window.",
                      "Financial Tokens: Encrypted payment confirmations via Razorpay.",
                      "Identity Signals: OCR-extracted data from government IDs."
                    ].map(item => (
                      <li class="flex items-center gap-3 text-xs font-700 text-gray-500 uppercase tracking-widest">
                        <span class="w-1.5 h-1.5 bg-mint-500 rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section class="space-y-6 pt-16 border-t-[4px] border-gray-100">
                <h2 class="text-3xl font-950 text-gray-900 uppercase tracking-tighter">03. OCR_PROCESSING</h2>
                <p class="text-sm text-gray-500 font-600 leading-relaxed">
                  Our identity verification module uses Gemini-class AI to extract text from ID documents. This process is ephemeral; raw images are purged from our processing buffers immediately after text extraction is finalized.
                </p>
              </section>
            </div>
            
            <div class="p-10 bg-mint-50 rounded-[2.5rem] border-[4px] border-gray-900 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <p class="text-[10px] font-950 text-gray-900 uppercase tracking-[0.3em] mb-4">SECURITY_STATUS</p>
              <p class="text-sm text-gray-700 font-700 leading-relaxed">
                YOUR DATA IS NEVER SOLD. WE USE YOUR INFORMATION ONLY TO ENABLE THE CORE iSTAY OS FUNCTIONALITY AND ENSURE FINANCIAL COMPLIANCE.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
