/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{ts,tsx}', './index.html'],
  theme: {
    container: {
      center: true,
      screens: {
        '2xl': '1440px',
      },
    },
    extend: {
      fontFamily: {
        body: '"Inter", sans-serif',
        logo: '"Montserrat", sans-serif',
      },
      colors: {
        white: 'hsl(0, 0%, 100%)',
        'white-100': 'hsl(0, 0%, 95%)',
        'white-200': 'hsl(0, 40%, 96.1%)',

        black: 'hsl(0, 0%, 0%)',
        'black-100': 'hsl(240, 10%, 4%)',
        'black-200': 'hsl(240, 14%, 5%)',

        gray: {
          100: 'hsl(240, 6%, 90%)',
          500: 'hsl(240, 5%, 65%)',
          700: 'hsl(0, 0%, 46%)',
          900: 'hsl(240, 4%, 16%)',
        },

        green: {
          50: 'hsl(146, 76%, 94%)',
          100: 'hsl(146, 51%, 84%)',
          200: 'hsl(145, 48%, 75%)',
          300: 'hsl(145, 46%, 65%)',
          400: 'hsl(145, 46%, 55%)',
          500: 'hsl(145, 46%, 45%)',
          600: 'hsl(145, 48%, 35%)',
          700: 'hsl(146, 50%, 24%)',
          800: 'hsl(146, 58%, 14%)',
          900: 'hsl(137, 100%, 4%)',
        },
      },

      gridTemplateColumns: {
        'auto-fill': 'repeat(auto-fill, minmax(280px, 1fr))',
      },

      keyframes: {
        'slider-right-to-left': {
          '0%': { transform: 'translateX(100px)', opacity: 0 },
          '100%': { transform: 'translateX(0px)', opacity: 1 },
        },
        'slider-left-to-right': {
          '0%': { transform: 'translateX(-100px)', opacity: 0 },
          '100%': { transform: 'translateX(0px)', opacity: 1 },
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'fade-out': {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
      },
      animation: {
        'slider-right-to-left': 'slider-right-to-left 0.5s ease-in-out',
        'slider-left-to-right': 'slider-left-to-right 0.5s ease-in-out',
        'fade-in': 'fade-in 180ms forwards',
        'fade-out': 'fade-out 180ms forwards',
      },
    },
  },
  plugins: [],
}
