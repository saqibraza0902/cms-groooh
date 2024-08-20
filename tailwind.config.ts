import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  darkMode: ["class"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "1.5xl": "1366px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        Suisse: ["Suisse"],
        SuisseMedium: ["SuisseMedium"],
        SuisseSemiBold: ["SuisseSemiBold"],
        SuisseBold: ["SuisseBold"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      height: {
        lg: "750px",
        "2xl": "1080px",
        "4k": "400px",
        "5k": "500px",
        "6k": "600px",
        "6.3k": "630px",
        "6.5k": "650px",
        "6.6k": "660px",
        "6.7k": "670px",
        "6.8k": "680px",
        "7k": "700px",
        "8k": "800px",
        "9k": "900px",
      },
      colors: {
        primary: "#e3ff00",
        secondary: "#a1b600",
        brand_gray: {
          100: "#F3F4F6",
          400: "#9ca3af",
          500: "#6b7280",
          700: "#374151",
          900: "#001827",
        },
        brand_blue: {
          100: "#f7d3ff",
          200: "#00C3FF",
          300: "#01c3ff",
          400: "#255fef",
          500: "#3B82F6",
          600: "#01011d",
        },
        brand_pink: {
          100: "#fdf2f8",
          200: "#ccccd2",
          300: "#f6f5f8",
          400: "#f472b6",
        },
        brand_red: {
          800: "#991b1b",
        },
        brand_white: {
          200: "#f5f5f7",
        },
        brand_green: {
          200: "#bbf7d0",
          300: "#FF6633",
          600: "#16a34a",
          700: "#444d00",
        },
        brand_orange: {
          400: "#ffa500",
        },
      },
    },
  },
  plugins: [],
};
export default config;
