/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Barlow lembra sinalização de estrada: combina com uma transportadora.
        sans: ['Barlow', 'system-ui', 'sans-serif'],
        display: ['"Barlow Semi Condensed"', 'Barlow', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
