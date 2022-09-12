/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "main-bg": "hsl(180, 52%, 96%)",
        "drkCyan": "hsl(180, 29%, 50%)",
        "lgGrCyan": "hsl(180, 31%, 95%)",
        "drkGrCyan": " hsl(180, 8%, 52%)",
        "vrGrCyan": "hsl(180, 14%, 20%)"
      },
    },
  },
  plugins: [],
}
