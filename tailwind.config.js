/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        noto: ['Noto Sans KR', 'sans-serif']
      },
      colors: {
        palette1: '#7469b6',
        palette2: '#ad88c6',
        palette3: '#e1afd1',
        palette4: '#ffe6e6',
        palette5: '#ffffff',
        palette6: '#343434',
        palette7: '#454545',
        palette8: '#c05353'
      }
    }
  },
  plugins: []
};
