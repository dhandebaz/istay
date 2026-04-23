import { useState, useEffect } from "preact/hooks";
import MobileMenu from "./MobileMenu.tsx";
import { ArrowRightIcon } from "../components/Icons.tsx";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
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
      class={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 py-4 ${
        scrolled ? "bg-white/80 backdrop-blur-md shadow-premium border-b border-gray-100" : "bg-transparent"
      }`}
    >
      <div class="max-w-7xl mx-auto px-6 sm:px-10">
        <div class="flex items-center justify-between h-14">
          <a
            href="/"
            class="flex items-center gap-2 group transition-opacity hover:opacity-80"
            aria-label="iStay — Home"
          >
            <img
              src="/logo.svg"
              alt="iStay Platform Logo"
              width="40"
              height="40"
              class="h-8 w-auto"
            />
            <span class="text-xl font-bold text-gray-900 tracking-tight">iStay</span>
          </a>

          {/* Desktop Nav */}
          <nav
            class="hidden md:flex items-center gap-8"
            role="navigation"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                aria-current={currentPath === href ? "page" : undefined}
                class={`text-sm font-bold transition-all duration-200 ${
                  currentPath === href
                    ? "text-emerald-600"
                    : "text-gray-400 hover:text-gray-900"
                }`}
              >
                {label}
              </a>
            ))}
          </nav>

          <div class="hidden md:flex items-center gap-8">
            <a
              href={`/login?redirect=${encodeURIComponent(currentPath)}`}
              class="text-sm font-bold text-gray-900 hover:text-emerald-600 transition-colors"
            >
              Sign In
            </a>
            <a
              href="/register"
              id="cta-start-hosting"
              class="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-gray-900 text-white text-sm font-bold shadow-premium hover:bg-emerald-500 hover:shadow-premium-hover transition-all duration-300"
            >
              Get Started
              <ArrowRightIcon class="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Island */}
          <div class="md:hidden">
            <MobileMenu links={NAV_LINKS} />
          </div>
        </div>
      </div>
    </header>
  );
}
