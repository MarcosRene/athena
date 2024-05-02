import {
  ComponentProps,
  ForwardRefRenderFunction,
  ReactNode,
  forwardRef,
} from 'react'

import './styles.css'

interface FieldProps extends ComponentProps<'div'> {
  children: ReactNode
}

const BaseField: ForwardRefRenderFunction<HTMLDivElement, FieldProps> = (
  { children, ...props },
  ref
) => {
  return (
    <div ref={ref} className="field-container" {...props}>
      {children}
    </div>
  )
}

export const Field = forwardRef(BaseField)
