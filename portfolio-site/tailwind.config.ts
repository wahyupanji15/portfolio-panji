import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#EFEDE6",
        ink: "#1C2430",
        "ink-soft": "#3D4654",
        brass: "#9C7A3C",
        teal: "#2E5D57",
        line: "#D7D3C6",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        measure: "42rem",
      },
    },
  },
  plugins: [],
};

export default config;
