/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      pacifico: ["Pacifico"],
    },
    extend: {
      backgroundImage: {
        hero: "url('./src/assets/services.jpg')",
      },
    },
  },
  plugins: [],
}
