import { Head } from "$fresh/runtime.ts";
import Header from "../../components/Header.tsx";
import Footer from "../../components/Footer.tsx";

const LAST_UPDATED = "April 11, 2026";

export default function Shipping() {
  return (
    <>
      <Head>
        <title>Shipping & Delivery Policy | istay</title>
        <meta
          name="description"
          content="istay Shipping & Delivery Policy. istay is a digital platform — there is no physical shipping. All deliverables are digital: instant booking confirmations and dashboard access."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Shipping & Delivery Policy | istay"
        />
        <meta
          property="og:description"
          content="istay delivers instantly — no physical goods are shipped. Access your booking dashboard the moment payment is confirmed."
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
              Shipping & Delivery Policy
            </h1>
            <p class="mt-3 text-sm text-gray-400">
              Last updated: {LAST_UPDATED} · Operated by Chishti Ventures Pvt.
              Ltd.
            </p>
          </div>

          <div class="prose-legal">
            <p>
              This Shipping & Delivery Policy applies to all products and services
              offered by istay, operated by Chishti Ventures Pvt. Ltd.
            </p>

            <h2>1. Digital-Only Platform — No Physical Shipping</h2>
            <p>
              istay is exclusively a <strong>digital Software-as-a-Service (SaaS)
              platform</strong>. We do not sell, manufacture, or ship any physical
              goods. There is no physical product associated with any purchase
              made on or through the istay platform.
            </p>
            <p>
              All purchases — including the one-time Host setup fee and
              per-booking commission arrangements — relate entirely to the
              provision of digital services, access rights, and software
              functionality delivered electronically over the internet.
            </p>

            <h2>2. Delivery of Platform Access (Hosts)</h2>
            <p>
              Upon successful payment of the ₹1,000 one-time setup fee, Host
              account access and the branded booking page are delivered{" "}
              <strong>instantly via digital activation</strong>, subject to a
              processing and verification window not exceeding 3 business days.
              Specifically:
            </p>
            <ul>
              <li>
                <strong>Booking Page:</strong> Your personalised, branded direct
                booking URL is generated and made live within the istay dashboard
                upon account activation.
              </li>
              <li>
                <strong>Dashboard Access:</strong> Full access to revenue
                reporting, guest management, AI concierge settings, and all
                platform features is granted immediately upon activation.
              </li>
              <li>
                <strong>Confirmation:</strong> An email confirmation containing
                your login credentials and booking page link is sent to the
                registered email address.
              </li>
            </ul>

            <h2>3. Delivery of Booking Confirmations (Guests)</h2>
            <p>
              When a Guest completes a booking through an istay-powered Host
              page, the following digital deliverables are sent{" "}
              <strong>instantly upon successful payment</strong>:
            </p>
            <ul>
              <li>
                <strong>Digital Booking Voucher:</strong> A PDF booking
                confirmation containing the reservation details, property
                address, Host contact information, and check-in instructions, sent
                to the Guest's registered email address.
              </li>
              <li>
                <strong>Host Dashboard Update:</strong> The booking appears in
                real-time in the Host's istay dashboard, triggering any
                configured automated messages (check-in instructions, welcome
                message, etc.).
              </li>
              <li>
                <strong>WhatsApp/SMS Notification:</strong> Where enabled by the
                Host and consented to by the Guest, a booking summary is delivered
                via WhatsApp or SMS.
              </li>
            </ul>

            <h2>4. Delivery Timelines Summary</h2>
            <div class="overflow-x-auto rounded-2xl border border-gray-100 my-4">
              <table class="w-full text-sm">
                <thead class="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th class="text-left px-5 py-3 text-xs font-700 text-gray-500 uppercase tracking-wider">
                      Deliverable
                    </th>
                    <th class="text-left px-5 py-3 text-xs font-700 text-gray-500 uppercase tracking-wider">
                      Method
                    </th>
                    <th class="text-left px-5 py-3 text-xs font-700 text-gray-500 uppercase tracking-wider">
                      Timeline
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
                  {[
                    ["Host Account Activation", "Email + Dashboard", "Instant–3 business days"],
                    ["Host Booking Page URL", "Email + Dashboard", "Instant upon activation"],
                    ["Guest Booking Voucher", "Email (PDF)", "Instant upon payment"],
                    ["Host Booking Notification", "Dashboard + Email", "Instant upon payment"],
                    ["WhatsApp/SMS Confirmation", "WhatsApp / SMS", "Within 2 minutes"],
                  ].map(([item, method, timeline]) => (
                    <tr key={item} class="hover:bg-gray-50 transition-colors">
                      <td class="px-5 py-3.5 text-gray-700 font-500">{item}</td>
                      <td class="px-5 py-3.5 text-gray-500">{method}</td>
                      <td class="px-5 py-3.5 text-teal-700 font-600">{timeline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2>5. Delivery Failures & Non-Receipt</h2>
            <p>
              If you have not received your booking confirmation or account
              activation email within the stated timeframe, please:
            </p>
            <ul>
              <li>Check your spam/junk or promotions folder.</li>
              <li>
                Verify the email address associated with your account is correct.
              </li>
              <li>
                Contact us at{" "}
                <a href="mailto:support@istay.space">support@istay.space</a>{" "}
                with your payment reference number and we will resend your
                deliverables promptly.
              </li>
            </ul>

            <h2>6. No Physical Address Required</h2>
            <p>
              As all deliverables are digital, no postal or physical delivery
              address is required or collected for the purpose of service
              delivery. Any address collected (e.g., from Hosts for legal entity
              verification) is used solely for compliance and billing purposes.
            </p>

            <h2>7. Contact</h2>
            <p>
              For queries regarding delivery of our digital services, email{" "}
              <a href="mailto:support@istay.space">support@istay.space</a> or
              write to Chishti Ventures Pvt. Ltd., Ghaffar Manzil, Okhla, New
              Delhi, Delhi 110025, India.
            </p>
          </div>

          <div class="mt-12 pt-6 border-t border-gray-100 flex flex-wrap gap-4 text-xs text-gray-400">
            <a href="/legal/terms" class="hover:text-teal-600 transition-colors">Terms & Conditions</a>
            <a href="/legal/privacy" class="hover:text-teal-600 transition-colors">Privacy Policy</a>
            <a href="/legal/cancellation" class="hover:text-teal-600 transition-colors">Cancellation Policy</a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
