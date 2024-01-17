/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: '"Inter", sans-serif',
        logo: '"Montserrat", sans-serif',
      },
      colors: {
        white: 'hsl(0, 0%, 100%)',
        'white-100': 'hsl(0, 0%, 98%)',
        black: 'hsl(0, 0%, 0%)',
        'black-100': 'hsl(240, 10%, 4%)',

        'gray-100': 'hsl(240, 6%, 90%)',
        'gray-500': 'hsl(240, 5%, 65%)',
        'gray-900': 'hsl(240, 4%, 16%)',

        'green-50': 'hsl(146, 76%, 94%)',
        'green-100': 'hsl(146, 51%, 84%)',
        'green-200': 'hsl(145, 48%, 75%)',
        'green-300': 'hsl(145, 46%, 65%)',
        'green-400': 'hsl(145, 46%, 55%)',
        'green-500': 'hsl(145, 46%, 45%)',
        'green-600': 'hsl(145, 48%, 35%)',
        'green-700': 'hsl(146, 50%, 24%)',
        'green-800': 'hsl(146, 58%, 14%)',
        'green-900': 'hsl(137, 100%, 4%)',
      },
    },
  },
  plugins: [],
}
