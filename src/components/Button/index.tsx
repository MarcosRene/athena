import { ButtonHTMLAttributes, PropsWithChildren } from 'react'

import * as Styled from './styles'

interface ButtonProps
  extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  variant: 'primary' | 'secondary'
}

export function Button({ variant, ...attrs }: ButtonProps) {
  return (
    <Styled.Root variant={variant} {...attrs}>
      Sign in 👈
    </Styled.Root>
  )
}
