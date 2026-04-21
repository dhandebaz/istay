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

const LEGAL_LINKS = [
  { href: "/legal/terms", label: "Terms & Conditions" },
  { href: "/legal/privacy", label: "Privacy Policy" },
];

export default function DashboardSidebar({ currentPath }: SidebarProps) {
  const [activePath, setActivePath] = useState(currentPath);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Sync active state with client-side navigation
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
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="2"
            y="2"
            width="6"
            height="6"
            rx="1.5"
            stroke="currentColor"
            stroke-width="1.5"
          />
          <rect
            x="10"
            y="2"
            width="6"
            height="6"
            rx="1.5"
            stroke="currentColor"
            stroke-width="1.5"
          />
          <rect
            x="2"
            y="10"
            width="6"
            height="6"
            rx="1.5"
            stroke="currentColor"
            stroke-width="1.5"
          />
          <rect
            x="10"
            y="10"
            width="6"
            height="6"
            rx="1.5"
            stroke="currentColor"
            stroke-width="1.5"
          />
        </svg>
      ),
    },
    {
      href: "/dashboard/properties",
      label: "Properties",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M9 2L2 7.5V16H7V11H11V16H16V7.5L9 2Z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linejoin="round"
          />
        </svg>
      ),
    },
    {
      href: "/dashboard/knowledge",
      label: "AI Knowledge",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M9 2C6.24 2 4 4.24 4 7C4 8.96 5.08 10.66 6.69 11.52V13.5C6.69 14.05 7.14 14.5 7.69 14.5H10.31C10.86 14.5 11.31 14.05 11.31 13.5V11.52C12.92 10.66 14 8.96 14 7C14 4.24 11.76 2 9 2Z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linejoin="round"
          />
          <path
            d="M7.5 16.5H10.5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      ),
    },
    {
      href: "/dashboard/bookings",
      label: "Bookings",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="2.5"
            y="3.5"
            width="13"
            height="12"
            rx="1.5"
            stroke="currentColor"
            stroke-width="1.5"
          />
          <path
            d="M6 2V5M12 2V5M2.5 7.5H15.5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      ),
    },
    {
      href: "/dashboard/guests",
      label: "Guests",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="9"
            cy="6"
            r="3"
            stroke="currentColor"
            stroke-width="1.5"
          />
          <path
            d="M3 16C3 13.2386 5.68629 11 9 11C12.3137 11 15 13.2386 15 16"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      ),
    },
    {
      href: "/dashboard/billing",
      label: "Billing & Wallet",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="2"
            y="4"
            width="14"
            height="10"
            rx="2"
            stroke="currentColor"
            stroke-width="1.5"
          />
          <path
            d="M2 7H16"
            stroke="currentColor"
            stroke-width="1.5"
          />
          <path
            d="M12 10.5H13"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      ),
    },
    {
      href: "/dashboard/settings",
      label: "Settings",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="9"
            cy="9"
            r="2.5"
            stroke="currentColor"
            stroke-width="1.5"
          />
          <path
            d="M9 1.5V3M9 15V16.5M16.5 9H15M3 9H1.5M14.364 3.636L13.243 4.757M4.757 13.243L3.636 14.364M14.364 14.364L13.243 13.243M4.757 4.757L3.636 3.636"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      ),
    },
  ];

  const SidebarContent = () => (
    <div class="flex flex-col h-full bg-slate-900/95 backdrop-blur-xl">
      {/* Logo */}
      <div class="flex items-center px-6 h-20 border-b border-white/5 flex-shrink-0">
        <a
          href="/"
          class="flex items-center gap-2 group transition-transform hover:scale-[1.02] active:scale-95"
        >
          <img
            src="/logo.svg"
            alt="istay logo"
            class="h-8 w-auto brightness-0 invert"
          />
        </a>
      </div>

      {/* Navigation */}
      <nav
        class="flex-1 overflow-y-auto px-4 py-6 space-y-1"
        aria-label="Dashboard navigation"
      >
        {NAV_ITEMS.map((item) => {
          const active = isActive(item);
          return (
            <a
              key={item.href}
              href={item.href}
              onClick={() => {
                setActivePath(item.href);
                setMobileOpen(false);
              }}
              aria-current={active ? "page" : undefined}
              class={`
                flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-600 transition-all duration-200
                cursor-pointer border border-transparent
                ${
                active
                  ? "bg-gradient-to-r from-teal-500/20 to-teal-600/10 text-teal-400 border-teal-500/20 shadow-[0_0_20px_rgba(20,184,166,0.1)]"
                  : "text-gray-400 hover:text-gray-100 hover:bg-white/5 active:bg-white/10"
              }
              `}
            >
              <span
                class={active
                  ? "text-teal-400"
                  : "text-gray-500 transition-colors group-hover:text-gray-300"}
              >
                {item.icon}
              </span>
              <span class="flex-1">{item.label}</span>
              {active && (
                <div class="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_10px_rgba(20,184,166,0.8)]" />
              )}
            </a>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div class="flex-shrink-0 border-t border-white/5 px-4 py-6 space-y-4 bg-black/20">
        {/* Legal links */}
        <div class="px-4">
          <p class="text-[10px] font-800 uppercase tracking-widest text-gray-500 mb-3 ml-1">
            Global Compliance
          </p>
          <div class="flex flex-wrap gap-x-4 gap-y-1">
            {LEGAL_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                class="text-[11px] text-gray-500 hover:text-teal-400 transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Account state badge */}
        <div class="px-4 mx-2 py-3 rounded-2xl bg-teal-500/5 border border-teal-500/10 group cursor-default">
          <div class="flex items-center justify-between mb-1">
            <span class="text-xs text-gray-500 font-500">Service Status</span>
            <span class="flex h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
          </div>
          <p class="text-[11px] font-600 text-gray-400">
            All Systems Operational
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        class="hidden md:flex flex-shrink-0 w-64 flex-col bg-slate-900 border-r border-white/5 shadow-2xl z-30"
        aria-label="Sidebar"
      >
        <SidebarContent />
      </aside>

      {/* Mobile: Hamburger button */}
      <div class="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileOpen((v) => !v)}
          class="flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-gray-200 shadow-sm text-gray-600"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen
            ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 3L13 13M13 3L3 13"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            )
            : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 4H14M2 8H14M2 12H14"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            class="md:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          {/* Drawer */}
          <aside
            class="md:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl flex flex-col"
            aria-label="Mobile sidebar"
          >
            {/* Logo Mobile */}
            <div class="flex items-center px-6 h-20 border-b border-gray-100 flex-shrink-0">
              <a href="/" class="flex items-center gap-2">
                <img src="/logo.svg" alt="istay logo" class="h-8 w-auto" />
              </a>
            </div>

            {/* Navigation Mobile */}
            <nav class="flex-1 overflow-y-auto px-4 py-6 space-y-1">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item);
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      setActivePath(item.href);
                      setMobileOpen(false);
                    }}
                    class={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-600 transition-all ${
                      active ? "bg-teal-50 text-teal-600" : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </nav>
          </aside>
        </>
      )}
    </>
  );
}
