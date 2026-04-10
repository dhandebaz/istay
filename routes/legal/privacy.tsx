import { Head } from "$fresh/runtime.ts";
import Header from "../../components/Header.tsx";
import Footer from "../../components/Footer.tsx";

const LAST_UPDATED = "April 11, 2026";

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | istay</title>
        <meta
          name="description"
          content="istay's Privacy Policy. Learn how we collect, use, and protect your data — including our secure OCR-based guest ID processing. We never sell your data."
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Privacy Policy | istay" />
        <meta
          property="og:description"
          content="istay takes privacy seriously. Read our policy on data collection, OCR ID processing, and our zero-data-selling commitment."
        />
        <meta name="twitter:card" content="summary" />
      </Head>

      <Header />

      <main class="py-16 sm:py-24">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="mb-10 pb-8 border-b border-gray-100">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-600 uppercase tracking-wider mb-4">
              Legal
            </div>
            <h1 class="text-3xl sm:text-4xl font-800 text-gray-900 tracking-tight">
              Privacy Policy
            </h1>
            <p class="mt-3 text-sm text-gray-400">
              Last updated: {LAST_UPDATED} · Operated by istay
            </p>
          </div>

          <div class="prose-legal">
            <h2>1. Introduction</h2>
            <p>
              Sheikh Arsalan Ullah Chishti (istay) ("istay", "we", "us") is committed to
              protecting the privacy of our users. This Privacy Policy explains
              what information we collect, why we collect it, how we use it, and
              your rights in relation to your data. This policy applies to Hosts
              (property owners using our SaaS platform) and Guests (individuals
              making bookings through a Host's istay-powered booking page).
            </p>

            <h2>2. Information We Collect</h2>
            <p>
              <strong>From Hosts:</strong>
            </p>
            <ul>
              <li>
                Account information: name, email address, phone number, and
                business details necessary for onboarding.
              </li>
              <li>
                Property information: address, room/unit details, pricing, and
                availability.
              </li>
              <li>
                Payment information: bank account details for settlement (stored
                securely by Razorpay; we do not store full account numbers).
              </li>
              <li>
                Usage data: pages visited, features used, session duration, and
                device/browser information.
              </li>
            </ul>
            <p>
              <strong>From Guests:</strong>
            </p>
            <ul>
              <li>
                Booking information: name, email, phone number, check-in/check-out
                dates, and number of guests.
              </li>
              <li>
                Payment information: processed securely by Razorpay. istay
                receives only a tokenized transaction confirmation.
              </li>
              <li>
                Government-issued identity documents (where required by law):
                collected via our OCR-powered ID verification feature (see
                Section 4).
              </li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <ul>
              <li>To provide, operate, and improve the istay platform.</li>
              <li>
                To process bookings and facilitate payments through Razorpay.
              </li>
              <li>
                To send transactional communications (booking confirmations,
                receipts, check-in instructions).
              </li>
              <li>
                To comply with legal obligations, including guest registration
                laws applicable to Hosts.
              </li>
              <li>
                To detect, prevent, and investigate fraud or security incidents.
              </li>
              <li>
                To send service updates and marketing communications (Hosts may
                opt out at any time).
              </li>
            </ul>

            <h2>4. OCR Guest ID Verification & Secure Storage</h2>
            <p>
              istay offers an optional Optical Character Recognition (OCR)
              feature that allows Hosts to scan and digitally record
              government-issued photo IDs of their guests (e.g., Aadhaar,
              Passport, Driving Licence) at time of check-in, as may be required
              by applicable Indian laws and regulations.
            </p>
            <p>
              <strong>Security & Data Storage:</strong>
            </p>
            <ul>
              <li>
                <strong>Encrypted Transmission:</strong> ID images are transmitted over TLS 1.3-encrypted connections.
              </li>
              <li>
                <strong>Ephemeral Processing:</strong> OCR processing is performed in-memory and the raw image is not
                permanently stored on istay servers after extraction is complete.
              </li>
              <li>
                <strong>Secure ID Storage:</strong> Extracted data (name, ID number, date of birth) is stored in
                encrypted form within the Host's account. This data is processed by our secure AI engine locally to verify identity and is never shared with third-party tracking services.
              </li>
              <li>
                <strong>Privacy-First AI:</strong> We do not use guest ID data for profiling, advertising, or any
                purpose beyond the specific check-in compliance purpose.
              </li>
              <li>
                Hosts are responsible for obtaining guest consent before scanning
                any identity document.
              </li>
            </ul>

            <h2>5. Data Sharing</h2>
            <p>
              <strong>
                istay does not sell, rent, or trade your personal data to any
                third party, ever.
              </strong>{" "}
              We may share data with:
            </p>
            <ul>
              <li>
                <strong>Razorpay:</strong> for payment processing. Their privacy
                policy governs such data.
              </li>
              <li>
                <strong>Infrastructure providers</strong> (cloud hosting, CDN)
                under strict data processing agreements.
              </li>
              <li>
                <strong>Law enforcement or regulators</strong> where we are
                legally compelled to do so.
              </li>
              <li>
                <strong>Between Hosts and Guests</strong> only to the extent
                necessary to fulfil a booking (e.g., Host receives Guest's name
                and contact).
              </li>
            </ul>

            <h2>6. Data Retention</h2>
            <p>
              We retain Host account data for as long as the account is active
              and for 7 years after closure for tax and audit compliance purposes.
              Guest booking data is retained for 5 years. Guest ID records are
              retained for as long as legally required (minimum 1 year as per
              applicable police regulations) and may be deleted upon verified
              legal request.
            </p>

            <h2>7. Your Rights</h2>
            <p>Under applicable Indian data protection laws, you have the right to:</p>
            <ul>
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate data.</li>
              <li>Request erasure of data (subject to legal retention obligations).</li>
              <li>Object to certain processing activities.</li>
              <li>Lodge a complaint with the relevant data protection authority.</li>
            </ul>
            <p>
              To exercise these rights, email us at{" "}
              <a href="mailto:support@istay.space">support@istay.space</a> with
              the subject line "Privacy Request".
            </p>

            <h2>8. Cookies</h2>
            <p>
              istay uses essential cookies for authentication and session
              management, and analytics cookies (first-party only) to understand
              platform usage. We do not use third-party advertising cookies.
            </p>

            <h2>9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Significant
              changes will be notified via email or a prominent notice on our
              website. Continued use of the platform after notice constitutes
              acceptance of the updated policy.
            </p>

            <h2>10. Contact</h2>
            <p>
              For privacy-related queries, contact our Data Protection Officer at{" "}
              <a href="mailto:support@istay.space">support@istay.space</a> or
              write to istay, Ghaffar Manzil, Okhla, New
              Delhi, Delhi 110025, India.
            </p>
          </div>

          <div class="mt-12 pt-6 border-t border-gray-100 flex flex-wrap gap-4 text-xs text-gray-400">
            <a href="/legal/terms" class="hover:text-teal-600 transition-colors">Terms & Conditions</a>
            <a href="/legal/cancellation" class="hover:text-teal-600 transition-colors">Cancellation Policy</a>
            <a href="/legal/shipping" class="hover:text-teal-600 transition-colors">Shipping Policy</a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
