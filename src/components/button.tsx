import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'

interface ButtonProps extends ComponentProps<'button'> {}

export function Button({ children, className }: ButtonProps) {
  return <button className={cn('btn', className)}>{children}</button>
}