import { useSignal } from "@preact/signals";

interface SupplyRequestProps {
  /** The caretaker access token — sent to server for authorization */
  token: string;
  propertyName: string;
}

interface SupplyItem {
  id: string;
  emoji: string;
  label: string;
}

const SUPPLY_ITEMS: SupplyItem[] = [
  { id: "Tissues", emoji: "🧻", label: "Tissues" },
  { id: "Coffee", emoji: "☕", label: "Coffee" },
  { id: "Towels", emoji: "🛁", label: "Towels" },
  { id: "Toiletries", emoji: "🧴", label: "Toiletries" },
  { id: "Extra Blanket", emoji: "🛏️", label: "Blanket" },
  { id: "Pillows", emoji: "💤", label: "Pillows" },
  { id: "Shampoo", emoji: "🧖", label: "Shampoo" },
  { id: "Drinking Water", emoji: "💧", label: "Water" },
];

export default function SupplyRequest(
  { token, propertyName }: SupplyRequestProps,
) {
  // Track state per item: null | "loading" | "done" | "error"
  const itemStates = useSignal<Record<string, "loading" | "done" | "error">>(
    {},
  );

  async function requestSupply(itemId: string) {
    if (itemStates.value[itemId]) return; // Prevent double-tap

    // Update state to loading
    itemStates.value = { ...itemStates.value, [itemId]: "loading" };

    try {
      const res = await fetch("/api/caretaker/supply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          item: itemId,
          propertyName,
        }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        itemStates.value = { ...itemStates.value, [itemId]: "done" };
      } else {
        itemStates.value = { ...itemStates.value, [itemId]: "error" };
        // Auto-reset error after 3s
        setTimeout(() => {
          const current = { ...itemStates.value };
          delete current[itemId];
          itemStates.value = current;
        }, 3000);
      }
    } catch {
      itemStates.value = { ...itemStates.value, [itemId]: "error" };
      setTimeout(() => {
        const current = { ...itemStates.value };
        delete current[itemId];
        itemStates.value = current;
      }, 3000);
    }
  }

  return (
    <div>
      <div class="grid grid-cols-4 gap-2.5">
        {SUPPLY_ITEMS.map((item) => {
          const state = itemStates.value[item.id];
          const isDone = state === "done";
          const isLoading = state === "loading";
          const isError = state === "error";

          return (
            <button
              key={item.id}
              onClick={() => requestSupply(item.id)}
              disabled={isDone || isLoading}
              class={`
                relative flex flex-col items-center justify-center gap-1.5
                p-3 rounded-2xl border-2 transition-all duration-200
                ${
                isDone
                  ? "bg-emerald-500/10 border-emerald-500/30 scale-95"
                  : isError
                  ? "bg-rose-500/10 border-rose-500/30"
                  : isLoading
                  ? "bg-gray-900 border-gray-700 opacity-70"
                  : "bg-gray-900 border-gray-800 active:scale-95 hover:border-teal-500/40 hover:bg-gray-800"
              }
              `}
              aria-label={`Request ${item.label}`}
              aria-pressed={isDone}
            >
              {/* Icon or state indicator */}
              <span class="text-2xl leading-none relative">
                {isLoading
                  ? (
                    <span class="inline-flex w-7 h-7 items-center justify-center">
                      <span class="w-5 h-5 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
                    </span>
                  )
                  : isDone
                  ? (
                    <span class="inline-flex w-7 h-7 items-center justify-center">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        aria-hidden="true"
                      >
                        <circle
                          cx="10"
                          cy="10"
                          r="9"
                          stroke="#10b981"
                          stroke-width="1.5"
                        />
                        <path
                          d="M6 10L9 13L14 7"
                          stroke="#10b981"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                  )
                  : isError
                  ? "❌"
                  : item.emoji}
              </span>

              {/* Label */}
              <span
                class={`text-xs font-600 leading-tight text-center ${
                  isDone
                    ? "text-emerald-400"
                    : isError
                    ? "text-rose-400"
                    : "text-gray-400"
                }`}
              >
                {isDone ? "Sent!" : isError ? "Failed" : item.label}
              </span>

              {/* Loading pulse ring */}
              {isLoading && (
                <span
                  class="absolute inset-0 rounded-2xl border-2 border-teal-500/30 animate-ping"
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Done summary */}
      {Object.values(itemStates.value).some((s) => s === "done") && (
        <p class="mt-3 text-xs text-emerald-500 text-center font-500">
          ✓ Request sent to host
        </p>
      )}
    </div>
  );
}
