import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      ice: "#F7F9FA",
      stone: "#F1F3F4",
      jetstream: "#B5D2CE",
      mint: "#57999A",
      allports: "#1F6A7D",
      cyan: "#175579",
      navy: "#002F61",
      alert: "#954545",
      transparent: "transparent",
    },
    fontFamily: {
      roboto: "var(--font-roboto)",
      nunito: "var(--font-nunito)",
    },
    extend: {
      backgroundImage: {
        "radial-gradient": "radial-gradient(circle, rgba(31,106,125,1) 0%, rgba(24,91,118,1) 100%)",
      },
      borderRadius: {
        default: "20px",
      },
      gridTemplateRows: {
        '9': 'repeat(9, minmax(0, auto))',
      }
    },
  },
  plugins: [],
}
export default config
