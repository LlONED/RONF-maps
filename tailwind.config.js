/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      ...colors,
      "rr-40": "#fd0808",
      "rr-50": "#cb0909",
      "rr-100": "#930000",
    },
  },
  plugins: [],
};
