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
      document.body.style.overflow = "hidden";
      globalThis.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      globalThis.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div class="lg:hidden">
      <button
        onClick={toggle}
        class={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-premium active:scale-90 z-[110] relative ${
          open ? "bg-gray-900 text-white" : "bg-white border border-gray-50 text-gray-900"
        }`}
        aria-label={open ? "Close Synchronized Menu" : "Open Synchronized Menu"}
      >
        <div class="relative w-6 h-6">
          <span class={`absolute left-0 w-6 h-0.5 bg-current rounded-full transition-all duration-500 ${open ? "top-3 rotate-45" : "top-1.5"}`} />
          <span class={`absolute left-0 w-6 h-0.5 bg-current rounded-full transition-all duration-500 ${open ? "top-3 -rotate-45" : "top-4.5"}`} />
        </div>
      </button>

      {open && (
        <div class="fixed inset-0 z-[100] bg-white/95 backdrop-blur-3xl animate-fade-in flex flex-col overflow-hidden">
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1)_0%,transparent_50%)] pointer-events-none" />
          <div class="flex-1 flex flex-col justify-center px-12 py-32 overflow-y-auto no-scrollbar relative z-10">
            <nav class="flex flex-col space-y-6">
              {links.map(({ href, label }, i) => (
                <a
                  key={href}
                  href={href}
                  onClick={close}
                  class="flex items-center justify-between px-10 py-8 rounded-[2.5rem] bg-gray-50/50 border border-transparent hover:border-emerald-100 hover:bg-emerald-50/30 transition-all duration-500 group animate-slide-up"
                  style={`animation-delay: ${i * 100}ms`}
                >
                  <span class="text-xs font-bold text-gray-900 tracking-[0.4em] uppercase">{label}</span>
                  <div class="w-12 h-12 rounded-2xl bg-white shadow-premium flex items-center justify-center text-emerald-500 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                </a>
              ))}
            </nav>

            <div class="mt-16 space-y-6 animate-slide-up" style="animation-delay: 400ms">
              <a
                href="/login"
                onClick={close}
                class="flex items-center justify-center py-8 rounded-[2.5rem] border border-gray-100 bg-white text-[11px] font-bold uppercase tracking-[0.3em] text-gray-900 shadow-premium active:scale-95 transition-all duration-500 hover:border-emerald-100"
              >
                Credential Entry
              </a>
              <a
                href="/register"
                onClick={close}
                class="flex items-center justify-center py-8 rounded-[2.5rem] bg-gray-900 text-[11px] font-bold uppercase tracking-[0.3em] text-white shadow-premium-lg active:scale-95 transition-all duration-500 hover:bg-emerald-600"
              >
                Initialize Onboarding
              </a>
            </div>
            
            <div class="mt-24 text-center animate-fade-in" style="animation-delay: 600ms">
               <p class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.6em] opacity-40">iStay Professional Network Protocol</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

