import { ScaleValue, createStitches, defaultThemeMap } from '@stitches/react'

import { colors, spaces as space, fontSizes, radii } from './tokens'

export const { createTheme, css, globalCss, styled, theme } = createStitches({
  prefix: 'marcosrenedev',

  themeMap: {
    ...defaultThemeMap,
    width: 'space',
    height: 'space',
  },

  theme: {
    colors,
    fonts: {
      base: 'Inter, sans-serif',
    },
    fontSizes,
    radii,
    space,
  },

  utils: {
    px: (value: ScaleValue<'space'>) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value: ScaleValue<'space'>) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
  },
})
