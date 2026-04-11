import { useState } from "preact/hooks";

interface NavLink {
  href: string;
  label: string;
}

interface MobileMenuProps {
  links: NavLink[];
}

export default function MobileMenu({ links }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  return (
    <div class="md:hidden">
      {/* Hamburger Button */}
      <button
        id="mobile-menu-toggle"
        onClick={toggle}
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        class="p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
      >
        {open
          ? (
            /* X icon */
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M4 4L16 16M16 4L4 16"
                stroke="currentColor"
                stroke-width="1.75"
                stroke-linecap="round"
              />
            </svg>
          )
          : (
            /* Hamburger icon */
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M3 5H17M3 10H17M3 15H17"
                stroke="currentColor"
                stroke-width="1.75"
                stroke-linecap="round"
              />
            </svg>
          )}
      </button>

      {/* Mobile Menu Panel */}
      {open && (
        <div
          id="mobile-menu-panel"
          class="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-lg animate-fade-in"
          role="dialog"
          aria-label="Mobile navigation"
        >
          <nav class="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {links.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={close}
                class="px-4 py-3 text-base font-500 text-gray-700 rounded-xl hover:text-gray-900 hover:bg-gray-50 transition-all duration-150"
              >
                {label}
              </a>
            ))}
            <div class="pt-2 mt-1 border-t border-gray-100">
              <a
                href="/pricing"
                onClick={close}
                class="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full bg-mint-500 text-istay-900 font-800 shadow-sm hover:bg-mint-400 transition-all duration-200"
              >
                Start Hosting
              </a>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
