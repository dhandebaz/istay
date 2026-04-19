import { useEffect, useState } from "preact/hooks";

export default function OfflineNotice() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const updateStatus = () => setIsOffline(!navigator.onLine);
    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);
    updateStatus();

    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div class="fixed top-0 left-0 right-0 z-[100] animate-slide-down">
      <div class="bg-amber-500 text-white px-4 py-2.5 flex items-center justify-between shadow-lg">
        <div class="flex items-center gap-3">
          <span class="text-lg">📡</span>
          <div>
            <p class="text-[11px] font-900 uppercase tracking-widest leading-none">
              Offline Mode
            </p>
            <p class="text-[10px] font-600 opacity-90 mt-1">
              Actions will be synced when connection is restored.
            </p>
          </div>
        </div>
        <button 
          onClick={() => window.location.reload()}
          class="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-[10px] font-800 uppercase transition-all"
        >
          Check again
        </button>
      </div>
      <style>
        {`
          @keyframes slide-down {
            from { transform: translateY(-100%); }
            to { transform: translateY(0); }
          }
          .animate-slide-down {
            animation: slide-down 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}
      </style>
    </div>
  );
}
