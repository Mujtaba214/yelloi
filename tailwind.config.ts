import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // This is critical!
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
      },
    },
  },
  plugins: [],
};

export default config;