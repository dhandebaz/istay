import { useEffect, useState } from "preact/hooks";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(globalThis.scrollY > 500);
    };
    globalThis.addEventListener("scroll", toggleVisibility);
    return () => globalThis.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    globalThis.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      class="fixed bottom-24 right-6 p-3 rounded-full bg-white border border-gray-100 shadow-xl text-gray-500 hover:text-mint-600 hover:scale-110 active:scale-95 transition-all z-40 group"
      aria-label="Scroll to top"
    >
      <svg
        class="w-6 h-6 group-hover:-translate-y-1 transition-transform"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2.5"
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
}
