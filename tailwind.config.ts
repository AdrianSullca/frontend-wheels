import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-gray": "#1a1a1a",
        "custom-gray-hover": "#3b3b3b",
        "custom-body": "#f9f9f9",
        "custom-melon": "#fee0b3",
        "custom-orange": "#cf7d2f"
      },
      fontFamily: {
        sans: [
          "Inter", 
          "ui-sans-serif", 
          "system-ui", 
          "sans-serif", 
          "Apple Color Emoji", 
          "Segoe UI Emoji", 
          "Segoe UI Symbol", 
          "Noto Color Emoji",
          "custom-font", // Aquí agregamos la fuente personalizada
        ],
        "custom-font": ["custom-font", "sans-serif"], // Definimos la fuente personalizada
      },
      fontWeight: {
        medium: "500", // Peso medium
        bold: "700",   // Peso bold
      },
    },
  },
  plugins: [],
} satisfies Config;
