import { useEffect, useState } from "preact/hooks";
import { type ComponentChildren } from "preact";

interface NavItem {
  href: string;
  label: string;
  icon: ComponentChildren;
  exact?: boolean;
}

interface SidebarProps {
  currentPath: string;
}

export default function DashboardSidebar({ currentPath }: SidebarProps) {
  const [activePath, setActivePath] = useState(currentPath);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (typeof globalThis.location !== "undefined") {
      setActivePath(globalThis.location.pathname);
    }
  }, []);

  const isActive = (item: NavItem) => {
    if (item.exact) return activePath === item.href;
    return activePath === item.href || activePath.startsWith(item.href + "/");
  };

  const NAV_ITEMS: NavItem[] = [
    {
      href: "/dashboard",
      label: "OVERVIEW",
      exact: true,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      ),
    },
    {
      href: "/dashboard/properties",
      label: "PROPERTIES",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      href: "/dashboard/bookings",
      label: "BOOKINGS",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      href: "/dashboard/guests",
      label: "GUESTS",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      href: "/dashboard/billing",
      label: "WALLET",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <line x1="2" y1="10" x2="22" y2="10" />
        </svg>
      ),
    },
    {
      href: "/dashboard/settings",
      label: "SETTINGS",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        class="lg:hidden fixed top-6 left-6 z-[60] w-12 h-12 bg-gray-900 border-[3px] border-gray-900 rounded-2xl flex items-center justify-center text-mint-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
        aria-label="Toggle Menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          {mobileOpen ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <path d="M4 8h16M4 16h16" />
          )}
        </svg>
      </button>

      {/* Sidebar Container */}
      <aside
        class={`fixed inset-y-0 left-0 z-50 w-[300px] bg-white border-r-[4px] border-gray-900 transition-all duration-300 transform lg:translate-x-0 ${
          mobileOpen ? "translate-x-0 shadow-[16px_0px_0px_0px_rgba(0,0,0,0.1)]" : "-translate-x-full"
        } lg:relative flex flex-col h-screen`}
      >
        {/* Logo Section */}
        <div class="p-10 border-b-[4px] border-gray-900">
          <a href="/dashboard" class="flex items-center gap-3 group">
            <div class="w-12 h-12 bg-gray-900 border-[3px] border-gray-900 rounded-2xl flex items-center justify-center text-mint-400 shadow-[4px_4px_0px_0px_#4ade80] group-hover:rotate-[-5deg] transition-transform">
              <span class="text-2xl font-950 italic">i</span>
            </div>
            <span class="text-2xl font-950 text-gray-900 tracking-tighter uppercase">iStay_OS</span>
          </a>
        </div>

        {/* Navigation Items */}
        <nav class="flex-1 px-6 py-10 space-y-3 overflow-y-auto no-scrollbar">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item);
            return (
              <a
                key={item.href}
                href={item.href}
                class={`flex items-center gap-4 px-6 py-4 rounded-2xl border-[3px] transition-all group ${
                  active
                    ? "bg-gray-900 border-gray-900 text-white shadow-[6px_6px_0px_0px_#4ade80]"
                    : "bg-white border-transparent text-gray-400 hover:text-gray-900 hover:bg-gray-50 hover:border-gray-900"
                }`}
              >
                <span class={`text-xl transition-transform group-hover:scale-110 ${active ? "text-mint-400" : ""}`}>
                  {item.icon}
                </span>
                <span class="text-[10px] font-950 uppercase tracking-[0.3em]">{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Support Card / Footer */}
        <div class="p-8 border-t-[4px] border-gray-900 bg-gray-50">
          <div class="p-6 bg-white border-[3px] border-gray-900 rounded-[2rem] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group">
            <div class="relative z-10">
              <p class="text-[9px] font-950 text-mint-500 uppercase tracking-widest mb-2">SYSTEM_HEALTH</p>
              <div class="flex items-center gap-2 mb-4">
                <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse border-[1px] border-gray-900" />
                <p class="text-[10px] font-950 text-gray-900 uppercase">ALL_ENGINES_GO</p>
              </div>
              <a
                href="/support"
                class="block w-full py-3 bg-gray-900 text-white text-[9px] font-950 uppercase text-center rounded-xl border-[2px] border-gray-900 shadow-[4px_4px_0px_0px_#4ade80] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
              >
                Get_Support
              </a>
            </div>
          </div>
          
          <div class="mt-8 flex items-center justify-between px-2">
            <a href="/api/auth/logout" class="text-[10px] font-950 text-gray-400 uppercase tracking-widest hover:text-rose-500 transition-colors">
              Exit_Kernel
            </a>
            <span class="text-[8px] font-900 text-gray-200 uppercase">v2.4.0-BOLD</span>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          class="fixed inset-0 z-40 bg-gray-900/40 backdrop-blur-sm lg:hidden"
        />
      )}
    </>
  );
}
