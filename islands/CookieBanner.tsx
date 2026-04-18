import { useEffect, useState } from "preact/hooks";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      // Show after a slight delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div class="fixed bottom-6 left-6 right-6 md:left-auto md:w-96 bg-istay-900 border border-white/10 rounded-3xl p-6 shadow-2xl z-50 animate-slide-up">
      <div class="flex items-start gap-4">
        <div class="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
          <span class="text-xl">🍪</span>
        </div>
        <div class="space-y-3">
          <p class="text-sm text-white/90 font-500 leading-relaxed">
            We use cookies to enhance your experience, analyze site traffic, and support direct bookings.
          </p>
          <div class="flex items-center gap-3">
            <button
              onClick={accept}
              class="px-4 py-2 bg-mint-500 text-istay-900 text-xs font-900 rounded-full hover:bg-mint-400 transition-colors"
            >
              Got it
            </button>
            <a
              href="/legal/privacy"
              class="text-xs text-white/60 hover:text-white transition-colors"
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
