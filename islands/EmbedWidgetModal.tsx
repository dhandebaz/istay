import { useSignal } from "@preact/signals";

interface EmbedWidgetModalProps {
  propId: string;
  propertyName: string;
}

export default function EmbedWidgetModal({ propId, propertyName }: EmbedWidgetModalProps) {
  const isOpen = useSignal(false);
  const copied = useSignal(false);

  const embedCode = `<div class="istay-widget" data-prop-id="${propId}"></div>
<script src="${window.location.origin}/widget.js"></script>`;

  const copyCode = async () => {
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
        class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-mint-50 text-mint-700 hover:bg-mint-100 transition-colors text-xs font-700"
        title="Get embed code"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
        Embed
      </button>

      {isOpen.value && (
        <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
          <div 
            class="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div class="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 class="text-xl font-800 text-gray-900 leading-tight">Embed Direct Booking</h2>
                <p class="text-xs text-gray-400 mt-1">For {propertyName}</p>
              </div>
              <button 
                onClick={() => (isOpen.value = false)}
                class="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            {/* Modal Body */}
            <div class="p-8 space-y-6">
              <div class="space-y-3">
                <label class="block text-sm font-700 text-gray-700">Copy this snippet</label>
                <p class="text-xs text-gray-500 leading-relaxed">
                  Paste this code anywhere on your website. The widget is fully responsive and optimized for speed.
                </p>
                <div class="relative group">
                  <pre class="w-full p-4 rounded-xl bg-gray-900 text-gray-300 text-[11px] font-mono whitespace-pre-wrap break-all leading-relaxed overflow-x-auto border border-gray-800">
                    {embedCode}
                  </pre>
                  <button
                    onClick={copyCode}
                    class="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-gray-800 text-white text-[10px] font-700 opacity-0 group-hover:opacity-100 transition-opacity border border-gray-700 hover:bg-gray-700 shadow-xl"
                  >
                    {copied.value ? "Copied!" : "Copy Code"}
                  </button>
                </div>
              </div>

              <div class="p-4 rounded-2xl bg-mint-50 border border-mint-100 space-y-2">
                <div class="flex items-center gap-2 text-mint-900 font-800 text-xs">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                  Pro Tip: Zero Commission
                </div>
                <p class="text-[11px] text-mint-700 leading-relaxed font-500">
                  Using this widget on your personal website removes the 15-20% platform commission you pay to OTAs. Every booking made through this snippet goes directly to your wallet.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div class="px-8 py-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={() => (isOpen.value = false)}
                class="px-6 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 text-sm font-700 hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
              <button
                onClick={copyCode}
                class="px-6 py-2.5 rounded-xl bg-mint-500 text-white text-sm font-700 shadow-sm hover:bg-mint-600 transition-colors"
              >
                {copied.value ? "Copied!" : "Copy Snippet"}
              </button>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-up { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.2s ease-out; }
        .animate-slide-up { animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
      ` }} />
    </>
  );
}
