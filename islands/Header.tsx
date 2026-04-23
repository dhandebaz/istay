import { useState, useEffect } from "preact/hooks";
import MobileMenu from "./MobileMenu.tsx";
import { ArrowRightIcon } from "../components/Icons.tsx";

const NAV_LINKS = [
  { href: "/", label: "HOME" },
  { href: "/pricing", label: "PRICING" },
  { href: "/contact", label: "CONTACT" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
      const handleScroll = () => setScrolled(window.scrollY > 20);
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <header
      class={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 bg-white py-5 border-b-[4px] border-gray-900 ${scrolled ? "shadow-[0px_6px_0px_0px_rgba(0,0,0,0.05)]" : ""}`}
    >
      <div class="max-w-7xl mx-auto px-5 sm:px-8">
        <div class="flex items-center justify-between h-14">
          <a
            href="/"
            class="flex items-center gap-2 group transition-transform hover:scale-[1.05] active:scale-95"
            aria-label="istay — Home"
          >
            <img
              src="/logo.svg"
              alt="iStay Platform Logo"
              width="50"
              height="50"
              class="h-12 w-auto"
            />
          </a>

          {/* Desktop Nav */}
          <nav
            class="hidden md:flex items-center gap-6"
            role="navigation"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                aria-current={currentPath === href ? "page" : undefined}
                class={`px-5 py-2 text-[10px] font-950 uppercase tracking-[0.2em] rounded-xl transition-all duration-200 border-[3px] ${
                  currentPath === href
                    ? "text-gray-900 bg-mint-400 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    : "text-gray-400 border-transparent hover:text-gray-900 hover:border-gray-100"
                }`}
              >
                {label}
              </a>
            ))}
          </nav>

          <div class="hidden md:flex items-center gap-6">
            <a
              href={`/login?redirect=${encodeURIComponent(currentPath)}`}
              class="px-6 py-2.5 text-[10px] font-950 text-gray-900 border-[3px] border-gray-900 rounded-xl hover:bg-gray-50 transition-all duration-200 uppercase tracking-[0.2em] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
            >
              LOGIN
            </a>
            <a
              href="/register"
              id="cta-start-hosting"
              class="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gray-900 text-mint-400 text-[10px] font-950 uppercase tracking-[0.2em] shadow-[6px_6px_0px_0px_#4ade80] hover:bg-mint-400 hover:text-gray-900 border-[3px] border-mint-400 transition-all duration-300 active:shadow-none active:translate-x-[3px] active:translate-y-[3px]"
            >
              START_FREE
              <ArrowRightIcon class="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Island */}
          <MobileMenu links={NAV_LINKS} />
        </div>
      </div>
    </header>
  );
}
