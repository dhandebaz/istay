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
      label: "Overview",
      exact: true,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
        </svg>
      ),
    },
    {
      href: "/dashboard/properties",
      label: "Properties",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      href: "/dashboard/bookings",
      label: "Bookings",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      href: "/dashboard/guests",
      label: "Guests",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      href: "/dashboard/billing",
      label: "Billing",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <line x1="2" y1="10" x2="22" y2="10" />
        </svg>
      ),
    },
    {
      href: "/dashboard/settings",
      label: "Settings",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
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
        class="lg:hidden fixed top-6 left-6 z-[60] w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center text-emerald-400 shadow-premium active:scale-95 transition-all"
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
        class={`fixed inset-y-0 left-0 z-50 w-[280px] bg-white border-r border-gray-100 transition-all duration-500 transform lg:translate-x-0 ${
          mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        } lg:relative flex flex-col h-screen overflow-hidden`}
      >
        {/* Logo Section */}
        <div class="p-10">
          <a href="/dashboard" class="flex items-center gap-3 group">
            <div class="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center text-emerald-400 shadow-sm transition-transform group-hover:-rotate-3">
              <span class="text-xl font-bold italic">i</span>
            </div>
            <span class="text-2xl font-bold text-gray-900 tracking-tight">iStay</span>
          </a>
        </div>

        {/* Navigation Items */}
        <nav class="flex-1 px-6 py-4 space-y-2 overflow-y-auto no-scrollbar">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item);
            return (
              <a
                key={item.href}
                href={item.href}
                class={`flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all group ${
                  active
                    ? "bg-emerald-500 text-white shadow-premium shadow-emerald-500/20"
                    : "bg-transparent text-gray-400 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <span class={`transition-transform group-hover:scale-110 ${active ? "text-white" : "group-hover:text-emerald-500"}`}>
                  {item.icon}
                </span>
                <span class="text-sm font-bold tracking-tight">{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Status Card / Footer */}
        <div class="p-6 bg-gray-50/50 mt-auto">
          <div class="p-5 bg-white border border-gray-100 rounded-[1.5rem] shadow-sm relative overflow-hidden group">
            <div class="relative z-10">
              <p class="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-2">System Status</p>
              <div class="flex items-center gap-2 mb-4">
                <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <p class="text-xs font-bold text-gray-900">All systems online</p>
              </div>
              <a
                href="/support"
                class="block w-full py-2.5 bg-gray-900 text-white text-[11px] font-bold text-center rounded-xl hover:bg-gray-800 transition-all shadow-sm"
              >
                Get Support
              </a>
            </div>
          </div>
          
          <div class="mt-6 flex items-center justify-between px-2">
            <a href="/api/auth/logout" class="text-xs font-bold text-gray-400 hover:text-rose-500 transition-colors">
              Sign Out
            </a>
            <span class="text-[9px] font-bold text-gray-300 uppercase tracking-widest">v2.4.0</span>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          class="fixed inset-0 z-40 bg-gray-900/20 backdrop-blur-sm lg:hidden animate-fade-in"
        />
      )}
    </>
  );
}
