/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "uiBG": "#edeff1",
        "chatBG": "#f3f0ea"
      }
    },
  },
  plugins: [],
}
