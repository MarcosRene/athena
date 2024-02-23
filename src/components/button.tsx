import { ElementType, ComponentProps } from 'react'

import { cn } from '@/lib/utils'

interface RootProps extends ComponentProps<'button'> {}

function Root({ className, ...props }: RootProps) {
  return (
    <button
      type="button"
      className={cn(
        'h-10 py-0 px-3 flex items-center justify-center text-white text-sm leading-none font-semibold bg-green-600 transition-colors hover:bg-green-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-600',
        className
      )}
      {...props}
    />
  )
}

interface IconProps extends ComponentProps<'div'> {
  name: ElementType
  size?: number
}

function Icon({ name: IconName, size, className, ...props }: IconProps) {
  return (
    <IconName
      className={cn('flex-shrink-0', className)}
      size={size}
      {...props}
    />
  )
}

export const Button = {
  Root,
  Icon,
}
