/** @format */

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        "menu-active": "rgba(67, 97, 238, 0.30)",
        "btn-primary": "#3A0CA3",
        primary: "#4361EE",
        secondary: "#F7F7F7",
        "color-1": "#0B090A",
        "color-2": "#2B2B2B",
        "color-3": "#808080",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
export default config;
