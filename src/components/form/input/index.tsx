import { ComponentProps } from 'react'

import './styles.css'

interface InputProps extends ComponentProps<'input'> {}

export function Input({ ...props }: InputProps) {
  return <input className="input-container" {...props} />
}
