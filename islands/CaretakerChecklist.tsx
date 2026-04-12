import { useState, useMemo } from "preact/hooks";

interface CaretakerChecklistProps {
  bookingId: string;
  onComplete: (checklist: Record<string, boolean>) => void;
  disabled?: boolean;
}

const CHECKLIST_ITEMS = [
  { id: "ac_lights_off", label: "AC/Lights Off" },
  { id: "windows_locked", label: "Windows Locked" },
  { id: "geyser_off", label: "Geyser Off" },
  { id: "key_returned", label: "Key Returned" },
] as const;

export default function CaretakerChecklist({ bookingId, onComplete, disabled }: CaretakerChecklistProps) {
  const [state, setState] = useState<Record<string, boolean>>({
    ac_lights_off: false,
    windows_locked: false,
    geyser_off: false,
    key_returned: false,
  });

  const allChecked = useMemo(() => {
    return Object.values(state).every(Boolean);
  }, [state]);

  const toggle = (id: string) => {
    if (disabled) return;
    const newState = { ...state, [id]: !state[id] };
    setState(newState);
    onComplete(newState);
  };

  return (
    <div class="space-y-3">
      <h3 class="text-xs font-700 text-gray-500 uppercase tracking-widest mb-4">
        Check-out Preparation
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {CHECKLIST_ITEMS.map((item) => (
          <button
            key={item.id}
            disabled={disabled}
            onClick={() => toggle(item.id)}
            class={`flex items-center justify-between p-3.5 rounded-xl border-2 transition-all duration-200 outline-none ${
              state[item.id]
                ? "bg-teal-500/10 border-teal-500/30 text-teal-400 font-700 shadow-[0_0_15px_rgba(20,184,166,0.1)]"
                : "bg-gray-900 border-gray-800 text-gray-500 hover:border-gray-700"
            } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer active:scale-95"}`}
          >
            <span class="text-sm">{item.label}</span>
            <div class={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
              state[item.id] ? "bg-teal-500 border-teal-500" : "border-gray-700"
            }`}>
              {state[item.id] && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              )}
            </div>
          </button>
        ))}
      </div>
      
      {!allChecked && !disabled && (
        <p class="text-[10px] text-orange-400 font-600 text-center animate-pulse">
          ⚠️ Complete all checks to mark room as ready
        </p>
      )}
    </div>
  );
}
