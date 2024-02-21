import { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

interface SkeletonProps extends ComponentProps<'div'> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-gray-900', className)}
      {...props}
    />
  )
}
