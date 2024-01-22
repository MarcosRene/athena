import { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

interface TextareaProps extends ComponentProps<'textarea'> {
  label?: string
}

export function Textarea({ label, ...attrs }: TextareaProps) {
  const { id, name, className } = attrs

  const textAreaId = id ?? name

  return (
    <div className="flex flex-col items-start">
      {!!label && (
        <label
          className="mb-[0.8rem] text-[1.2rem] font-medium block"
          htmlFor={textAreaId}
        >
          {label}
        </label>
      )}

      <textarea
        id={textAreaId}
        className={cn(
          'w-full min-h-[10rem] resize-y px-[1.6rem] pt-[1.2rem] text-[1.4rem] bg-black-100 text-white-100 placeholder-gray-700 rounded-[0.8rem] border border-gray-900 transition-colors focus:outline outline-2 outline-green-600 ',
          className
        )}
        {...attrs}
      />
    </div>
  )
}
