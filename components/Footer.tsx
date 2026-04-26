import { InstagramIcon, WhatsAppIcon } from "../components/Icons.tsx";

const LEGAL_LINKS = [
  { href: "/legal/terms", label: "Terms of Operation" },
  { href: "/legal/privacy", label: "Privacy Security" },
  { href: "/legal/cancellation", label: "Cancellation Protocol" },
  { href: "/legal/shipping", label: "Shipping Policy" },
];

const NAV_LINKS = [
  { href: "/", label: "Residency Base" },
  { href: "/pricing", label: "Economics Portfolio" },
  { href: "/contact", label: "Concierge Support" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer class="bg-gray-900 text-white border-t border-gray-800 relative overflow-hidden">
      {/* Background Ambience */}
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[80rem] h-[20rem] bg-emerald-500/5 rounded-full blur-[120px] opacity-20 pointer-events-none" />
      
      {/* Main Footer Grid */}
      <div class="max-w-7xl mx-auto px-8 sm:px-10 pt-28 pb-20 relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-20 lg:gap-32">
          {/* Column 1 — Brand */}
          <div class="md:col-span-2 space-y-12">
            <a href="/" class="group inline-block transition-transform hover:scale-105 active:scale-95">
              <img
                src="/logo.svg"
                alt="istay logo"
                width="64"
                height="64"
                class="h-16 w-auto invert brightness-0"
              />
            </a>
            <h2 class="text-4xl font-bold text-white leading-[1.1] max-w-sm tracking-tighter">
              Redefining Direct<br />
              <span class="text-emerald-500 italic font-serif font-medium">Indian Residency.</span>
            </h2>
            
            <div class="flex gap-8">
               <a 
                  href="https://instagram.com/istay.space" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/5 text-white border border-white/10 hover:bg-white hover:text-gray-900 hover:shadow-premium-lg transition-all duration-500 group" 
                  aria-label="Instagram"
                >
                  <InstagramIcon class="w-7 h-7 group-hover:scale-110 transition-transform" />
                </a>
                <a 
                  href="https://wa.me/919873420803" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="w-14 h-14 flex items-center justify-center rounded-2xl bg-emerald-500 text-white hover:bg-emerald-400 hover:shadow-premium shadow-emerald-500/20 transition-all duration-500 group" 
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon class="w-7 h-7 group-hover:scale-110 transition-transform" />
                </a>
            </div>
          </div>

          {/* Column 2 — Navigation */}
          <div class="space-y-10">
            <h3 class="text-[11px] font-bold uppercase tracking-[0.4em] text-emerald-500 opacity-60">
              Network Nodes
            </h3>
            <ul class="space-y-6">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    class="text-[13px] font-bold text-gray-400 hover:text-emerald-500 transition-all duration-300 uppercase tracking-[0.2em] hover:tracking-[0.3em]"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Legal Links */}
          <div class="space-y-10">
            <h3 class="text-[11px] font-bold uppercase tracking-[0.4em] text-emerald-500 opacity-60">
              Compliance Protocols
            </h3>
            <ul class="space-y-6">
              {LEGAL_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    class="text-[13px] font-bold text-gray-400 hover:text-emerald-500 transition-all duration-300 uppercase tracking-[0.2em] hover:tracking-[0.3em]"
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
      <div class="border-t border-white/5 bg-black/20">
        <div class="max-w-7xl mx-auto px-8 sm:px-10 py-12">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-12">
            <div class="space-y-3">
              <p class="text-[10px] font-bold text-emerald-500/40 uppercase tracking-[0.4em] italic">
                Operational Node
              </p>
              <p class="text-[11px] text-gray-500 font-bold uppercase tracking-[0.2em] max-w-md leading-relaxed opacity-60">
                Ghaffar Manzil, Okhla, New Delhi, Delhi 110025, India.
              </p>
            </div>
            <div class="text-right space-y-2">
              <p class="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em] opacity-40">
                © {currentYear} istay.space | Precision Hospitality
              </p>
              <p class="text-[9px] font-bold text-emerald-500/30 uppercase tracking-[0.6em] italic">
                Autonomous Residency Engine
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

