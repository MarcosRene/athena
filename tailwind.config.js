/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        white100: '#fafafa',
        black: '#000000',
        black100: '#09090b',

        gray100: '#e4e4e7',
        gray500: '#a1a1aa',
        gray900: '#27272a',

        pink500: '#E91E63',
        pink600: '#d11455',
      },
    },
  },
  plugins: [],
}
