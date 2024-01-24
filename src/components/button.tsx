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
        `h-[4rem] py-0 px-[1.6rem] flex ${rlt ? 'flex-row-reverse' : 'flex-row'} items-center justify-center text-[1.4rem] leading-[100%] font-semibold bg-green-600 transition-colors hover:bg-green-700 rounded-[0.8rem]`,
        className
      )}
      {...attrs}
    >
      {!!Icon && <Icon size={iconSize} className="flex-shrink-0" />}
      {children}
    </button>
  )
}
