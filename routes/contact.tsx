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
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ghaffar Manzil, Okhla",
    addressLocality: "New Delhi",
    addressRegion: "Delhi",
    postalCode: "110025",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "support@istay.space",
    availableLanguage: ["English", "Hindi"],
  },
});

export default function Contact({ url }: PageProps) {
  const isSuccess = url.searchParams.get("success") === "true";
  return (
    <>
      <SEOMeta 
        title="Contact Us | istay — Direct Booking Platform"
        description="Reach out to istay support at support@istay.space. We're here to help you with onboarding, billing, and any technical questions."
        schema={SCHEMA}
      />

      <Header />

      <main class="min-h-screen">
        {/* Page Header */}
        <section class="bg-white border-b border-gray-100 py-16">
          <div class="max-w-7xl mx-auto px-6 lg:px-8">
            <div class="max-w-2xl">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-istay-50 border border-istay-100 text-istay-800 text-xs font-600 uppercase tracking-wider mb-4">
                Support
              </div>
              <h1 class="text-4xl sm:text-5xl font-800 text-gray-900 tracking-tight leading-tight">
                We're here to help.
              </h1>
              <p class="mt-4 text-lg text-gray-500 leading-relaxed">
                Whether you're onboarding your first property or troubleshooting
                a booking — our team responds within 24–48 hours.
              </p>
            </div>
          </div>
        </section>

        {/* Content Grid */}
        <section class="py-16">
          <div class="max-w-7xl mx-auto px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
              {/* Left Column — Contact Info */}
              <div class="lg:col-span-2 space-y-8">
                {/* Email */}
                <div class="group">
                  <div class="flex items-start gap-4">
                    <div class="flex-shrink-0 w-12 h-12 rounded-2xl bg-istay-50 border border-istay-100 flex items-center justify-center group-hover:bg-istay-100 transition-colors duration-200">
                      <MailIcon class="w-5 h-5 text-istay-700" />
                    </div>
                    <div>
                      <h2 class="text-sm font-700 text-gray-500 uppercase tracking-wider mb-1">
                        Email Support
                      </h2>
                      <a
                        href="mailto:support@istay.space"
                        class="text-lg font-600 text-istay-900 hover:text-istay-800 transition-colors duration-200"
                      >
                        support@istay.space
                      </a>
                      <p class="mt-1 text-sm text-gray-400">
                        Response within 24–48 business hours
                      </p>
                    </div>
                  </div>
                </div>

                {/* Response Time */}
                <div class="rounded-2xl bg-amber-50 border border-amber-100 p-5">
                  <h3 class="text-sm font-700 text-amber-800 mb-2">
                    ⏱ Response Times
                  </h3>
                  <ul class="space-y-1.5 text-sm text-amber-700">
                    <li class="flex justify-between">
                      <span>General enquiries</span>
                      <span class="font-600">24–48 hrs</span>
                    </li>
                    <li class="flex justify-between">
                      <span>Billing issues</span>
                      <span class="font-600">12–24 hrs</span>
                    </li>
                    <li class="flex justify-between">
                      <span>Technical / bugs</span>
                      <span class="font-600">4–12 hrs</span>
                    </li>
                  </ul>
                </div>

                {/* Physical Address */}
                <div class="flex items-start gap-4">
                  <div class="flex-shrink-0 w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                    <MapPinIcon class="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <h2 class="text-sm font-700 text-gray-500 uppercase tracking-wider mb-1">
                      Registered Office
                    </h2>
                    <address class="not-italic text-sm text-gray-600 leading-relaxed">
                      istay
                      <br />
                      Ghaffar Manzil, Okhla,
                      <br />
                      New Delhi, Delhi 110025
                      <br />
                      India
                    </address>
                  </div>
                </div>
              </div>

              {/* Right Column — Contact Form */}
              <div class="lg:col-span-3">
                <div class="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 sm:p-10 relative overflow-hidden">
                  {isSuccess && (
                    <div class="absolute top-0 left-0 right-0 bg-mint-500 text-istay-900 py-3 px-6 text-sm font-800 flex items-center justify-center gap-2 animate-slide-down">
                      <CheckIcon class="w-4.5 h-4.5" strokeWidth="3" />
                      Message sent successfully! We'll reply within 24 hours.
                    </div>
                  )}
                  <h2 class={`text-xl font-700 text-gray-900 mb-6 ${isSuccess ? 'mt-6' : ''}`}>
                    Send us a message
                  </h2>

                  <form
                    id="contact-form"
                    method="POST"
                    action="/api/contact"
                    class="space-y-6"
                    noValidate
                  >
                    {/* Name + Email row */}
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Floating Label — Name */}
                      <div class="relative">
                        <input
                          type="text"
                          id="contact-name"
                          name="name"
                          placeholder=" "
                          required
                          class="peer block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 pt-5 pb-2 text-sm text-gray-900 placeholder-transparent focus:border-teal-400 focus:bg-white focus:outline-none transition-all duration-200"
                        />
                        <label
                          for="contact-name"
                          class="absolute left-4 top-2 text-xs text-gray-400 font-500 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-istay-700"
                        >
                          Full Name *
                        </label>
                      </div>

                      {/* Floating Label — Email */}
                      <div class="relative">
                        <input
                          type="email"
                          id="contact-email"
                          name="email"
                          placeholder=" "
                          required
                          class="peer block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 pt-5 pb-2 text-sm text-gray-900 placeholder-transparent focus:border-teal-400 focus:bg-white focus:outline-none transition-all duration-200"
                        />
                        <label
                          for="contact-email"
                          class="absolute left-4 top-2 text-xs text-gray-400 font-500 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-istay-700"
                        >
                          Email Address *
                        </label>
                      </div>
                    </div>

                    {/* Floating Label — Property Link */}
                    <div class="relative">
                      <input
                        type="url"
                        id="contact-property"
                        name="propertyLink"
                        placeholder=" "
                        class="peer block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 pt-5 pb-2 text-sm text-gray-900 placeholder-transparent focus:border-teal-400 focus:bg-white focus:outline-none transition-all duration-200"
                      />
                      <label
                        for="contact-property"
                        class="absolute left-4 top-2 text-xs text-gray-400 font-500 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-teal-600"
                      >
                        Property URL (e.g., airbnb.com/rooms/12345678)
                      </label>
                    </div>

                    {/* Floating Label — Message */}
                    <div class="relative">
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={5}
                        placeholder=" "
                        required
                        class="peer block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 pt-5 pb-2 text-sm text-gray-900 placeholder-transparent focus:border-teal-400 focus:bg-white focus:outline-none resize-none transition-all duration-200"
                      />
                      <label
                        for="contact-message"
                        class="absolute left-4 top-2 text-xs text-gray-400 font-500 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-teal-600"
                      >
                        Message *
                      </label>
                    </div>

                    <button
                      type="submit"
                      id="contact-submit"
                      class="w-full py-3.5 rounded-full bg-istay-900 text-white font-600 text-sm shadow-sm hover:bg-istay-800 hover:shadow-md active:scale-95 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      Send Message →
                    </button>

                    <p class="text-[10px] text-gray-400 text-center flex items-center justify-center gap-1">
                      <span class="w-1.5 h-1.5 rounded-full bg-mint-500 animate-pulse" />
                      Your data is end-to-end encrypted and used only for response.
                    </p>
                    <p class="text-xs text-gray-400 text-center">
                      By submitting, you agree to our{" "}
                      <a
                        href="/legal/privacy"
                        class="text-teal-600 hover:underline"
                      >
                        Privacy Policy
                      </a>
                      .
                    </p>
                  </form>
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
