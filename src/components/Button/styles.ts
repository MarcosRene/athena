import { styled } from '@/styles/theme'

export const Root = styled('button', {
  appearance: 'none',

  height: '$40',
  px: '$16',
  fontFamily: '$base',
  fontWeight: 600,
  color: '$white100',

  borderRadius: '$default',
  border: '1px solid transparent',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',

  transition: 'background 180ms ease-in-out',

  '&:hover': {
    background: '$pink600',
  },

  variants: {
    variant: {
      primary: {
        background: '$pink500',
      },
      secondary: {
        background: 'transparent',
        borderColor: '$pink600',
      },
    },
  },

  defaultVariants: {
    variant: 'primary',
  },
})
