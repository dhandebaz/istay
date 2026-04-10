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
          <div class="md:col-span-1">
            <a href="/" class="inline-flex items-center gap-2 group mb-4">
              <span class="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-teal-500 group-hover:bg-teal-400 transition-colors duration-200">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M8 1.5L1.5 7V14.5H5.5V10H10.5V14.5H14.5V7L8 1.5Z"
                    fill="white"
                    stroke="white"
                    stroke-width="0.5"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              <span class="text-xl font-800 tracking-tight text-white">
                i<span class="text-teal-400">stay</span>
              </span>
            </a>
            <p class="text-sm text-gray-400 leading-relaxed max-w-xs">
              The direct booking platform that keeps your income where it
              belongs — with you. One flat fee. Zero surprises.
            </p>
            <div class="mt-6 flex items-center gap-3">
              <a
                href="mailto:support@istay.space"
                class="text-xs text-gray-500 hover:text-teal-400 transition-colors duration-200"
              >
                support@istay.space
              </a>
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

      {/* Bottom Bar — Legal Entity */}
      <div class="border-t border-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p class="text-xs text-gray-500 leading-relaxed">
              Operated by{" "}
              <span class="text-gray-400 font-500">
                Chishti Ventures Pvt. Ltd.
              </span>{" "}
              (A part of Ziddi). Registered Address: Ghaffar Manzil, Okhla, New
              Delhi, Delhi 110025, India.
            </p>
            <p class="text-xs text-gray-600 whitespace-nowrap">
              © {currentYear} istay
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
