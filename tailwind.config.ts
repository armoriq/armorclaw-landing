import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1A1A1A",
        secondary: "#4A4A4A",
        muted: "#6B6B6B",
        accent: "#E07B4C",
        "accent-hover": "#D06A3B",
        line: "#E5E5E5",
        surface: "#FAFAFA",
      },
      fontFamily: {
        heading: ["var(--font-sunflower)", "Arial", "Helvetica", "sans-serif"],
        body: ["var(--font-inter)", "Arial", "Helvetica", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
