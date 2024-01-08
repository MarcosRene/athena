import { convertToRem } from '@/utils/convertToRem'

export const colors = {
  white: '#ffffff',
  white100: '#fafafa',
  black: '#000000',
  black100: '#09090b',

  gray100: '#e4e4e7',
  gray500: '#a1a1aa',
  gray900: '#27272a',

  pink500: '#E91E63',
  pink600: '#d11455',
}

export const spaces = {
  4: convertToRem(4),
  8: convertToRem(8),
  12: convertToRem(12),
  16: convertToRem(16),
  20: convertToRem(20),
  24: convertToRem(24),
  28: convertToRem(28),
  32: convertToRem(32),
  36: convertToRem(36),
  40: convertToRem(40),
}

export const fontSizes = {
  sm: convertToRem(12),
  md: convertToRem(16),
  lg: convertToRem(20),
}

export const radii = {
  default: '4px',
  pill: '999999px',
}
