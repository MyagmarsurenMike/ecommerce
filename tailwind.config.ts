import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F8F5F0",
        stone: {
          dark: "#1A1A1A",
          accent: "#8B7355",
        },
        admin: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          600: "#64748B",
          700: "#475569",
          800: "#1E293B",
          900: "#0F172A",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
      },
      spacing: {
        section: "4rem",
      },
    },
  },
  plugins: [],
};

export default config;
