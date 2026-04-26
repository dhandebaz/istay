import { useState, useEffect } from "preact/hooks";
import MobileMenu from "./MobileMenu.tsx";
import { ArrowRightIcon } from "../components/Icons.tsx";

const NAV_LINKS = [
  { href: "/", label: "Discovery" },
  { href: "/pricing", label: "Economics" },
  { href: "/contact", label: "Assistance" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
      const handleScroll = () => setScrolled(window.scrollY > 15);
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <header
      class={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 py-6 ${
        scrolled 
          ? "bg-white/70 backdrop-blur-3xl shadow-premium-lg border-b border-gray-50 py-4" 
          : "bg-transparent"
      }`}
    >
      <div class="max-w-7xl mx-auto px-10 sm:px-14">
        <div class="flex items-center justify-between h-16">
          <a
            href="/"
            class="flex items-center gap-4 group transition-transform active:scale-95"
            aria-label="iStay Premium Residency"
          >
            <div class="w-12 h-12 rounded-[1.2rem] bg-gray-900 flex items-center justify-center shadow-premium-lg transition-all duration-700 group-hover:rotate-12 group-hover:bg-emerald-600">
               <img
                src="/logo.svg"
                alt="iStay Brand Identity"
                width="28"
                height="28"
                class="invert brightness-0"
              />
            </div>
            <span class={`text-3xl font-bold tracking-tighter transition-colors duration-700 ${scrolled ? "text-gray-900" : "text-gray-900 lg:text-white"}`}>iStay</span>
          </a>

          {/* Desktop Portfolio Navigation */}
          <nav
            class="hidden lg:flex items-center gap-14"
            role="navigation"
            aria-label="Portfolio navigation"
          >
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                aria-current={currentPath === href ? "page" : undefined}
                class={`text-[10px] font-bold uppercase tracking-[0.4em] transition-all duration-500 relative group ${
                  currentPath === href
                    ? "text-emerald-500"
                    : scrolled ? "text-gray-400 hover:text-emerald-600" : "text-gray-400 lg:text-white/60 hover:text-white"
                }`}
              >
                {label}
                <span class={`absolute -bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-500 transition-all duration-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] ${currentPath === href ? "opacity-100 scale-100" : "opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100"}`} />
              </a>
            ))}
          </nav>

          <div class="hidden lg:flex items-center gap-12">
            <a
              href={`/login?redirect=${encodeURIComponent(currentPath)}`}
              class={`text-[10px] font-bold uppercase tracking-[0.4em] transition-all duration-500 ${scrolled ? "text-gray-400 hover:text-emerald-600" : "text-gray-400 lg:text-white/60 hover:text-white"}`}
            >
              Credential Entry
            </a>
            <a
              href="/register"
              id="cta-initialize-onboarding"
              class="inline-flex items-center gap-4 px-10 py-4 rounded-[1.2rem] bg-gray-900 text-white text-[10px] font-bold uppercase tracking-[0.2em] shadow-premium hover:bg-emerald-600 hover:-translate-y-1 transition-all duration-500 group active:scale-95"
            >
              Initialize Onboarding
              <ArrowRightIcon class="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </a>
          </div>

          {/* Mobile Synchronized Menu */}
          <div class="lg:hidden">
            <MobileMenu links={NAV_LINKS} />
          </div>
        </div>
      </div>
    </header>
  );
}

