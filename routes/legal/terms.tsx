import { Head } from "$fresh/runtime.ts";
import Header from "../../islands/Header.tsx";
import Footer from "../../components/Footer.tsx";

const LAST_UPDATED = "APRIL 11, 2026";

const SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Terms & Conditions — istay",
  url: "https://istay.space/legal/terms",
  dateModified: "2026-04-11",
  publisher: {
    "@type": "Person",
    name: "Sheikh Arsalan Ullah Chishti (istay)",
  },
});

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms & Conditions | iStay</title>
        <meta
          name="description"
          content="istay Terms & Conditions. istay is a SaaS platform. Hosts are responsible for local laws. A 5% platform fee applies per booking."
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Terms & Conditions | istay" />
        <meta
          property="og:description"
          content="Read istay's Terms & Conditions — covering platform use, host responsibilities, and our 5% fee structure."
        />
        <meta name="twitter:card" content="summary" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: SCHEMA }}
        />
      </Head>

      <Header />

      <main class="bg-white pt-32 pb-24 selection:bg-mint-400">
        {/* Page Header */}
        <section class="max-w-7xl mx-auto px-5 sm:px-8 mb-20">
          <div class="flex items-center gap-4 mb-8">
            <div class="px-3 py-1 bg-gray-900 text-mint-400 text-[10px] font-950 uppercase tracking-[0.2em] rounded-full border-[2px] border-gray-900 shadow-[3px_3px_0px_0px_#4ade80]">
              LEGAL_PROTOCOL
            </div>
            <div class="h-[2px] flex-1 bg-gray-100" />
          </div>
          
          <h1 class="text-5xl sm:text-7xl font-950 text-gray-900 tracking-tighter uppercase leading-[0.85] mb-8">
            TERMS_&_<br />
            <span class="text-mint-500">CONDITIONS.</span>
          </h1>
          <p class="text-xs text-gray-400 font-800 uppercase tracking-widest">
            LAST_REVISION: {LAST_UPDATED} // OPERATED_BY_ISTAY
          </p>
        </section>

        <div class="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* TLDR Sidebar */}
          <aside class="lg:col-span-1">
            <div class="sticky top-40 bg-mint-50 border-[4px] border-gray-900 rounded-[2.5rem] p-10 shadow-[12px_12px_0px_0px_#4ade80]">
              <h2 class="text-gray-900 font-950 text-xl uppercase tracking-tighter mb-8 flex items-center gap-3">
                <span class="text-2xl">⚡</span>
                QUICK_SUMMARY
              </h2>
              <ul class="space-y-6">
                {[
                  "iStay is a software infrastructure, not a management entity.",
                  "Hosts maintain 100% responsibility for local legal compliance.",
                  "Flat 5% protocol fee per booking — zero hidden logic.",
                  "Automated payouts via Easebuzz (95% host split)."
                ].map((item) => (
                  <li class="flex items-start gap-4">
                    <span class="w-2 h-2 rounded-full bg-gray-900 mt-2 shrink-0" />
                    <p class="text-[10px] font-950 text-gray-900 uppercase tracking-widest leading-relaxed">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main Legal Content */}
          <div class="lg:col-span-2 space-y-16">
            <div class="prose-brutalist">
              <section class="space-y-6">
                <h2 class="text-3xl font-950 text-gray-900 uppercase tracking-tighter">01. ABOUT_ISTAY</h2>
                <p class="text-sm text-gray-500 font-600 leading-relaxed">
                  istay (accessible at <a href="https://istay.space" class="text-gray-900 underline decoration-mint-400 decoration-4">https://istay.space</a>) is a Software-as-a-Service (SaaS) platform operated by <strong>Sheikh Arsalan Ullah Chishti (istay)</strong>. Our registered office is at Ghaffar Manzil, Okhla, New Delhi, Delhi 110025, India.
                </p>
              </section>

              <section class="space-y-6 pt-16 border-t-[4px] border-gray-100">
                <h2 class="text-3xl font-950 text-gray-900 uppercase tracking-tighter">02. PROTOCOL_FEES</h2>
                <p class="text-sm text-gray-500 font-600 leading-relaxed">
                  The platform utilizes a direct revenue model. For every booking processed through the iStay engine, a <strong>5% infrastructure fee</strong> is automatically deducted. The remaining 95% is routed directly to the host's registered account via our payment gateways.
                </p>
              </section>

              <section class="space-y-6 pt-16 border-t-[4px] border-gray-100">
                <h2 class="text-3xl font-950 text-gray-900 uppercase tracking-tighter">03. COMPLIANCE</h2>
                <p class="text-sm text-gray-500 font-600 leading-relaxed">
                  Hosts acknowledge total responsibility for local regulations, including but not limited to: GST filings, Police Form C reporting for foreign guests, and local property taxes. iStay provides the tools for record-keeping but does not assume legal liability for host operations.
                </p>
              </section>

              <section class="space-y-6 pt-16 border-t-[4px] border-gray-100">
                <h2 class="text-3xl font-950 text-gray-900 uppercase tracking-tighter">04. DATA_INTEGRITY</h2>
                <p class="text-sm text-gray-500 font-600 leading-relaxed">
                  We implement industry-standard encryption for all guest and host data. By using the platform, you grant us the right to process transaction logs necessary for service operation and financial auditing.
                </p>
              </section>
            </div>
            
            <div class="p-10 bg-gray-900 rounded-[2.5rem] border-[4px] border-gray-900 shadow-[12px_12px_0px_0px_#4ade80]">
              <p class="text-[10px] font-950 text-mint-400 uppercase tracking-[0.3em] mb-4">SYSTEM_SIGNAL</p>
              <p class="text-sm text-white font-700 leading-relaxed">
                CONTINUED USE OF THE iSTAY OS CONSTITUTES BINDING AGREEMENT TO THESE PROTOCOLS. WE RESERVE THE RIGHT TO TERMINATE ACCESS FOR VIOLATION OF SERVICE TERMS.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
