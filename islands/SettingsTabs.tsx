import { useState } from "preact/hooks";

interface SettingsTabsProps {
  initialTab?: string;
  tabs: { id: string; label: string; icon: string }[];
}

export default function SettingsTabs({ initialTab = "general", tabs }: SettingsTabsProps) {
  const [activeTab, setActiveTab] = useState(initialTab);

  // Helper to update URL without refresh
  const switchTab = (id: string) => {
    setActiveTab(id);
    const url = new URL(window.location.href);
    url.searchParams.set("tab", id);
    window.history.pushState({}, "", url);
  };

  return (
    <div class="space-y-6">
      {/* Tab Navigation */}
      <div class="flex items-center gap-1 p-1 bg-gray-100 rounded-2xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => switchTab(tab.id)}
            class={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-700 transition-all ${
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

      {/* Logic to show/hide content is handled by checking window.location or passing ref */}
      <div id="settings-content-wrapper">
        {tabs.map(tab => (
            <div key={tab.id} class={activeTab === tab.id ? "block" : "hidden"} id={`tab-content-${tab.id}`}>
                {/* Content will be injected via slot or simply by being in the DOM */}
            </div>
        ))}
      </div>
    </div>
  );
}
