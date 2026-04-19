import ErrorBoundary from "../islands/ErrorBoundary.tsx";
import CookieBanner from "../islands/CookieBanner.tsx";
import ScrollToTop from "../islands/ScrollToTop.tsx";

const ASSET_VERSION = "1.0.1";

export default function App({ Component, url }: PageProps) {
  // Un-param'd canonical URL string
  const canonicalUrl = url ? `${url.origin}${url.pathname}` : "https://istay.space/";

  return (
    <html lang="en" class="scroll-smooth">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0C4D4D" />

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link 
          rel="preload" 
          as="style" 
          href={`https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap&v=${ASSET_VERSION}`} 
        />
        <link
          href={`https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap&v=${ASSET_VERSION}`}
          rel="stylesheet"
        />

        {/* Favicons & Manifest */}
        <link rel="icon" type="image/svg+xml" href={`/icon.svg?v=${ASSET_VERSION}`} />
        <link rel="apple-touch-icon" sizes="180x180" href={`/apple-touch-icon.png?v=${ASSET_VERSION}`} />
        <link rel="manifest" href={`/site.webmanifest?v=${ASSET_VERSION}`} />

        <link rel="canonical" href={canonicalUrl} />

        <link rel="stylesheet" href={`/styles.css?v=${ASSET_VERSION}`} />
      </head>
      <body class="font-sans bg-gray-50 text-gray-900 antialiased min-h-screen">
        <ErrorBoundary>
          <Component />
        </ErrorBoundary>
        
        <ScrollToTop />
        <CookieBanner />
        
        {/* Global Floating WhatsApp Button */}
        <a 
          href="https://wa.me/91XXXXXXXXXX?text=I%20have%20a%20question%20about%20istay%20onboarding" 
          target="_blank" 
          rel="noopener noreferrer"
          class="fixed bottom-6 right-6 z-[90] w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 hover:shadow-mint-500/30 transition-all duration-300"
          aria-label="Contact us on WhatsApp"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.996 22.001c-1.844 0-3.606-.481-5.181-1.39l-5.753 1.509 1.536-5.608a9.96 9.96 0 01-1.488-5.267C1.11 5.72 5.596 1.234 11.11 1.234c5.513 0 9.998 4.486 9.998 9.999 0 5.513-4.485 9.998-9.998 9.998v-.895z" fill="none" stroke="currentColor" stroke-width="1.8"/>
            <path d="M8.28 7.424c-.23-.518-.466-.528-.682-.538-.204-.009-.44-.009-.675-.009a1.32 1.32 0 00-.946.438c-.326.34-1.246 1.218-1.246 2.972 0 1.753 1.275 3.447 1.452 3.682.176.236 2.511 3.834 6.082 5.374 1.139.49 1.765.811 2.378 1.036.852.312 1.625.268 2.235.163.687-.118 2.115-.865 2.413-1.701.298-.836.298-1.554.209-1.701-.089-.148-.325-.236-.681-.413s-2.115-1.044-2.443-1.162c-.328-.118-.567-.177-.805.177-.238.354-.925 1.162-1.134 1.398-.209.236-.421.265-.776.088-.356-.177-1.509-.556-2.875-1.776-1.062-.949-1.782-2.122-1.991-2.476-.208-.354-.022-.545.156-.723.159-.158.356-.413.535-.619.176-.207.236-.354.356-.59.117-.236.058-.443-.031-.619-.089-.177-.805-1.942-1.103-2.658z"/>
          </svg>
        </a>

        {/* Service Worker Registration */}
        <script>
          {`
            if ("serviceWorker" in navigator) {
              window.addEventListener("load", () => {
                navigator.serviceWorker.register("/sw.js").then(
                  (reg) => console.log("SW registered:", reg.scope),
                  (err) => console.log("SW registration failed:", err)
                );
              });
            }
          `}
        </script>
      </body>
    </html>
  );
}
