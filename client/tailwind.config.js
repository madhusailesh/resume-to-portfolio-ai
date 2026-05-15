/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Ye line pakka check karna
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class', // Dark mode toggle ke liye ye bhi add kar lo
  plugins: [],
}