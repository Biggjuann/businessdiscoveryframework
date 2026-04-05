import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kova: {
          violet: "#8B5CF6",
          "violet-deep": "#6D28D9",
          "violet-pale": "#C4B5FD",
          navy: "#0F0D1A",
          "navy-mid": "#1A1730",
          "navy-light": "#242040",
          gold: "#F7A623",
          red: "#EF4444",
          teal: "#2DD4BF",
        },
      },
      fontFamily: {
        display: ["Poppins", "sans-serif"],
        mono: ["DejaVu Mono", "monospace"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

export default config;
