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
        class="w-12 h-12 bg-white border-[3px] border-gray-900 rounded-xl flex items-center justify-center text-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          {open ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 8h16M4 16h16" />}
        </svg>
      </button>

      {open && (
        <div class="fixed inset-0 top-[88px] z-[90] bg-white border-t-[4px] border-gray-900 animate-fade-in">
          <nav class="flex flex-col p-8 space-y-4">
            {links.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={close}
                class="flex items-center justify-between px-8 py-6 rounded-2xl border-[3px] border-gray-900 bg-white text-base font-950 text-gray-900 uppercase tracking-widest shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-50 transition-all"
              >
                {label}
                <span class="text-mint-500">→</span>
              </a>
            ))}
            <div class="pt-8 grid grid-cols-2 gap-4">
              <a
                href="/login"
                class="flex items-center justify-center py-5 rounded-2xl border-[3px] border-gray-900 bg-white text-[11px] font-950 text-gray-900 uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                LOGIN
              </a>
              <a
                href="/register"
                class="flex items-center justify-center py-5 rounded-2xl border-[3px] border-gray-900 bg-mint-400 text-[11px] font-950 text-gray-900 uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                SIGN_UP
              </a>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
