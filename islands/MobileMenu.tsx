import { useState, useEffect } from "preact/hooks";

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        close();
      }
    };
    if (open) {
      globalThis.addEventListener("keydown", handleKeyDown);
    }
    return () => globalThis.removeEventListener("keydown", handleKeyDown);
  }, [open]);

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
          class="absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg animate-fade-in"
          role="dialog"
          aria-label="Mobile navigation"
        >
          <nav class="max-w-7xl mx-auto flex flex-col">
            <div class="px-4 py-4 flex flex-col gap-1">
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
              <a
                href="/login"
                class="block px-3 py-3 text-base font-600 text-istay-900 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                Login
              </a>
            </div>

            <div class="p-6 bg-gray-50 border-t border-gray-100">
              <a
                href="/register"
                class="flex items-center justify-center w-full px-6 py-3.5 rounded-xl bg-mint-500 text-istay-900 text-sm font-800 shadow-sm active:scale-[0.98] transition-all"
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
