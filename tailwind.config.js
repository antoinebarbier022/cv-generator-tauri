/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        BentonSans: ['BentonSans', 'Ubuntu', 'Arial', 'Sans-serif']
      }
    }
  },
  plugins: [require('@tailwindcss/container-queries')]
}
