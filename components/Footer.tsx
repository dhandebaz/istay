import { InstagramIcon, WhatsAppIcon } from "../components/Icons.tsx";

const LEGAL_LINKS = [
  { href: "/legal/terms", label: "Terms & Conditions" },
  { href: "/legal/privacy", label: "Privacy Policy" },
  { href: "/legal/cancellation", label: "Cancellation & Refund Policy" },
  { href: "/legal/shipping", label: "Shipping & Delivery Policy" },
];

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer class="bg-gray-900 text-gray-300">
      {/* Main Footer Grid */}
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {/* Column 1 — Brand */}
          <div class="md:col-span-1 space-y-6">
            <a href="/" class="group flex items-center gap-2">
              <img
                src="/logo.svg"
                alt="istay logo"
                width="40"
                height="40"
                class="h-10 w-auto opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </a>
            <p class="text-sm text-gray-400 leading-relaxed max-w-xs">
              Empowering hosts to take back control. Direct bookings, AI
              concierge, and automated verification — all in one place.
            </p>
            <div>
              <p class="text-xs font-700 text-gray-500 uppercase tracking-widest mb-3">
                Registered Office
              </p>
              <address class="not-italic text-sm text-gray-400 leading-relaxed">
                istay
                <br />
                Ghaffar Manzil, Okhla,
                <br />
                New Delhi, Delhi 110025, India
              </address>
            </div>
          </div>

          {/* Column 2 — Navigation */}
          <div>
            <h3 class="text-xs font-700 uppercase tracking-widest text-gray-500 mb-4">
              Platform
            </h3>
            <ul class="space-y-2.5">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    class="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Legal Links */}
          <div>
            <h3 class="text-xs font-700 uppercase tracking-widest text-gray-500 mb-4">
              Legal
            </h3>
            <ul class="space-y-2.5">
              {LEGAL_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    class="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar — Branding Scrubbed */}
      <div class="border-t border-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <p class="text-xs text-gray-500 leading-relaxed max-w-xl">
              istay | Ghaffar Manzil, Okhla, New Delhi, Delhi 110025, India.
            </p>
            <div class="flex items-center gap-5">
              <div class="flex items-center gap-4 border-r border-gray-800 pr-5">
                <a 
                  href="https://instagram.com/istay.space" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="text-gray-500 hover:text-white transition-all transform hover:scale-110" 
                  aria-label="Visit istay Instagram profile"
                >
                  <InstagramIcon class="w-5 h-5" />
                </a>
                <a 
                  href="https://wa.me/919873420803" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="text-gray-500 hover:text-emerald-500 transition-all transform hover:scale-110" 
                  aria-label="Contact istay via WhatsApp"
                >
                  <WhatsAppIcon class="w-5 h-5" />
                </a>
              </div>
              <p class="text-[11px] font-500 text-gray-600 whitespace-nowrap">
                © {currentYear} istay. Direct Bookings, Zero Fees.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
