import { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

interface TextareaFieldProps extends ComponentProps<'div'> {}

export function TextareaField({ ...props }: TextareaFieldProps) {
  return <div className="w-full flex flex-col items-start" {...props} />
}

interface LabelProps extends ComponentProps<'label'> {}

export function Label({ className, ...props }: LabelProps) {
  return (
    <label className={cn('mb-2 text-sm text-gray-100', className)} {...props} />
  )
}

interface ControlProps extends ComponentProps<'textarea'> {}

export function Control({ className, ...props }: ControlProps) {
  return (
    <textarea
      className={cn(
        'w-full min-h-[10rem] resize-y px-4 pt-3 text-sm bg-black-100 placeholder-gray-700 rounded-lg border border-gray-900 transition-colors focus:outline outline-2 outline-green-600 ',
        className
      )}
      {...props}
    />
  )
}

export const Textarea = {
  TextareaField,
  Label,
  Control,
}
