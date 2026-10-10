/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#0B0F17',
          panel: '#121824',
          cyan: '#00F2FE',
          blue: '#4FACFE',
          accent: '#05D5FA'
        }
      }
    },
  },
  plugins: [],
}
