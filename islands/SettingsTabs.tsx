import { useState } from "preact/hooks";

interface SettingsTabsProps {
  activeTab: string;
}

export default function SettingsTabs({ activeTab }: SettingsTabsProps) {
  const tabs = [
    { id: "general", label: "General", icon: "⚙️" },
    { id: "compliance", label: "Business", icon: "🏢" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    { id: "team", label: "Team", icon: "👥" },
    { id: "developers", label: "API & Developers", icon: "🔌" },
    { id: "billing", label: "Billing", icon: "💳" },
  ];

  const switchTab = (id: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("tab", id);
    window.location.href = url.toString();
  };

  return (
    <div class="px-12 py-8 bg-gray-50/50 border-b border-gray-100 overflow-x-auto no-scrollbar">
      <div class="flex items-center gap-4 min-w-max">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => switchTab(tab.id)}
            class={`flex items-center gap-3 px-6 py-3.5 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all border ${
              activeTab === tab.id
                ? "bg-gray-900 text-white border-gray-900 shadow-premium"
                : "bg-white text-gray-400 border-gray-100 hover:border-emerald-200 hover:text-emerald-600 hover:shadow-sm"
            }`}
          >
            <span class="text-lg">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
