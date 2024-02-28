import { ComponentProps, forwardRef, ForwardRefRenderFunction } from 'react'

import { cn } from '@/lib/utils'

interface FieldProps extends ComponentProps<'div'> {}

const Field: ForwardRefRenderFunction<HTMLDivElement, FieldProps> = (
  { className, ...props },
  ref
) => {
  return (
    <div
      ref={ref}
      className={cn('flex flex-col items-start group space-y-2', className)}
      {...props}
    />
  )
}

interface LabelProps extends ComponentProps<'label'> {}

function Label({ ...props }: LabelProps) {
  return <label className="inline-block text-sm text-gray-100" {...props} />
}

interface ContainerProps extends ComponentProps<'div'> {}

function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        'w-full relative h-10 flex items-center border border-gray-900 rounded-lg overflow-hidden focus-within:border-transparent focus-within:outline outline-2 outline-green-600 data-[invalid=true]:focus-within:outline-red-500',
        className
      )}
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
  Field: forwardRef(Field),
  Label,
  Container,
  Prefix,
  Control,
}
