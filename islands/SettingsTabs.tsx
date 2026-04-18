import { useCallback, useState } from "preact/hooks";
import type { ComponentChildren } from "preact";

interface Tab {
  id: string;
  label: string;
  icon: string;
}

interface SettingsTabsProps {
  initialTab?: string;
  tabs: Tab[];
  children: ComponentChildren;
}

export default function SettingsTabs(
  { initialTab = "general", tabs, children }: SettingsTabsProps,
) {
  const [activeTab, setActiveTab] = useState(initialTab);

  // Update URL without refresh
  const switchTab = useCallback((id: string) => {
    setActiveTab(id);
    const url = new URL(globalThis.location.href);
    url.searchParams.set("tab", id);
    globalThis.history.pushState({}, "", url);
  }, []);

  return (
    <div class="space-y-6">
      {/* Tab Navigation */}
      <div class="flex items-center gap-1 p-1 bg-gray-100 rounded-2xl w-fit overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab.id}
            onClick={() => switchTab(tab.id)}
            class={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-700 transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50/50"
            }`}
          >
            <span class="text-base">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content — renders children but only shows the active tab's content */}
      <div class="relative">
        {/* Pass activeTab via data attribute for parent-side visibility control */}
        <div id="settings-content-wrapper" data-active-tab={activeTab}>
          {children}
        </div>
      </div>
    </div>
  );
}
