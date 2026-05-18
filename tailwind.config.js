/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: '#4f46e5', // A vibrant indigo for primary actions
        accent: '#f59e0b', // A warm amber for highlights or warnings
        pipeline: '#0ea5e9', // A clear sky blue representing the pipeline flow
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}