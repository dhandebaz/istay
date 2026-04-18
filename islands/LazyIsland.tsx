import { useEffect, useRef, useState } from "preact/hooks";
import { type ComponentChildren } from "preact";

interface LazyIslandProps {
  children: ComponentChildren;
  placeholderHeight?: string;
}

export default function LazyIsland({ children, placeholderHeight = "200px" }: LazyIslandProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // Start hydrating 200px before it enters
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{ minHeight: isVisible ? "auto" : placeholderHeight }}>
      {isVisible ? children : (
        <div class="w-full bg-gray-50/50 rounded-3xl animate-pulse flex items-center justify-center text-gray-400 text-xs font-600 italic">
          Loading component...
        </div>
      )}
    </div>
  );
}
