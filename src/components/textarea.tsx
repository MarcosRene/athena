import { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

interface TextareaProps extends ComponentProps<'textarea'> {
  label?: string
}

export function Textarea({ label, ...attrs }: TextareaProps) {
  const { id, name, className } = attrs

  const textAreaId = id ?? name

  return (
    <div className="w-full flex flex-col items-start mb-4">
      {!!label && (
        <label className="mb-2 text-sm text-gray-100" htmlFor={textAreaId}>
          {label}
        </label>
      )}

      <textarea
        id={textAreaId}
        className={cn(
          'w-full min-h-[10rem] resize-y px-4 pt-3 text-sm bg-black-100 placeholder-gray-700 rounded-lg border border-gray-900 transition-colors focus:outline outline-2 outline-green-600 ',
          className
        )}
        {...attrs}
      />
    </div>
  )
}
