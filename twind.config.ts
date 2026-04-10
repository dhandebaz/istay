import { Options } from "$fresh/plugins/twind.ts";

export default {
  selfURL: import.meta.url,
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "'Plus Jakarta Sans'",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
        istay: {
          50: "#f0f8f8",
          100: "#e0f1f1",
          200: "#b2dfdb",
          300: "#80cbc4",
          400: "#4db6ac",
          500: "#26a69a",
          600: "#009688",
          700: "#00897b",
          800: "#00796b",
          900: "#0C4D4D", // Official Deep Teal
        },
        brand: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
        },
        mint: {
          50: "#e0fff0",
          100: "#b3ffda",
          200: "#80ffc4",
          300: "#4dffad",
          400: "#1aff96",
          500: "#00E676", // Electric Mint
          600: "#00b35c",
          700: "#008042",
          800: "#004d27",
          900: "#001a0d",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
} satisfies Options;
