/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "radical-red": {
          50: "#fff1f3",
          100: "#ffe4e9",
          200: "#fecdd5",
          300: "#fda4b3",
          400: "#fb7189",
          500: "#f43f5e",
          600: "#e11d3f",
          700: "#be122f",
          800: "#9f122a",
          900: "#881327",
          950: "#4c0511",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
