import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'

interface ButtonProps extends ComponentProps<'button'> {}

export function Button({ children, className }: ButtonProps) {
  return (
    <button
      className={cn(
        'h-10 px-4 font-semibold border-0 rounded bg-pink500 flex justify-center items-center hover:bg-pink600 transition-colors ease-in-out',
        className
      )}
    >
      {children}
    </button>
  )
}
