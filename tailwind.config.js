/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
    require('flowbite/plugin')
  ],
  fontFamily: {
    "Kanit": ["Kanit", "sans-serif"],
    "Noto Sans Thai": ["Noto Sans Thai", "sans-serif"]
  },
  screens: {
    mobile: "640px",
  },
}

