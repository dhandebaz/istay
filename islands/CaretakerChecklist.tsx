import { useMemo, useState } from "preact/hooks";

interface CaretakerChecklistProps {
  bookingId: string;
  onComplete: (
    checklist: Record<string, boolean>,
    photoBase64?: string,
  ) => void;
  disabled?: boolean;
}

const CHECKLIST_ITEMS = [
  { id: "ac_lights_off", label: "AC/Lights Off" },
  { id: "windows_locked", label: "Windows Locked" },
  { id: "geyser_off", label: "Geyser Off" },
  { id: "key_returned", label: "Key Returned" },
] as const;

export default function CaretakerChecklist(
  { bookingId: _bookingId, onComplete, disabled }: CaretakerChecklistProps,
) {
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
    <div class="space-y-6">
      <div class="flex items-center gap-4 mb-2">
        <h3 class="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
          Departure Audit
        </h3>
        <div class="h-px flex-1 bg-gray-100" />
      </div>

      {/* ── Checklist Items ──────────────────────────────────── */}
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CHECKLIST_ITEMS.map((item) => (
          <button
            type="button"
            key={item.id}
            disabled={disabled}
            onClick={() => toggle(item.id)}
            class={`flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 outline-none ${
              state[item.id]
                ? "bg-emerald-50 border-emerald-100 text-emerald-700 shadow-sm"
                : "bg-white border-gray-100 text-gray-500 hover:border-emerald-200 hover:bg-emerald-50/10"
            } ${
              disabled
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer active:scale-95"
            }`}
          >
            <span class="text-sm font-bold tracking-tight">{item.label}</span>
            <div
              class={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
                state[item.id]
                  ? "bg-emerald-500 border-emerald-500 shadow-sm scale-110"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              {state[item.id] && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20 6L9 17l-5-5"
                    stroke="white"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* ── Proof of Clean Photo ────── */}
      <div class="mt-8 p-6 rounded-[2rem] bg-white border border-gray-100 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <h4 class="text-[11px] font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2">
            📸 Cleanliness Verification
          </h4>
          {photo && (
            <span class="bg-emerald-500 text-white font-bold text-[9px] px-2 py-1 rounded-full shadow-sm animate-bounce">
              VERIFIED
            </span>
          )}
        </div>

        {photo
          ? (
            <div class="relative group aspect-video rounded-2xl overflow-hidden border border-gray-100 shadow-premium-lg">
              <img
                src={`data:image/jpeg;base64,${photo}`}
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                alt="Clean proof"
              />
              <div class="absolute inset-0 bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                <button
                  type="button"
                  onClick={() => setPhoto(null)}
                  class="bg-white text-gray-900 p-3 rounded-full shadow-lg hover:bg-rose-500 hover:text-white transition-all"
                  aria-label="Remove photo"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )
          : (
            <label class="flex flex-col items-center justify-center aspect-video rounded-2xl border-2 border-dashed border-gray-100 bg-gray-50/30 hover:border-emerald-500/50 hover:bg-emerald-50/10 cursor-pointer transition-all group">
              <div class="w-14 h-14 rounded-2xl bg-white border border-gray-100 text-gray-400 group-hover:bg-emerald-500 group-hover:text-white group-hover:scale-110 flex items-center justify-center transition-all shadow-sm">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </div>
              <p class="text-[11px] font-bold text-gray-400 mt-4 uppercase tracking-widest">
                Take Verification Photo
              </p>
              <input
                type="file"
                accept="image/*"
                capture="camera"
                class="hidden"
                onChange={handlePhoto}
              />
            </label>
          )}
      </div>

      {!allChecked && !disabled && (
        <div class="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-center justify-center gap-2 animate-pulse">
          <span class="text-amber-500">⚠️</span>
          <p class="text-[11px] font-bold text-amber-700 uppercase tracking-widest">
            Please verify all items and provide a photo to finalize.
          </p>
        </div>
      )}
    </div>
  );
}
