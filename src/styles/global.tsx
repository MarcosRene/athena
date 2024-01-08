import { globalCss } from './theme'

export const globalStyles = globalCss({
  '*': { margin: 0, padding: 0 },

  '@font-face': [
    {
      fontDisplay: 'swap',
      fontFamily: 'Inter',
      fontStyle: 'normal',
      fontWeight: 400,
      src: 'url("../assets/fonts/inter-v13-latin-400.woff2") format("woff2")',
    },
    {
      fontDisplay: 'swap',
      fontFamily: 'Inter',
      fontStyle: 'normal',
      fontWeight: 500,
      src: 'url("../assets/fonts/inter-v13-latin-500.woff2") format("woff2")',
    },
    {
      fontDisplay: 'swap',
      fontFamily: 'Inter',
      fontStyle: 'normal',
      fontWeight: 600,
      src: 'url("../assets/fonts/inter-v13-latin-600.woff2") format("woff2")',
    },
    {
      fontDisplay: 'swap',
      fontFamily: 'Inter',
      fontStyle: 'normal',
      fontWeight: 700,
      src: 'url("../assets/fonts/inter-v13-latin-700.woff2") format("woff2")',
    },
  ],

  html: {
    fontFamily: '$base',
    fontSize: '$default',
    background: '$black100',
    color: '$white100',
  },
})
