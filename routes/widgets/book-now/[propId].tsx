import { PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

export default function BookNowWidget(props: PageProps) {
  const { propId } = props.params;
  const url = new URL(props.url);
  
  const theme = url.searchParams.get("theme") || "light";
  const accent = url.searchParams.get("accent") || "0d9488"; // Branding Teal
  const label = url.searchParams.get("label") || "Book Direct & Save";
  const size = url.searchParams.get("size") || "md";

  const isDark = theme === "dark";
  const bgColor = isDark ? "#111827" : "transparent";
  const textColor = isDark ? "#f3f4f6" : "#111827";
  
  const padding = size === "sm" ? "py-1.5 px-3 text-[10px]" : size === "lg" ? "py-3 px-6 text-sm" : "py-2 px-4 text-xs";
  const radius = size === "sm" ? "rounded-lg" : "rounded-xl";

  return (
    <div 
      style={{ 
        backgroundColor: bgColor, 
        color: textColor, 
        display: "inline-flex",
        fontFamily: "'Outfit', sans-serif" 
      }}
      class="w-full flex items-center justify-start overflow-hidden"
    >
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap" rel="stylesheet" />
        <style>
          {`
            body { margin: 0; overflow: hidden; }
            .bn-btn {
              display: inline-flex;
              align-items: center;
              gap: 8px;
              font-weight: 800;
              text-decoration: none;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
              cursor: pointer;
              border: none;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            }
            .bn-btn:hover {
              transform: translateY(-2px);
              box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
              filter: brightness(1.1);
            }
            .bn-btn:active {
              transform: translateY(0);
            }
          `}
        </style>
      </Head>

      <a 
        href={`https://istay.space/p/${propId}`} 
        target="_top"
        class={`bn-btn ${padding} ${radius}`}
        style={{ 
          backgroundColor: `#${accent}`, 
          color: "#ffffff" 
        }}
      >
        <span>{label}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  );
}
