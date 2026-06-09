/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        accent: '#f97316',
        gold: '#fbbf24',
        teal: '#14b8a6',
      },
    },
  },
  plugins: [],
}
