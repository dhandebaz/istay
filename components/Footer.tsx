import { InstagramIcon, WhatsAppIcon } from "../components/Icons.tsx";

const LEGAL_LINKS = [
  { href: "/legal/terms", label: "TERMS_&_CONDITIONS" },
  { href: "/legal/privacy", label: "PRIVACY_PROTOCOL" },
  { href: "/legal/cancellation", label: "CANCELLATION_LOG" },
  { href: "/legal/shipping", label: "DELIVERY_STATS" },
];

const NAV_LINKS = [
  { href: "/", label: "HOME_BASE" },
  { href: "/pricing", label: "PRICING_KERNEL" },
  { href: "/contact", label: "QUERY_CORE" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer class="bg-gray-900 text-white border-t-[8px] border-mint-500">
      {/* Main Footer Grid */}
      <div class="max-w-7xl mx-auto px-5 sm:px-8 pt-24 pb-16">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-16 lg:gap-24">
          {/* Column 1 — Brand */}
          <div class="md:col-span-2 space-y-10">
            <a href="/" class="group inline-block">
              <img
                src="/logo.svg"
                alt="istay logo"
                width="56"
                height="56"
                class="h-14 w-auto invert brightness-0"
              />
            </a>
            <h2 class="text-3xl font-950 text-white leading-[0.9] max-w-sm uppercase tracking-tighter">
              TAKING_BACK_CONTROL_OF.<br />
              <span class="text-mint-400">INDIAN_HOSPITALITY.</span>
            </h2>
            
            <div class="flex gap-6">
               <a 
                  href="https://instagram.com/istay.space" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="w-14 h-14 flex items-center justify-center rounded-2xl bg-white text-gray-900 border-[3px] border-mint-500 shadow-[6px_6px_0px_0px_#4ade80] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all" 
                  aria-label="Instagram"
                >
                  <InstagramIcon class="w-7 h-7" />
                </a>
                <a 
                  href="https://wa.me/919873420803" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="w-14 h-14 flex items-center justify-center rounded-2xl bg-mint-500 text-gray-900 border-[3px] border-white shadow-[6px_6px_0px_0px_#fff] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all" 
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon class="w-7 h-7" />
                </a>
            </div>
          </div>

          {/* Column 2 — Navigation */}
          <div>
            <h3 class="text-[10px] font-950 uppercase tracking-[0.4em] text-mint-400 mb-8">
              NAVIGATION_LINKS
            </h3>
            <ul class="space-y-5">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    class="text-xs font-950 text-gray-400 hover:text-mint-400 transition-colors duration-200 uppercase tracking-widest"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Legal Links */}
          <div>
            <h3 class="text-[10px] font-950 uppercase tracking-[0.4em] text-mint-400 mb-8">
              COMPLIANCE_PROTOCOLS
            </h3>
            <ul class="space-y-5">
              {LEGAL_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    class="text-xs font-950 text-gray-400 hover:text-mint-400 transition-colors duration-200 uppercase tracking-widest"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div class="border-t-[4px] border-white/5">
        <div class="max-w-7xl mx-auto px-5 sm:px-8 py-10">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-10">
            <div class="space-y-2">
              <p class="text-[9px] font-950 text-gray-500 uppercase tracking-[0.3em]">
                REGISTERED_OFFICE_01
              </p>
              <p class="text-[10px] text-gray-400 font-800 uppercase tracking-widest">
                GHAFFAR MANZIL, OKHLA, NEW DELHI, DELHI 110025, INDIA.
              </p>
            </div>
            <p class="text-[10px] font-950 text-gray-500 uppercase tracking-[0.4em]">
              ©_{currentYear}_ISTAY.SPACE // BUILT_FOR_THE_BOLD.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
