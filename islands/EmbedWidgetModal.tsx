import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";

interface EmbedWidgetModalProps {
  propId: string;
  propertyName: string;
}

export default function EmbedWidgetModal({ propId, propertyName }: EmbedWidgetModalProps) {
  const isOpen = useSignal(false);
  const copied = useSignal(false);
  const origin = useSignal("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      origin.value = window.location.origin;
    }
  }, []);

  const embedCode = `<div class="istay-widget" data-prop-id="${propId}"></div>\n<script src="${origin.value || ""}/widget.js"></script>`;

  const copyCode = async () => {
    if (!origin.value) return;
    try {
      await navigator.clipboard.writeText(embedCode);
      copied.value = true;
      setTimeout(() => (copied.value = false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <>
      <button
        onClick={() => (isOpen.value = true)}
        class="w-full py-4 bg-white text-gray-900 text-[10px] font-950 uppercase text-center rounded-2xl border-[3px] border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-center gap-3"
        title="Get embed code"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
        EMBED_BOOKING_CORE
      </button>

      {isOpen.value && (
        <div 
          class="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-gray-900/40 backdrop-blur-sm animate-fade-in"
          onClick={() => (isOpen.value = false)}
        >
          <div 
            class="bg-white rounded-[3rem] border-[4px] border-gray-900 shadow-[24px_24px_0px_0px_rgba(0,0,0,1)] w-full max-w-2xl overflow-hidden animate-slide-up relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div class="px-12 py-10 border-b-[4px] border-gray-900 flex items-center justify-between bg-gray-50">
              <div>
                <div class="flex items-center gap-3 mb-2">
                  <div class="px-3 py-1 bg-gray-900 text-mint-400 text-[9px] font-950 uppercase tracking-widest rounded-lg border-[2px] border-gray-900 shadow-[3px_3px_0px_0px_#4ade80]">
                    DEPLOY_PROTOCOL
                  </div>
                </div>
                <h2 class="text-3xl font-950 text-gray-900 uppercase tracking-tighter">Widget_Integration</h2>
                <p class="text-[10px] font-800 text-gray-400 uppercase tracking-widest mt-2">ASSET_IDENTIFIER: {propertyName}</p>
              </div>
              <button 
                onClick={() => (isOpen.value = false)}
                class="w-12 h-12 rounded-2xl border-[3px] border-gray-900 flex items-center justify-center text-gray-900 hover:bg-rose-500 hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            {/* Modal Body */}
            <div class="p-12 space-y-10">
              <div class="space-y-6">
                <div class="flex items-center justify-between">
                  <label class="text-[10px] font-950 text-gray-400 uppercase tracking-widest">WIDGET_SNIPPET_V2</label>
                  <span class="text-[9px] font-950 text-mint-500 uppercase tracking-widest animate-pulse">OPTIMIZED_FOR_PERFORMANCE</span>
                </div>
                
                <div class="relative group">
                  <div class="absolute -inset-2 bg-gray-900 rounded-[2rem] opacity-5 group-hover:opacity-10 transition-opacity" />
                  <pre class="relative w-full p-8 rounded-[2rem] bg-gray-900 text-mint-400 text-[11px] font-mono whitespace-pre-wrap break-all leading-relaxed overflow-x-auto border-[4px] border-gray-900 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)]">
                    {embedCode}
                  </pre>
                  <button
                    onClick={copyCode}
                    class={`absolute top-6 right-6 px-6 py-2.5 rounded-xl text-[10px] font-950 uppercase tracking-widest transition-all border-[2px] border-gray-900 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] ${
                      copied.value ? "bg-emerald-500 text-white" : "bg-white text-gray-900 hover:bg-mint-400"
                    }`}
                  >
                    {copied.value ? "COPIED_TO_CLIPBOARD" : "COPY_PROTOCOL"}
                  </button>
                </div>
              </div>

              <div class="p-8 rounded-[2rem] bg-mint-50 border-[3px] border-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-start gap-6">
                <div class="w-12 h-12 bg-white border-[2px] border-gray-900 rounded-xl flex items-center justify-center text-2xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] shrink-0">
                  ⚡
                </div>
                <div class="space-y-2">
                  <p class="text-[10px] font-950 text-gray-900 uppercase tracking-widest">PRO_PROTOCOL: ZERO_COMMISSION</p>
                  <p class="text-[10px] text-mint-900/60 font-800 uppercase leading-relaxed tracking-widest">
                    PASTE THIS CODE INTO YOUR PERSONAL WEBSITE TO BYPASS THE 20% OTA COMMISSION TRAP. EVERY TRANSACTION FLOWS DIRECTLY INTO YOUR CONNECTED WALLET CORE.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div class="px-12 py-10 bg-gray-50 border-t-[4px] border-gray-900 flex justify-end gap-6">
              <button
                onClick={() => (isOpen.value = false)}
                class="px-8 py-4 rounded-2xl bg-white border-[3px] border-gray-900 text-gray-400 text-[10px] font-950 uppercase tracking-widest shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
              >
                ABORT_MODAL
              </button>
              <button
                onClick={copyCode}
                class="px-10 py-4 rounded-2xl bg-gray-900 text-mint-400 text-[10px] font-950 uppercase tracking-widest shadow-[6px_6px_0px_0px_#4ade80] border-[3px] border-gray-900 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
              >
                {copied.value ? "SUCCESSFULLY_COPIED" : "INITIALIZE_COPY"}
              </button>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-up { from { transform: translateY(40px) rotate(2deg); opacity: 0; } to { transform: translateY(0) rotate(0); opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        .animate-slide-up { animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
      ` }} />
    </>
  );
}
