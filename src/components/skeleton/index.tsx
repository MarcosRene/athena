import { ComponentProps } from 'react'

import './styles.css'

interface SkeletonProps extends ComponentProps<'div'> {}

export function Skeleton({ ...props }: SkeletonProps) {
  return (
    <div className={`skeleton-container animate-pulse ${props.className}`} />
  )
}
