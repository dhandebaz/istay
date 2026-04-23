import { useState, useEffect } from "preact/hooks";

export default function PwaInstallPrompt() {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isStandalone, setIsStandalone] = useState(true); // Assume standalone initially to prevent flash
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if running as standalone (installed)
    const standalone = window.matchMedia("(display-mode: standalone)").matches || 
                       (window.navigator as any).standalone === true;
    
    setIsStandalone(standalone);

    if (standalone) return; // Don't show if already installed

    // Check if dismissed previously in session
    if (sessionStorage.getItem("pwa_prompt_dismissed")) {
      setDismissed(true);
      return;
    }

    // iOS Safari detection
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    
    if (isIosDevice) {
      setIsIos(true);
      setIsInstallable(true);
    }

    // Standard Android/Chrome detection (beforeinstallprompt event)
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault(); // Prevent automatic prompt
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  if (!isInstallable || isStandalone || dismissed) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isIos) {
      // iOS doesn't support programmatic install, show instructions
      alert("To install: Tap the 'Share' icon at the bottom of Safari, then select 'Add to Home Screen'.");
    } else if (deferredPrompt) {
      // Chrome/Android standard install
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setDeferredPrompt(null);
      }
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem("pwa_prompt_dismissed", "true");
  };

  return (
    <div class="mb-8 bg-gradient-to-r from-mint-500 to-emerald-600 rounded-2xl shadow-lg p-5 sm:p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/30">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </div>
        <div>
          <h3 class="font-800 text-lg sm:text-xl tracking-tight">Install istay App</h3>
          <p class="text-mint-50 text-xs sm:text-sm font-500 mt-0.5">
            Add to your home screen for real-time notifications and faster access.
          </p>
        </div>
      </div>
      
      <div class="flex w-full sm:w-auto items-center gap-3">
        <button 
          onClick={handleDismiss}
          class="flex-1 sm:flex-none px-4 py-2 text-xs font-700 text-mint-100 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
        >
          Not Now
        </button>
        <button 
          onClick={handleInstallClick}
          class="flex-1 sm:flex-none px-6 py-2 bg-white text-emerald-600 hover:bg-mint-50 text-sm font-800 rounded-xl shadow-sm transition-all hover:scale-105 active:scale-95"
        >
          Install App
        </button>
      </div>
    </div>
  );
}
