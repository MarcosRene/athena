import { ComponentProps } from 'react'

import './styles.css'

interface ButtonProps extends ComponentProps<'button'> {}

export function Button({ ...props }: ButtonProps) {
  return <button type="button" className="button__container" {...props} />
}
