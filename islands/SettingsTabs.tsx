import { useState } from "preact/hooks";

interface SettingsTabsProps {
  activeTab: string;
}

export default function SettingsTabs({ activeTab }: SettingsTabsProps) {
  const tabs = [
    { id: "general", label: "GENERAL_CORE", icon: "⚙️" },
    { id: "compliance", label: "LEGAL_SYNC", icon: "⚖️" },
    { id: "notifications", label: "SIGNAL_LOCK", icon: "🔔" },
    { id: "team", label: "UNIT_SYNC", icon: "👥" },
    { id: "developers", label: "API_BRIDGE", icon: "🔌" },
    { id: "billing", label: "CAPITAL_HUB", icon: "💳" },
  ];

  const switchTab = (id: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("tab", id);
    window.location.href = url.toString();
  };

  return (
    <div class="px-12 py-8 bg-gray-50 border-b-[4px] border-gray-900 overflow-x-auto no-scrollbar">
      <div class="flex items-center gap-6 min-w-max">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => switchTab(tab.id)}
            class={`flex items-center gap-3 px-8 py-4 rounded-2xl text-[9px] font-950 uppercase tracking-[0.2em] transition-all border-[3px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none ${
              activeTab === tab.id
                ? "bg-mint-400 text-gray-900 border-gray-900"
                : "bg-white text-gray-400 border-gray-900 grayscale hover:grayscale-0"
            }`}
          >
            <span class="text-xl">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
