/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4f46e5', // Indigo 600
        secondary: '#ec4899', // Pink 500
        dark: '#111827', // Gray 900
        light: '#f3f4f6', // Gray 100
      }
    },
  },
  plugins: [],
}
