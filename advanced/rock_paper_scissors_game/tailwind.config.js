/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
        'dark': 'hsl(229, 25%, 31%)',
        'score': 'hsl(229, 64%, 46%)',
      },
      backgroundColor: {
        'dark': 'hsl(229, 25%, 31%)',
      },
      colors: {
        'header-outline': 'hsl(217, 16%, 45%)',
      },
      borderColor: {
        'dark': 'hsl(229, 25%, 31%)',
      },
      screens: {
        'sm': '540px'
      }
    },
  },
  plugins: [],
}