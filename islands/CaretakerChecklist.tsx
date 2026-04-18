import { useState, useMemo } from "preact/hooks";

interface CaretakerChecklistProps {
  bookingId: string;
  onComplete: (checklist: Record<string, boolean>, photoBase64?: string) => void;
  disabled?: boolean;
}

const CHECKLIST_ITEMS = [
  { id: "ac_lights_off", label: "AC/Lights Off" },
  { id: "windows_locked", label: "Windows Locked" },
  { id: "geyser_off", label: "Geyser Off" },
  { id: "key_returned", label: "Key Returned" },
] as const;

export default function CaretakerChecklist({ bookingId: _bookingId, onComplete, disabled }: CaretakerChecklistProps) {
  const [state, setState] = useState<Record<string, boolean>>({
    ac_lights_off: false,
    windows_locked: false,
    geyser_off: false,
    key_returned: false,
  });
  const [photo, setPhoto] = useState<string | null>(null);

  const allChecked = useMemo(() => {
    return Object.values(state).every(Boolean) && !!photo;
  }, [state, photo]);

  const toggle = (id: string) => {
    if (disabled) return;
    const newState = { ...state, [id]: !state[id] };
    setState(newState);
    onComplete(newState, photo || undefined);
  };

  const handlePhoto = (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(",")[1];
        setPhoto(base64);
        onComplete(state, base64);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div class="space-y-3">
      <h3 class="text-xs font-700 text-gray-500 uppercase tracking-widest mb-4">
        Check-out Preparation
      </h3>

      {/* ── Checklist Items ──────────────────────────────────── */}
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {CHECKLIST_ITEMS.map((item) => (
          <button
            type="button"
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

      {/* ── Proof of Clean Photo (OUTSIDE button loop) ────── */}
      <div class="mt-6 p-4 rounded-2xl bg-gray-50 border border-gray-100">
        <h4 class="text-xs font-800 text-gray-900 mb-2 uppercase flex items-center gap-2">
            📸 Proof of Clean
            {photo && <span class="text-emerald-500 font-900 text-[10px]">VERIFIED</span>}
        </h4>
        
        {photo ? (
            <div class="relative group aspect-video rounded-xl overflow-hidden border border-gray-200">
                <img src={`data:image/jpeg;base64,${photo}`} class="w-full h-full object-cover" alt="Clean proof" />
                <button 
                  type="button"
                  onClick={() => setPhoto(null)}
                  class="absolute top-2 right-2 p-2 rounded-full bg-white/90 backdrop-blur shadow-sm text-gray-900 hover:bg-white transition-all"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>
            </div>
        ) : (
            <label class="flex flex-col items-center justify-center aspect-video rounded-xl border-2 border-dashed border-gray-200 hover:border-istay-500 hover:bg-istay-50/10 cursor-pointer transition-all">
                <div class="p-3 rounded-full bg-gray-100 text-gray-400 group-hover:bg-istay-500 group-hover:text-white transition-all">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
                    </svg>
                </div>
                <p class="text-[10px] font-700 text-gray-400 mt-2">Capture Cleaning Proof</p>
                <input type="file" accept="image/*" capture="camera" class="hidden" onChange={handlePhoto} />
            </label>
        )}
      </div>
      
      {!allChecked && !disabled && (
        <p class="text-[10px] text-orange-400 font-600 text-center animate-pulse">
          ⚠️ Complete all checks and capture a photo to mark room as ready
        </p>
      )}
    </div>
  );
}
