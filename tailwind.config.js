/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        soft: {
          bg: "#f5f6f8",
          surface: "#ffffff",
          border: "#dce3dc",
          green: "#d3f0d3",
          greenDeep: "#2e7d32",
        },
      },
      boxShadow: {
        soft: "0 8px 24px rgba(26, 29, 36, 0.08)",
      },
    },
  },
  plugins: [],
};
