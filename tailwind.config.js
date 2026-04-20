/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#10b981",
          "green-soft": "#d1fae5",
          blue: "#2563eb",
          orange: "#f97316",
        },
      },
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px rgb(0 0 0 / 0.06), 0 1px 2px rgb(0 0 0 / 0.04)",
        "card-hover": "0 10px 25px -5px rgb(0 0 0 / 0.08), 0 4px 10px -4px rgb(0 0 0 / 0.06)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.97)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        spin: {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.35s ease-out forwards",
        "scale-in": "scale-in 0.25s ease-out forwards",
      },
    },
  },
  plugins: [],
};
