import { ComponentProps, forwardRef } from 'react'

import { cn } from '@/lib/utils'

interface FieldProps extends ComponentProps<'div'> {}

// eslint-disable-next-line react/display-name
const Field = forwardRef<HTMLDivElement, FieldProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col items-start group', className)}
        {...props}
      />
    )
  }
)

interface LabelProps extends ComponentProps<'label'> {}

function Label({ ...props }: LabelProps) {
  return (
    <label className="mb-2 inline-block text-sm text-gray-100" {...props} />
  )
}

interface ContainerProps extends ComponentProps<'div'> {}

function Container({ ...props }: ContainerProps) {
  return (
    <div
      className="w-full relative h-10 flex items-center border border-gray-900 rounded-lg overflow-hidden focus-within:border-transparent focus-within:outline outline-2 outline-green-600"
      {...props}
    />
  )
}

interface PrefixProps extends ComponentProps<'div'> {}

function Prefix({ className, ...props }: PrefixProps) {
  return (
    <div
      className={cn(
        'pl-3.5 text-gray-700 group-focus-within:text-green-600',
        className
      )}
      {...props}
    />
  )
}

interface ControlProps extends ComponentProps<'input'> {}

function Control({ className, ...props }: ControlProps) {
  return (
    <input
      className={cn(
        'flex-1 h-full px-3.5 text-sm bg-black-100 placeholder-gray-700 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-900/80 disabled:text-white-100/50',
        className
      )}
      {...props}
    />
  )
}

export const Input = {
  Field,
  Label,
  Container,
  Prefix,
  Control,
}
