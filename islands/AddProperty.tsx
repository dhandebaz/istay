import { useSignal } from "@preact/signals";
import type { ScrapedListing } from "../utils/types.ts";

// ── Step State Machine ────────────────────────────────────────
type Step = "idle" | "loading" | "preview" | "saving" | "success" | "error";

// ── Skeleton Loader ───────────────────────────────────────────
function SkeletonPulse({ class: cls }: { class: string }) {
  return (
    <div
      class={`animate-pulse bg-gray-200 rounded-xl ${cls}`}
      aria-hidden="true"
    />
  );
}

function ListingSkeleton() {
  return (
    <div class="space-y-4 p-5">
      {/* Image skeleton */}
      <SkeletonPulse class="h-40 w-full rounded-2xl" />
      {/* Title skeleton */}
      <div class="space-y-2">
        <SkeletonPulse class="h-5 w-3/4" />
        <SkeletonPulse class="h-4 w-full" />
        <SkeletonPulse class="h-4 w-5/6" />
      </div>
      {/* Price skeleton */}
      <div class="flex items-center gap-3 pt-2">
        <SkeletonPulse class="h-8 w-24" />
        <SkeletonPulse class="h-8 w-20" />
      </div>
    </div>
  );
}

// ── Loading State ─────────────────────────────────────────────
function LoadingState() {
  return (
    <div class="flex flex-col h-full">
      {/* Progress animation */}
      <div class="px-5 pt-5 pb-3">
        <div class="flex items-center gap-2 mb-3">
          <div class="w-2 h-2 rounded-full bg-teal-500 animate-bounce [animation-delay:0ms]" />
          <div class="w-2 h-2 rounded-full bg-teal-400 animate-bounce [animation-delay:150ms]" />
          <div class="w-2 h-2 rounded-full bg-teal-300 animate-bounce [animation-delay:300ms]" />
          <span class="text-xs font-500 text-gray-400 ml-1">
            Fetching listing data...
          </span>
        </div>
        {/* Fake progress bar */}
        <div class="h-1 bg-gray-100 rounded-full overflow-hidden">
          <div class="h-full bg-gradient-to-r from-teal-400 to-emerald-500 rounded-full animate-[progressBar_2s_ease-in-out_infinite]" />
        </div>
      </div>
      <ListingSkeleton />
    </div>
  );
}

// ── Plus / Idle State ─────────────────────────────────────────
interface IdleStateProps {
  url: string;
  onUrlChange: (v: string) => void;
  onFetch: () => void;
  isLoading: boolean;
}

function IdleState({ url, onUrlChange, onFetch, isLoading }: IdleStateProps) {
  return (
    <div class="flex flex-col items-center justify-center h-full px-6 py-8 text-center gap-5">
      {/* Plus icon */}
      <div class="w-16 h-16 rounded-2xl bg-teal-50 border-2 border-dashed border-teal-300 flex items-center justify-center group-hover:border-teal-400 transition-colors duration-300">
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M14 6V22M6 14H22"
            stroke="#14b8a6"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </div>

      <div>
        <h3 class="text-base font-700 text-gray-900 mb-1">
          Add New Property
        </h3>
        <p class="text-xs text-gray-400 leading-relaxed">
          Paste your Airbnb listing link below and we'll import everything automatically.
        </p>
      </div>

      {/* URL Input */}
      <div class="w-full space-y-2.5">
        <input
          id="airbnb-url-input"
          type="url"
          value={url}
          onInput={(e) => onUrlChange((e.target as HTMLInputElement).value)}
          onKeyDown={(e) => e.key === "Enter" && url && onFetch()}
          placeholder="https://airbnb.com/rooms/..."
          class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 placeholder-gray-300 focus:border-teal-400 focus:bg-white focus:outline-none transition-all duration-200"
          aria-label="Airbnb listing URL"
          disabled={isLoading}
        />
        <button
          id="fetch-listing-btn"
          onClick={onFetch}
          disabled={!url.trim() || isLoading}
          class="w-full py-3 rounded-xl bg-teal-500 text-white text-sm font-600 shadow-sm hover:bg-teal-600 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Fetching..." : "✨ Fetch from Airbnb"}
        </button>
      </div>
    </div>
  );
}

// ── Preview State ─────────────────────────────────────────────
interface PreviewStateProps {
  scraped: ScrapedListing;
  editName: string;
  editDesc: string;
  editPrice: string;
  onNameChange: (v: string) => void;
  onDescChange: (v: string) => void;
  onPriceChange: (v: string) => void;
  onSave: () => void;
  onReset: () => void;
  isSaving: boolean;
}

function PreviewState({
  scraped,
  editName,
  editDesc,
  editPrice,
  onNameChange,
  onDescChange,
  onPriceChange,
  onSave,
  onReset,
  isSaving,
}: PreviewStateProps) {
  return (
    <div class="flex flex-col h-full overflow-y-auto">
      {/* Scraped Image */}
      {scraped.imageUrl && (
        <div class="relative h-44 flex-shrink-0 overflow-hidden rounded-t-2xl">
          <img
            src={scraped.imageUrl}
            alt={editName}
            class="w-full h-full object-cover"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <div class="absolute bottom-3 left-3">
            <span class="text-xs px-2 py-1 rounded-full bg-white/90 text-teal-700 font-700 shadow-sm">
              ✓ Imported from Airbnb
            </span>
          </div>
        </div>
      )}

      {/* Editable Fields */}
      <div class="flex-1 p-5 space-y-4">
        {/* Name */}
        <div>
          <label
            for="prop-name"
            class="block text-xs font-600 text-gray-500 mb-1"
          >
            Property Name
          </label>
          <input
            id="prop-name"
            type="text"
            value={editName}
            onInput={(e) => onNameChange((e.target as HTMLInputElement).value)}
            class="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm font-600 text-gray-900 focus:border-teal-400 focus:bg-white focus:outline-none transition-all"
          />
        </div>

        {/* Description */}
        <div>
          <label
            for="prop-desc"
            class="block text-xs font-600 text-gray-500 mb-1"
          >
            Description
          </label>
          <textarea
            id="prop-desc"
            rows={3}
            value={editDesc}
            onInput={(e) => onDescChange((e.target as HTMLTextAreaElement).value)}
            class="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-xs text-gray-600 leading-relaxed resize-none focus:border-teal-400 focus:bg-white focus:outline-none transition-all"
          />
        </div>

        {/* Nightly Rate */}
        <div>
          <label
            for="prop-price"
            class="block text-xs font-600 text-gray-500 mb-1"
          >
            Base Nightly Rate (₹)
          </label>
          <div class="relative">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-600 text-gray-400">
              ₹
            </span>
            <input
              id="prop-price"
              type="number"
              min="0"
              value={editPrice}
              onInput={(e) =>
                onPriceChange((e.target as HTMLInputElement).value)}
              class="w-full pl-7 pr-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm font-700 text-teal-600 focus:border-teal-400 focus:bg-white focus:outline-none transition-all"
              placeholder="2000"
            />
          </div>
        </div>

        {/* Actions */}
        <div class="flex gap-2.5 pt-1">
          <button
            onClick={onReset}
            disabled={isSaving}
            class="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-500 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            ← Try another
          </button>
          <button
            id="approve-save-btn"
            onClick={onSave}
            disabled={isSaving || !editName.trim() || !editDesc.trim()}
            class="flex-1 py-2.5 rounded-xl bg-teal-500 text-white text-sm font-700 shadow-sm hover:bg-teal-600 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? "Saving..." : "Approve & Save ✓"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Success State ─────────────────────────────────────────────
function SuccessState({ name, onAddAnother }: { name: string; onAddAnother: () => void }) {
  return (
    <div class="flex flex-col items-center justify-center h-full px-6 py-8 text-center gap-4">
      <div class="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center">
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6 15L12 21L24 9"
            stroke="#10b981"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div>
        <h3 class="text-base font-800 text-gray-900">Property Added! 🎉</h3>
        <p class="text-xs text-gray-400 mt-1 leading-relaxed max-w-xs">
          <span class="font-600 text-gray-700">"{name}"</span> is now live in your dashboard. Share your booking link to start accepting reservations.
        </p>
      </div>
      <div class="flex flex-col w-full gap-2 mt-2">
        <button
          onClick={() => globalThis.location?.reload()}
          class="w-full py-2.5 rounded-xl bg-teal-500 text-white text-sm font-600 hover:bg-teal-600 transition-colors"
        >
          View Properties
        </button>
        <button
          onClick={onAddAnother}
          class="w-full py-2.5 rounded-xl border border-gray-200 text-sm font-500 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          + Add Another
        </button>
      </div>
    </div>
  );
}

// ── Error State ───────────────────────────────────────────────
function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div class="flex flex-col items-center justify-center h-full px-6 py-8 text-center gap-4">
      <div class="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center">
        <span class="text-2xl">⚠️</span>
      </div>
      <div>
        <h3 class="text-sm font-700 text-gray-900 mb-1">Couldn't fetch listing</h3>
        <p class="text-xs text-gray-400 leading-relaxed">{message}</p>
      </div>
      <button
        onClick={onRetry}
        class="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-600 text-gray-700 hover:bg-gray-50 transition-colors"
      >
        ← Try again
      </button>
    </div>
  );
}

// ── Main Island ───────────────────────────────────────────────
export default function AddProperty() {
  // Signals for reactive state
  const step = useSignal<Step>("idle");
  const url = useSignal("");
  const errorMsg = useSignal("");
  const scraped = useSignal<ScrapedListing | null>(null);

  // Editable fields in preview
  const editName = useSignal("");
  const editDesc = useSignal("");
  const editPrice = useSignal("2000");

  const reset = () => {
    step.value = "idle";
    url.value = "";
    scraped.value = null;
    errorMsg.value = "";
    editName.value = "";
    editDesc.value = "";
    editPrice.value = "2000";
  };

  const fetchListing = async () => {
    if (!url.value.trim()) return;
    step.value = "loading";
    errorMsg.value = "";

    try {
      const res = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.value.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        step.value = "error";
        errorMsg.value = data.error ?? "Unknown error. Please try again.";
        return;
      }

      scraped.value = data as ScrapedListing;
      editName.value = data.name ?? "";
      editDesc.value = data.description ?? "";
      editPrice.value = "2000"; // Default — host sets their own price
      step.value = "preview";
    } catch {
      step.value = "error";
      errorMsg.value = "Network error. Check your connection and try again.";
    }
  };

  const saveProperty = async () => {
    if (!scraped.value) return;
    step.value = "saving";

    try {
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editName.value,
          description: editDesc.value,
          imageUrl: scraped.value.imageUrl,
          basePrice: Number(editPrice.value) || 0,
          airbnbUrl: scraped.value.sourceUrl,
          amenities: scraped.value.amenities, // Pass AI extracted amenities
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        step.value = "error";
        errorMsg.value = data.error ?? "Could not save property. Please try again.";
        return;
      }

      // ── AUTO-SAVE AI KNOWLEDGE base ──
      if (scraped.value.aiKnowledge && data.property?.id) {
        try {
          await fetch("/api/knowledge", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              propertyId: data.property.id,
              content: scraped.value.aiKnowledge,
            }),
          });
        } catch (e) {
          console.warn("[onboard] Failed to save AI knowledge summary", e);
        }
      }

      step.value = "success";
    } catch {
      step.value = "error";
      errorMsg.value = "Network error while saving. Please try again.";
    }
  };

  return (
    <div class="group bg-white rounded-2xl border-2 border-dashed border-gray-200 hover:border-teal-300 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden min-h-[380px] flex flex-col">
      {step.value === "idle" && (
        <IdleState
          url={url.value}
          onUrlChange={(v) => (url.value = v)}
          onFetch={fetchListing}
          isLoading={false}
        />
      )}

      {step.value === "loading" && <LoadingState />}

      {step.value === "preview" && scraped.value && (
        <PreviewState
          scraped={scraped.value}
          editName={editName.value}
          editDesc={editDesc.value}
          editPrice={editPrice.value}
          onNameChange={(v) => (editName.value = v)}
          onDescChange={(v) => (editDesc.value = v)}
          onPriceChange={(v) => (editPrice.value = v)}
          onSave={saveProperty}
          onReset={reset}
          isSaving={false}
        />
      )}

      {step.value === "saving" && scraped.value && (
        <PreviewState
          scraped={scraped.value}
          editName={editName.value}
          editDesc={editDesc.value}
          editPrice={editPrice.value}
          onNameChange={(v) => (editName.value = v)}
          onDescChange={(v) => (editDesc.value = v)}
          onPriceChange={(v) => (editPrice.value = v)}
          onSave={saveProperty}
          onReset={reset}
          isSaving={true}
        />
      )}

      {step.value === "success" && (
        <SuccessState
          name={editName.value}
          onAddAnother={reset}
        />
      )}

      {step.value === "error" && (
        <ErrorState
          message={errorMsg.value}
          onRetry={reset}
        />
      )}
    </div>
  );
}
