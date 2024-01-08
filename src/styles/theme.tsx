import { createStitches } from '@stitches/react'

import { colors } from './tokens'

export const { createTheme, css, globalCss, styled, theme } = createStitches({
  prefix: 'marcosrenedev',

  theme: {
    colors,
    fonts: {
      base: 'Inter, sans-serif',
    },
    fontSizes: {
      default: '1rem',
    },
  },
})
