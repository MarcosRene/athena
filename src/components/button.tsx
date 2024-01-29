import { ElementType, type ComponentProps } from 'react'

import { cn } from '@/lib/utils'

interface ButtonProps extends ComponentProps<'button'> {
  icon?: ElementType
  iconSize?: number
  rlt?: boolean
}

export function Button({
  children,
  className,
  icon: Icon,
  iconSize,
  rlt,
  ...attrs
}: ButtonProps) {
  return (
    <button
      className={cn(
        `button ${rlt ? 'flex-row-reverse' : 'flex-row'}`,
        className
      )}
      {...attrs}
    >
      {!!Icon && <Icon size={iconSize} className="flex-shrink-0" />}
      {children}
    </button>
  )
}
