import { ComponentProps, ElementType, useState } from 'react'

import { cn } from '@/lib/utils'

interface TextInputProps extends ComponentProps<'input'> {
  icon?: ElementType
  label?: string
  fullFilled?: boolean
}

export function Input({
  icon: Icon,
  label,
  fullFilled = false,
  ...attrs
}: TextInputProps) {
  const [isFocused, setFocused] = useState(false)

  const { id, name, className } = attrs

  const inputId = id ?? name

  return (
    <div
      className={`${fullFilled ? 'w-full sm:w-72' : 'w-full'} flex flex-col items-start mb-4`}
    >
      {!!label && (
        <label className="mb-2 text-sm" htmlFor={inputId}>
          {label}
        </label>
      )}

      <div className="w-full relative h-10 flex items-center border border-gray-900 rounded-lg overflow-hidden focus-within:border-transparent focus-within:outline outline-2 outline-green-600">
        {!!Icon && (
          <Icon
            size={16}
            className={`absolute left-3 text-gray-700 ${isFocused && 'text-green-600'}`}
          />
        )}

        <input
          id={inputId}
          className={cn(
            `flex-1 h-full pr-4 ${!Icon ? 'pl-4' : 'pl-10'} py-0 text-sm bg-black-100 placeholder-gray-700 focus:outline-none`,
            className
          )}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...attrs}
        />
      </div>
    </div>
  )
}
