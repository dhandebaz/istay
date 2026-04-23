import { useSignal } from "@preact/signals";
import type { ScrapedListing } from "../utils/types.ts";

type Step = "idle" | "loading" | "preview" | "saving" | "success" | "error";

function LoadingState() {
  return (
    <div class="flex flex-col h-full items-center justify-center p-12 text-center">
      <div class="w-20 h-20 border-[4px] border-gray-900 border-t-mint-500 rounded-full animate-spin mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" />
      <p class="text-[10px] font-950 text-gray-900 uppercase tracking-[0.4em] animate-pulse">EXTRACTING_SIGNALS</p>
    </div>
  );
}

function IdleState({ url, onUrlChange, onFetch, isLoading }: { url: string; onUrlChange: (v: string) => void; onFetch: () => void; isLoading: boolean }) {
  return (
    <div class="flex flex-col items-center justify-center h-full px-10 py-12 text-center gap-8">
      <div class="w-20 h-20 rounded-3xl bg-mint-400 border-[4px] border-gray-900 flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-4xl">
        ⚡
      </div>
      <div>
        <h3 class="text-2xl font-950 text-gray-900 uppercase tracking-tighter mb-2">Initialize_Asset</h3>
        <p class="text-[10px] font-800 text-gray-400 uppercase tracking-widest leading-relaxed">Paste your OTA listing URL to activate the ingestion engine.</p>
      </div>
      <div class="w-full space-y-4">
        <input
          type="url"
          value={url}
          onInput={(e) => onUrlChange((e.target as HTMLInputElement).value)}
          onKeyDown={(e) => e.key === "Enter" && url && onFetch()}
          placeholder="AIRBNB_OR_OTA_URL"
          class="w-full px-6 py-4 bg-gray-50 border-[3px] border-gray-900 rounded-2xl text-xs font-950 text-gray-900 placeholder-gray-300 focus:bg-white focus:shadow-[4px_4px_0px_0px_#4ade80] outline-none transition-all uppercase tracking-widest"
          disabled={isLoading}
        />
        <button
          onClick={onFetch}
          disabled={!url.trim() || isLoading}
          class="w-full py-5 bg-gray-900 text-white text-[11px] font-950 uppercase tracking-[0.2em] rounded-2xl border-[3px] border-gray-900 shadow-[6px_6px_0px_0px_#4ade80] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all disabled:opacity-50"
        >
          START_INGESTION
        </button>
      </div>
    </div>
  );
}

function PreviewState({ scraped, editName, editDesc, editPrice, onNameChange, onDescChange, onPriceChange, onSave, onReset, isSaving }: any) {
  return (
    <div class="flex flex-col h-full overflow-y-auto no-scrollbar">
      {scraped.imageUrl && (
        <div class="relative h-56 shrink-0 border-b-[4px] border-gray-900">
          <img src={scraped.imageUrl} alt={editName} class="w-full h-full object-cover grayscale-[0.4]" />
          <div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
          <div class="absolute bottom-6 left-6 flex items-center gap-3">
             <div class="w-3 h-3 rounded-full bg-mint-400 border-[2px] border-gray-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" />
             <span class="text-[9px] font-950 text-white uppercase tracking-widest">INGESTED_SUCCESSFULLY</span>
          </div>
        </div>
      )}
      <div class="p-10 space-y-8">
        <div class="space-y-3">
          <label class="text-[9px] font-950 text-gray-400 uppercase tracking-widest ml-1">ASSET_IDENTIFIER</label>
          <input
            type="text"
            value={editName}
            onInput={(e) => onNameChange((e.target as HTMLInputElement).value)}
            class="w-full px-5 py-3 bg-gray-50 border-[3px] border-gray-900 rounded-xl text-xs font-950 text-gray-900 uppercase tracking-widest focus:bg-white outline-none"
          />
        </div>
        <div class="space-y-3">
          <label class="text-[9px] font-950 text-gray-400 uppercase tracking-widest ml-1">CAPITAL_UNIT_RATE (₹)</label>
          <input
            type="number"
            value={editPrice}
            onInput={(e) => onPriceChange((e.target as HTMLInputElement).value)}
            class="w-full px-5 py-3 bg-gray-50 border-[3px] border-gray-900 rounded-xl text-xs font-950 text-mint-600 focus:bg-white outline-none"
          />
        </div>
        <div class="flex gap-4 pt-4">
          <button onClick={onReset} class="flex-1 py-4 bg-white text-gray-400 text-[10px] font-950 uppercase border-[3px] border-gray-900 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all">ABORT</button>
          <button onClick={onSave} disabled={isSaving} class="flex-1 py-4 bg-gray-900 text-mint-400 text-[10px] font-950 uppercase border-[3px] border-gray-900 rounded-xl shadow-[4px_4px_0px_0px_#4ade80] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all">COMMIT_REGISTRY</button>
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
        errorMsg.value = data.error ?? "INGESTION_FAILURE";
        return;
      }
      scraped.value = data as ScrapedListing;
      editName.value = data.name ?? "";
      editDesc.value = data.description ?? "";
      step.value = "preview";
    } catch {
      step.value = "error";
      errorMsg.value = "NETWORK_PROTOCOL_ERROR";
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
        errorMsg.value = data.error ?? "REGISTRY_FAILURE";
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
      errorMsg.value = "COMMIT_NETWORK_ERROR";
    }
  };

  return (
    <div class="bg-white rounded-[2.5rem] border-[4px] border-gray-900 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden w-full lg:max-w-md">
      {step.value === "idle" && <IdleState url={url.value} onUrlChange={(v) => (url.value = v)} onFetch={fetchListing} isLoading={false} />}
      {step.value === "loading" && <LoadingState />}
      {(step.value === "preview" || step.value === "saving") && scraped.value && (
        <PreviewState scraped={scraped.value} editName={editName.value} editDesc={editDesc.value} editPrice={editPrice.value} onNameChange={(v: string) => (editName.value = v)} onDescChange={(v: string) => (editDesc.value = v)} onPriceChange={(v: string) => (editPrice.value = v)} onSave={saveProperty} onReset={reset} isSaving={step.value === "saving"} />
      )}
      {step.value === "success" && (
        <div class="p-12 text-center flex flex-col items-center gap-8">
           <div class="w-20 h-20 bg-emerald-500 rounded-3xl border-[4px] border-gray-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-4xl">✓</div>
           <div>
             <h3 class="text-2xl font-950 text-gray-900 uppercase tracking-tighter mb-2">COMMIT_SUCCESS</h3>
             <p class="text-[10px] font-800 text-gray-400 uppercase tracking-widest leading-relaxed">Asset successfully integrated into kernel registry.</p>
           </div>
           <button onClick={() => window.location.reload()} class="w-full py-5 bg-gray-900 text-white text-[11px] font-950 uppercase tracking-[0.2em] rounded-2xl border-[3px] border-gray-900 shadow-[6px_6px_0px_0px_#4ade80] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">REFRESH_ENGINE</button>
        </div>
      )}
      {step.value === "error" && (
        <div class="p-12 text-center flex flex-col items-center gap-8">
           <div class="w-20 h-20 bg-rose-500 rounded-3xl border-[4px] border-gray-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-4xl">!</div>
           <div>
             <h3 class="text-2xl font-950 text-gray-900 uppercase tracking-tighter mb-2">SYSTEM_ERROR</h3>
             <p class="text-[10px] font-800 text-rose-400 uppercase tracking-widest leading-relaxed">{errorMsg.value}</p>
           </div>
           <button onClick={reset} class="w-full py-5 bg-gray-900 text-white text-[11px] font-950 uppercase tracking-[0.2em] rounded-2xl border-[3px] border-gray-900 shadow-[6px_6px_0px_0px_#4ade80] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">RETRY_INGESTION</button>
        </div>
      )}
    </div>
  );
}
