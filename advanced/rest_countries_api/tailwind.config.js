/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    backgroundColor: {
      'dT-darkBlue': 'hsl(209, 23%, 22%)',
      'dT-vryDarkBlue': 'hsl(207, 26%, 17%)',
      'lT-vryDarkBlue': 'hsl(200, 15%, 8%)',
      'lT-darkGray': 'hsl(0, 0%, 52%)',
      'lT-lightGray': 'hsl(0, 0%, 98%)',
      'white': 'hsl(0, 0%, 100%)'
    },
    borderColor: {
      'dT-darkBlue': 'hsl(209, 23%, 22%)',
      'white': 'hsl(0, 0%, 100%)'
    },
    textColor: {
      'darkBlue': 'hsl(200, 15%, 8%)',
      'darkGray': 'hsl(0, 0%, 52%)',
      'white': 'hsl(0, 0%, 100%)'
    },
    boxShadow: {
      'lT-shadow': '1px 2px 0px 1px #00000000, 0px 0px 15px 0px #0000001c;',
    }
  },
  plugins: [],
}
