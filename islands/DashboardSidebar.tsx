import { useEffect, useState } from "preact/hooks";

interface NavItem {
  href: string;
  label: string;
  icon: JSX.Element;
  exact?: boolean;
  comingSoon?: boolean;
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
    setActivePath(globalThis.location?.pathname ?? currentPath);
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
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <rect x="2" y="2" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5" />
          <rect x="10" y="2" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5" />
          <rect x="2" y="10" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5" />
          <rect x="10" y="10" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5" />
        </svg>
      ),
    },
    {
      href: "/dashboard/properties",
      label: "Properties",
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
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
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path
            d="M9 2C6.24 2 4 4.24 4 7C4 8.96 5.08 10.66 6.69 11.52V13.5C6.69 14.05 7.14 14.5 7.69 14.5H10.31C10.86 14.5 11.31 14.05 11.31 13.5V11.52C12.92 10.66 14 8.96 14 7C14 4.24 11.76 2 9 2Z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linejoin="round"
          />
          <path d="M7.5 16.5H10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
        </svg>
      ),
    },
    {
      href: "/dashboard/bookings",
      label: "Bookings",
      comingSoon: true,
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <rect x="2.5" y="3.5" width="13" height="12" rx="1.5" stroke="currentColor" stroke-width="1.5" />
          <path d="M6 2V5M12 2V5M2.5 7.5H15.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
        </svg>
      ),
    },
    {
      href: "/dashboard/guests",
      label: "Guests",
      comingSoon: true,
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <circle cx="9" cy="6" r="3" stroke="currentColor" stroke-width="1.5" />
          <path d="M3 16C3 13.2386 5.68629 11 9 11C12.3137 11 15 13.2386 15 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
        </svg>
      ),
    },
    {
      href: "/dashboard/settings",
      label: "Settings",
      comingSoon: true,
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <circle cx="9" cy="9" r="2.5" stroke="currentColor" stroke-width="1.5" />
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
    <div class="flex flex-col h-full">
      {/* Logo */}
      <div class="flex items-center gap-2.5 px-4 h-16 border-b border-gray-100/80 flex-shrink-0">
        <a href="/" class="flex items-center gap-2 group">
          <span class="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-teal-500 shadow-sm group-hover:bg-teal-600 transition-colors duration-200">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M8 1.5L1.5 7V14.5H5.5V10H10.5V14.5H14.5V7L8 1.5Z"
                fill="white"
                stroke-width="0.5"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <span class="text-lg font-800 text-gray-900 tracking-tight">
            i<span class="text-teal-500">stay</span>
          </span>
        </a>
      </div>

      {/* Navigation */}
      <nav class="flex-1 overflow-y-auto px-3 py-4 space-y-0.5" aria-label="Dashboard navigation">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item);
          return (
            <a
              key={item.href}
              href={item.comingSoon ? undefined : item.href}
              onClick={() => {
                if (!item.comingSoon) setActivePath(item.href);
                setMobileOpen(false);
              }}
              aria-current={active ? "page" : undefined}
              class={`
                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-500 transition-all duration-150
                ${item.comingSoon ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                ${
                active
                  ? "bg-teal-500 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }
              `}
            >
              <span class={active ? "text-white" : "text-gray-400"}>
                {item.icon}
              </span>
              <span class="flex-1">{item.label}</span>
              {item.comingSoon && (
                <span class="text-xs px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-400 font-500">
                  Soon
                </span>
              )}
            </a>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div class="flex-shrink-0 border-t border-gray-100 px-3 py-4 space-y-1">
        {/* Legal links */}
        <div class="px-3 pb-3">
          <p class="text-xs font-600 uppercase tracking-wider text-gray-400 mb-2">
            Legal
          </p>
          {LEGAL_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              class="block text-xs text-gray-400 hover:text-gray-600 py-0.5 transition-colors duration-150"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Version badge */}
        <div class="px-3 py-2 rounded-xl bg-gray-50 border border-gray-100">
          <div class="flex items-center justify-between">
            <span class="text-xs text-gray-400">Lifetime Plan</span>
            <span class="text-xs px-1.5 py-0.5 rounded-full bg-teal-50 text-teal-600 font-600">
              Active
            </span>
          </div>
          <p class="text-xs text-gray-400 mt-0.5">5% per booking</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        class="hidden md:flex flex-shrink-0 w-60 flex-col bg-white border-r border-gray-100 shadow-sm"
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
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              </svg>
            )
            : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 4H14M2 8H14M2 12H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
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
            <SidebarContent />
          </aside>
        </>
      )}
    </>
  );
}
