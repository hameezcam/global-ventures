import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#060F1A",
          900: "#0B1C30", // Midnight Navy (Primary Brand)
          850: "#0F233C",
          800: "#142D4C",
          700: "#1B3B63",
          600: "#264F82",
        },
        gold: {
          50: "#FAF7F2",
          100: "#F4EDE1",
          200: "#E6D7BD",
          300: "#D7BF96",
          400: "#CEB487",
          500: "#C7AA78", // Champagne Gold (Accent)
          600: "#B39561",
          700: "#917748",
          800: "#6E5A35",
        },
        ivory: {
          50: "#FCFAF7",
          100: "#F5F2EC", // Warm Ivory (Backgrounds)
          200: "#EDE7DA",
          300: "#DFD7C4",
        },
        slate: {
          400: "#607289",
          500: "#405268", // Slate Blue (Secondary)
          600: "#324153",
          700: "#253140",
          800: "#1A232E",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "Manrope", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
