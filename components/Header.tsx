import MobileMenu from "../islands/MobileMenu.tsx";

const NAV_LINKS = [
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header class="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-100/80 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="/"
            class="flex items-center gap-2 group"
            aria-label="istay — Home"
          >
            <span class="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-teal-500 shadow-sm group-hover:bg-teal-600 transition-colors duration-200">
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
            <span class="text-xl font-800 tracking-tight text-gray-900">
              i<span class="text-teal-500">stay</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav class="hidden md:flex items-center gap-1" role="navigation" aria-label="Main navigation">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                class="px-4 py-2 text-sm font-500 text-gray-600 rounded-xl hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div class="hidden md:block">
            <a
              href="/pricing"
              id="cta-start-hosting"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-teal-500 text-white text-sm font-600 shadow-sm hover:bg-teal-600 hover:shadow-md active:scale-95 transition-all duration-200"
            >
              Start Hosting
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M1 7H13M7 1L13 7L7 13"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
          </div>

          {/* Mobile Menu Island */}
          <MobileMenu links={NAV_LINKS} />
        </div>
      </div>
    </header>
  );
}
