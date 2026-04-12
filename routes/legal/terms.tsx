import { Head } from "$fresh/runtime.ts";
import Header from "../../islands/Header.tsx";
import Footer from "../../components/Footer.tsx";

const LAST_UPDATED = "April 11, 2026";

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
        <title>Terms & Conditions | istay</title>
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

      <main class="py-16 sm:py-24">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div class="mb-10 pb-8 border-b border-gray-100">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-600 uppercase tracking-wider mb-4">
              Legal
            </div>
            <h1 class="text-3xl sm:text-4xl font-800 text-gray-900 tracking-tight">
              Terms & Conditions
            </h1>
            <p class="mt-3 text-sm text-gray-400">
              Last updated: {LAST_UPDATED} · Operated by istay
            </p>
          </div>

          {/* Content */}
          <div class="prose-legal">
            <h2>1. About istay</h2>
            <p>
              istay (accessible at{" "}
              <a href="https://istay.space">https://istay.space</a>) is a
              Software-as-a-Service (SaaS) platform operated by{" "}
              <strong>Sheikh Arsalan Ullah Chishti (istay)</strong> (hereinafter "istay",
              "we", "us", or "our"). Our registered office is at Ghaffar Manzil,
              Okhla, New Delhi, Delhi 110025, India.
            </p>
            <p>
              istay provides a technology platform that enables property hosts
              ("Hosts") to create branded direct booking channels and receive
              payments from their guests ("Guests") without relying solely on
              Online Travel Agencies (OTAs). istay is a <strong>technology
              intermediary only</strong> — we do not own, operate, or manage any
              accommodation property.
            </p>

            <h2>2. Acceptance of Terms</h2>
            <p>
              By registering for, accessing, or using the istay platform, you
              agree to be bound by these Terms & Conditions, our{" "}
              <a href="/legal/privacy">Privacy Policy</a>, our{" "}
              <a href="/legal/cancellation">Cancellation & Refund Policy</a>, and
              our{" "}
              <a href="/legal/shipping">Shipping & Delivery Policy</a>. If you do
              not agree to all of these terms, you must not use our services.
            </p>

            <h2>3. Host Obligations & Legal Compliance</h2>
            <p>
              Hosts are solely and entirely responsible for ensuring full
              compliance with all applicable local, state, and national laws,
              regulations, and ordinances, including but not limited to:
            </p>
            <ul>
              <li>
                Short-term rental regulations and licensing requirements in their
                city or municipality.
              </li>
              <li>
                Guest registration obligations under the Foreigners Act, 1946 and
                applicable state police regulations (including Form C requirements
                for foreign nationals).
              </li>
              <li>
                GST registration and proper tax collection/remittance on
                accommodation services.
              </li>
              <li>
                Health, safety, fire, and building code compliance for their
                properties.
              </li>
              <li>
                Any applicable tourism department approvals or registrations.
              </li>
            </ul>
            <p>
              istay provides tools (including OCR-based guest ID verification) as
              a courtesy feature. The use of these tools does not guarantee
              compliance with any legal requirement, and Hosts must independently
              verify compliance obligations in their jurisdiction.
            </p>
            <p>
              istay shall not be liable for any fines, penalties, legal action,
              or damages arising from a Host's failure to comply with applicable
              laws.
            </p>

            <h2>4. Platform Fee</h2>
            <p>
              istay charges the following fees for the use of its platform:
            </p>
            <ul>
              <li>
                <strong>One-Time Setup Fee: ₹1,000 (inclusive of applicable taxes).</strong>{" "}
                This fee is charged upon account activation and is
                non-refundable as described in our Cancellation & Refund Policy.
              </li>
              <li>
                <strong>Transaction Commission: 5% (five percent) of the gross
                booking amount</strong>, deducted at the time of each booking
                settlement. This fee covers payment processing, platform hosting,
                support, and AI-powered features.
              </li>
            </ul>
            <p>
              istay reserves the right to modify its fee structure with 30 days'
              notice to Hosts via email. Continued use of the platform after such
              notice constitutes acceptance of the new fees.
            </p>

            <h2>5. Payment Processing</h2>
            <p>
              All payments are processed through Razorpay Software Private
              Limited, a licensed payment aggregator. By using istay, you also
              agree to{" "}
              <a
                href="https://razorpay.com/terms/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Razorpay's Terms of Service
              </a>
              . istay does not store card or bank account details.
            </p>

            <h2>6. Intellectual Property</h2>
            <p>
              All content, trademarks, software, and designs on the istay
              platform are the exclusive property of Sheikh Arsalan Ullah Chishti (istay)
              or its licensors. You may not reproduce, distribute, or create
              derivative works without our express written consent.
            </p>

            <h2>7. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by applicable law, istay, its
              officers, directors, employees, and agents shall not be liable for
              any indirect, incidental, special, consequential, or punitive
              damages, including loss of revenue, loss of profits, loss of data,
              or property damage, arising from your use of the platform.
            </p>

            <h2>8. Governing Law & Dispute Resolution</h2>
            <p>
              These Terms are governed by the laws of India. Any disputes shall
              first be addressed through good-faith negotiation. If unresolved,
              disputes shall be subject to the exclusive jurisdiction of the
              courts in New Delhi, India.
            </p>

            <h2>9. Contact</h2>
            <p>
              For questions about these Terms, please contact us at{" "}
              <a href="mailto:support@istay.space">support@istay.space</a> or
              write to istay, Ghaffar Manzil, Okhla, New
              Delhi, Delhi 110025, India.
            </p>
          </div>

          {/* Legal links */}
          <div class="mt-12 pt-6 border-t border-gray-100 flex flex-wrap gap-4 text-xs text-gray-400">
            <a href="/legal/privacy" class="hover:text-teal-600 transition-colors">Privacy Policy</a>
            <a href="/legal/cancellation" class="hover:text-teal-600 transition-colors">Cancellation Policy</a>
            <a href="/legal/shipping" class="hover:text-teal-600 transition-colors">Shipping Policy</a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
