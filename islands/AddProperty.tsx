import { useSignal } from "@preact/signals";
import type { ScrapedListing } from "../utils/types.ts";

type Step = "idle" | "loading" | "preview" | "saving" | "success" | "error";

function LoadingState() {
  return (
    <div class="flex flex-col h-full items-center justify-center p-16 text-center animate-fade-in">
      <div class="relative w-20 h-20 mb-10">
        <div class="absolute inset-0 rounded-full border-4 border-emerald-50 animate-pulse" />
        <div class="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin" />
        <div class="absolute inset-0 flex items-center justify-center text-2xl">✨</div>
      </div>
      <p class="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Listing Synchronization</p>
      <h3 class="text-lg font-bold text-gray-900 tracking-tight">Extracting Intelligence...</h3>
    </div>
  );
}

function IdleState({ url, onUrlChange, onFetch, isLoading }: { url: string; onUrlChange: (v: string) => void; onFetch: () => void; isLoading: boolean }) {
  return (
    <div class="flex flex-col items-center justify-center h-full px-10 py-16 text-center gap-10 animate-fade-in">
      <div class="w-20 h-20 rounded-[2rem] bg-emerald-50 border border-emerald-100 flex items-center justify-center shadow-sm text-4xl transition-transform hover:rotate-6">
        🏠
      </div>
      <div>
        <h3 class="text-3xl font-bold text-gray-900 tracking-tight mb-3">Sync Your Listing</h3>
        <p class="text-[12px] font-medium text-gray-400 leading-relaxed max-w-xs mx-auto">
          Paste your Airbnb listing URL to automatically import photos, descriptions, and amenities.
        </p>
      </div>
      <div class="w-full space-y-5">
        <div class="space-y-2 text-left px-1">
          <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Airbnb Listing URL</label>
          <input
            type="url"
            value={url}
            onInput={(e) => onUrlChange((e.target as HTMLInputElement).value)}
            onKeyDown={(e) => e.key === "Enter" && url && onFetch()}
            placeholder="https://airbnb.com/rooms/..."
            class="w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-900 placeholder-gray-300 focus:bg-white focus:border-emerald-500 focus:shadow-premium outline-none transition-all"
            disabled={isLoading}
          />
        </div>
        <button
          onClick={onFetch}
          disabled={!url.trim() || isLoading}
          class="w-full py-5 bg-gray-900 text-white text-[11px] font-bold uppercase tracking-widest rounded-2xl shadow-premium hover:bg-emerald-600 hover:-translate-y-0.5 transition-all disabled:opacity-50"
        >
          Analyze & Sync
        </button>
      </div>
    </div>
  );
}

function PreviewState({ scraped, editName, editDesc, editPrice, onNameChange, onDescChange, onPriceChange, onSave, onReset, isSaving }: any) {
  return (
    <div class="flex flex-col h-full overflow-y-auto no-scrollbar animate-fade-in">
      {scraped.imageUrl && (
        <div class="relative h-56 shrink-0">
          <img src={scraped.imageUrl} alt={editName} class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
          <div class="absolute bottom-6 left-8 flex items-center gap-3">
             <div class="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white shadow-sm animate-pulse" />
             <span class="text-[10px] font-bold text-white uppercase tracking-widest">Listing Intelligence Audited</span>
          </div>
        </div>
      )}
      <div class="p-8 space-y-8">
        <div class="space-y-3">
          <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Property Title</label>
          <input
            type="text"
            value={editName}
            onInput={(e) => onNameChange((e.target as HTMLInputElement).value)}
            class="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-900 focus:bg-white focus:border-emerald-500 outline-none transition-all"
          />
        </div>
        <div class="space-y-3">
          <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Recommended Base Rate (₹)</label>
          <div class="relative">
            <input
              type="number"
              value={editPrice}
              onInput={(e) => onPriceChange((e.target as HTMLInputElement).value)}
              class="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-lg font-bold text-emerald-600 focus:bg-white focus:border-emerald-500 outline-none transition-all"
            />
            <div class="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-300 uppercase tracking-widest">Per Night</div>
          </div>
        </div>
        <div class="flex gap-4 pt-4">
          <button onClick={onReset} class="flex-1 py-4 bg-white text-gray-400 text-[10px] font-bold uppercase tracking-widest border border-gray-100 rounded-2xl hover:bg-gray-50 hover:text-gray-900 transition-all">Cancel</button>
          <button onClick={onSave} disabled={isSaving} class="flex-1 py-4 bg-gray-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-2xl shadow-premium hover:bg-emerald-600 hover:-translate-y-0.5 transition-all">
            {isSaving ? "Finalizing..." : "Finalize Integration"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AddProperty() {
  const step = useSignal<Step>("idle");
  const url = useSignal("");
  const errorMsg = useSignal("");
  const scraped = useSignal<ScrapedListing | null>(null);
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
    try {
      const res = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.value.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        step.value = "error";
        errorMsg.value = data.error ?? "Import failed. Please check the URL.";
        return;
      }
      scraped.value = data as ScrapedListing;
      editName.value = data.name ?? "";
      editDesc.value = data.description ?? "";
      step.value = "preview";
    } catch {
      step.value = "error";
      errorMsg.value = "Connection error. Please try again.";
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
          amenities: scraped.value.amenities,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        step.value = "error";
        errorMsg.value = data.error ?? "Failed to save property.";
        return;
      }
      if (scraped.value.aiKnowledge && data.property?.id) {
        await fetch("/api/knowledge", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            propertyId: data.property.id,
            content: scraped.value.aiKnowledge,
          }),
        }).catch(console.warn);
      }
      step.value = "success";
    } catch {
      step.value = "error";
      errorMsg.value = "Network error. Please try again.";
    }
  };

  return (
    <div class="bg-white rounded-[3rem] border border-gray-100 shadow-premium overflow-hidden w-full lg:max-w-md min-h-[500px] flex flex-col">
      {step.value === "idle" && <IdleState url={url.value} onUrlChange={(v) => (url.value = v)} onFetch={fetchListing} isLoading={false} />}
      {step.value === "loading" && <LoadingState />}
      {(step.value === "preview" || step.value === "saving") && scraped.value && (
        <PreviewState scraped={scraped.value} editName={editName.value} editDesc={editDesc.value} editPrice={editPrice.value} onNameChange={(v: string) => (editName.value = v)} onDescChange={(v: string) => (editDesc.value = v)} onPriceChange={(v: string) => (editPrice.value = v)} onSave={saveProperty} onReset={reset} isSaving={step.value === "saving"} />
      )}
      {step.value === "success" && (
        <div class="p-16 text-center flex flex-col items-center justify-center flex-1 gap-10 animate-fade-in">
           <div class="w-20 h-20 bg-emerald-500 rounded-[2rem] flex items-center justify-center text-white text-4xl shadow-premium-lg animate-scale-in">✓</div>
           <div>
             <h3 class="text-3xl font-bold text-gray-900 tracking-tight mb-3">Sync Successful</h3>
             <p class="text-[12px] font-medium text-gray-400 leading-relaxed max-w-xs mx-auto">Your property has been successfully integrated into the iStay network.</p>
           </div>
           <button onClick={() => window.location.reload()} class="w-full py-5 bg-gray-900 text-white text-[11px] font-bold uppercase tracking-widest rounded-2xl shadow-premium hover:bg-emerald-600 transition-all">View Portfolio</button>
        </div>
      )}
      {step.value === "error" && (
        <div class="p-16 text-center flex flex-col items-center justify-center flex-1 gap-10 animate-fade-in">
           <div class="w-20 h-20 bg-rose-50 rounded-[2rem] border border-rose-100 flex items-center justify-center text-rose-500 text-4xl shadow-sm">⚠️</div>
           <div>
             <h3 class="text-2xl font-bold text-gray-900 tracking-tight mb-3">Sync Failed</h3>
             <p class="text-xs font-bold text-rose-500 leading-relaxed uppercase tracking-widest">{errorMsg.value}</p>
           </div>
           <button onClick={reset} class="w-full py-5 bg-gray-900 text-white text-[11px] font-bold uppercase tracking-widest rounded-2xl shadow-premium hover:bg-rose-600 transition-all">Try Again</button>
        </div>
      )}
    </div>
  );
}

