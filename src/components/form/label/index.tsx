import type { ComponentProps, ReactNode } from 'react'

import './styles.css'

interface LabelProps extends ComponentProps<'label'> {
  children: ReactNode
}

export function Label({ children, ...props }: LabelProps) {
  return (
    <label className="label__container" {...props}>
      {children}
    </label>
  )
}
