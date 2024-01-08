import { globalCss } from './theme'

export const globalStyles = globalCss({
  '*': { margin: 0, padding: 0 },

  html: {
    fontFamily: '$base',
    fontSize: '$md',
    background: '$black100',
    color: '$white100',
  },
})
