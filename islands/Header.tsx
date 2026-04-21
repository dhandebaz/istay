import { useState, useEffect } from "preact/hooks";
import MobileMenu from "./MobileMenu.tsx";
import { ArrowRightIcon, ChevronDownIcon } from "../components/Icons.tsx";

const NAV_LINKS = [
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const ASSET_VERSION = "1.0.1";

  return (
    <header
      class={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-2 border-b border-gray-100"
          : "bg-white/95 backdrop-blur-md py-4 border-b border-transparent"
      }`}
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-12 sm:h-auto">
          {/* Logo */}
          <a
            href="/"
            class="flex items-center gap-2 group transition-transform hover:scale-[1.02] active:scale-95"
            aria-label="istay — Home"
          >
            <img
              src={`/logo.svg?v=${ASSET_VERSION}`}
              alt="iStay Platform Logo"
              width="36"
              height="36"
              class="h-8 w-auto sm:h-9"
            />
          </a>

          {/* Desktop Nav */}
          <nav
            class="hidden md:flex items-center gap-2"
            role="navigation"
            aria-label="Main navigation"
          >
            {/* Language Selector */}
            <div class="relative mr-2 group">
              <select 
                class="appearance-none bg-transparent border border-gray-200 text-gray-600 text-xs font-600 rounded-full pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-mint-500 cursor-pointer hover:bg-gray-50 transition-colors"
                aria-label="Select Language"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                <ChevronDownIcon class="w-2.5 h-2.5" />
              </div>
            </div>

            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                aria-current={currentPath === href ? "page" : undefined}
                class={`px-4 py-2 text-sm font-600 rounded-xl transition-all duration-200 ${
                  currentPath === href
                    ? "text-mint-600 bg-mint-50/50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {label}
              </a>
            ))}
            <a
              href={`/login?redirect=${encodeURIComponent(currentPath)}`}
              class="px-5 py-2.5 text-sm font-800 text-mint-600 border border-mint-200 rounded-full hover:bg-mint-50 transition-all duration-200 ml-1"
            >
              Login
            </a>
          </nav>

          <div class="hidden md:block">
            <a
              href="/register"
              id="cta-start-hosting"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-mint-500 text-istay-900 text-sm font-900 shadow-sm hover:bg-mint-400 hover:shadow-lg active:scale-95 transition-all duration-300"
            >
              Start Hosting
              <ArrowRightIcon class="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Island */}
          <MobileMenu links={NAV_LINKS} />
        </div>
      </div>
    </header>
  );
}
