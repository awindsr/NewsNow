/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primaryBg: '#f6f4f0',
      },
      fontFamily:{
        poppins: ['Poppins', 'sans-serif'],
        newsreader: ['Newsreader', 'sans-serif'],

      }
    },
  },
  plugins: [],
}

