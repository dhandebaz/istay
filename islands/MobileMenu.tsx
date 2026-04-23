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
      <button
        onClick={toggle}
        class="w-11 h-11 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-gray-900 shadow-premium active:scale-95 transition-all"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          {open ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 8h16M4 16h16" />}
        </svg>
      </button>

      {open && (
        <div class="fixed inset-0 top-[88px] z-[90] bg-white border-t border-gray-100 animate-fade-in shadow-2xl">
          <nav class="flex flex-col p-8 space-y-4">
            {links.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={close}
                class="flex items-center justify-between px-6 py-5 rounded-2xl bg-gray-50 text-sm font-bold text-gray-900 hover:bg-gray-100 transition-all"
              >
                {label}
                <span class="text-emerald-500">→</span>
              </a>
            ))}
            <div class="pt-8 grid grid-cols-2 gap-4">
              <a
                href="/login"
                class="flex items-center justify-center py-4 rounded-2xl border border-gray-100 bg-white text-sm font-bold text-gray-900 shadow-premium"
              >
                Sign In
              </a>
              <a
                href="/register"
                class="flex items-center justify-center py-4 rounded-2xl bg-gray-900 text-sm font-bold text-white shadow-premium"
              >
                Get Started
              </a>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
