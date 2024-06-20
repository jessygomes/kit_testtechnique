import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#92a65f",
        },
        secondary: {
          DEFAULT: "#446129",
        },
        tertiary: {
          DEFAULT: "#dcde9f",
        },
        quartenary: {
          DEFAULT: "#f3f4d3",
        },
        primaryBlack: {
          DEFAULT: "#183114",
        },
      },
    },
  },
  plugins: [],
};
export default config;
