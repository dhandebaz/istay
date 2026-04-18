import { Head } from "$fresh/runtime.ts";
import Header from "../../islands/Header.tsx";
import Footer from "../../components/Footer.tsx";

const LAST_UPDATED = "April 11, 2026";

export default function Cancellation() {
  return (
    <>
      <Head>
        <title>Cancellation & Refund Policy | istay</title>
        <meta
          name="description"
          content="istay Cancellation & Refund Policy. The ₹1,000 Host setup fee is non-refundable. Guest booking refunds are subject to each Host's individual policy."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Cancellation & Refund Policy | istay"
        />
        <meta
          property="og:description"
          content="Understand istay's refund rules for Hosts (SaaS fees) and Guests (booking refunds)."
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
              Cancellation & Refund Policy
            </h1>
            <p class="mt-3 text-sm text-gray-400">
              Last updated: {LAST_UPDATED} · Operated by istay
            </p>
          </div>

          <div class="prose-legal">
            <p>
              This Cancellation & Refund Policy applies to all transactions
              processed through the istay platform, operated by Sheikh Arsalan
              Ullah Chishti (istay). Please read this policy carefully before
              making any payment.
            </p>

            {/* Section A */}
            <div class="my-8 rounded-2xl border-l-4 border-teal-400 bg-teal-50 px-6 py-5">
              <h2 class="!mt-0 !text-teal-800">
                A. Host SaaS Subscription Fees
              </h2>
              <p class="!text-teal-700">
                This section applies to fees paid by property owners and
                managers ("Hosts") for access to the istay platform.
              </p>
            </div>

            <h2>A1. One-Time Setup Fee (₹1,000)</h2>
            <p>
              The ₹1,000 one-time platform setup fee is{" "}
              <strong>strictly non-refundable</strong>{" "}
              once your account has been activated and your booking page has
              been made live. This fee covers the cost of account provisioning,
              system configuration, onboarding support, and lifetime access to
              the platform.
            </p>
            <p>
              <strong>Exception:</strong>{" "}
              If istay fails to activate your account within 3 business days of
              payment and no technical issues are attributable to the Host, you
              may request a full refund within 7 days of payment by emailing
              {" "}
              <a href="mailto:support@istay.space">support@istay.space</a>{" "}
              with your payment reference number.
            </p>

            <h2>A2. Transaction Commission (5%)</h2>
            <p>
              The 5% per-booking commission is deducted automatically at
              settlement and is non-refundable once a booking has been confirmed
              and funds have been settled. If a booking is cancelled and the
              Guest receives a refund per the Host's cancellation policy, the 5%
              commission will also be refunded to the Host's settlement account.
            </p>

            <h2>A3. Account Cancellation by Host</h2>
            <p>
              Hosts may close their account at any time by contacting
              support@istay.space. Closure of the account does not entitle the
              Host to a refund of any setup fees already paid. Any pending
              settlements for confirmed bookings will be processed as normal
              before the account is deactivated.
            </p>

            {/* Section B */}
            <div class="my-8 rounded-2xl border-l-4 border-amber-400 bg-amber-50 px-6 py-5">
              <h2 class="!mt-0 !text-amber-800">
                B. Guest Booking Refunds
              </h2>
              <p class="!text-amber-700">
                This section applies to travellers and guests who have booked
                accommodation through an istay-powered booking page.
              </p>
            </div>

            <h2>B1. Host-Determined Policies</h2>
            <p>
              <strong>
                istay is a technology platform — we are not the accommodation
                provider.
              </strong>{" "}
              Each Host independently sets their own cancellation and refund
              policy for guest bookings. The applicable policy (e.g., Flexible,
              Moderate, Strict) is displayed prominently on each booking page
              before payment is taken.
            </p>
            <p>
              Guest refund eligibility — including whether a full, partial, or
              zero refund applies — is entirely determined by the individual
              Host's announced policy at the time of booking.
            </p>

            <h2>B2. Requesting a Guest Refund</h2>
            <p>To request a refund for a guest booking, Guests should:</p>
            <ul>
              <li>
                First contact the Host directly at the email address provided in
                their booking confirmation.
              </li>
              <li>
                If the Host is unresponsive within 48 hours or a dispute arises,
                Guests may escalate to{" "}
                <a href="mailto:support@istay.space">support@istay.space</a>
                {" "}
                with their booking reference number and details of the issue.
              </li>
            </ul>
            <p>
              istay will mediate in good faith but final refund decisions for
              guest bookings rest with the Host, consistent with their declared
              policy.
            </p>

            <h2>B3. Refund Processing Timeline</h2>
            <p>
              Approved refunds are processed within{" "}
              <strong>5–7 business days</strong>{" "}
              of confirmation. Refunds are credited to the original payment
              method used at the time of booking. Processing timelines may vary
              depending on the Guest's bank.
            </p>

            <h2>C. Chargebacks & Disputes</h2>
            <p>
              Unauthorised chargebacks initiated without first attempting
              resolution through istay support may result in account suspension
              and recovery of disputed amounts plus processing fees. We
              encourage all parties to resolve disputes amicably through our
              support channel first.
            </p>

            <h2>D. Contact</h2>
            <p>
              For cancellation or refund requests, please email{" "}
              <a href="mailto:support@istay.space">support@istay.space</a>{" "}
              with your order/booking reference number. Our team responds within
              24–48 business hours.
            </p>
          </div>

          <div class="mt-12 pt-6 border-t border-gray-100 flex flex-wrap gap-4 text-xs text-gray-400">
            <a
              href="/legal/terms"
              class="hover:text-teal-600 transition-colors"
            >
              Terms & Conditions
            </a>
            <a
              href="/legal/privacy"
              class="hover:text-teal-600 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/legal/shipping"
              class="hover:text-teal-600 transition-colors"
            >
              Shipping Policy
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
