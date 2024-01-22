import { ComponentProps, ElementType, useState } from 'react'

import { cn } from '@/lib/utils'

interface TextInputProps extends ComponentProps<'input'> {
  icon?: ElementType
  label?: string
}

export function Input({ icon: Icon, label, ...attrs }: TextInputProps) {
  const [isFocused, setFocused] = useState(false)

  const { id, name, type = 'text', className } = attrs

  const inputId = id ?? name

  return (
    <div className="flex flex-col items-start mb-[1.6rem]">
      {!!label && (
        <label className=" mb-[0.8rem] text-[1.2rem]" htmlFor={inputId}>
          {label}
        </label>
      )}

      <div className="relative w-full h-[4rem] flex items-center border border-gray-900 rounded-[0.8rem] overflow-hidden focus-within:border-[transparent] focus-within:outline outline-2 outline-green-600">
        {!!Icon && (
          <Icon
            size={16}
            className={`absolute left-[1.2rem] text-gray-700 ${isFocused && 'text-green-600'}`}
          />
        )}

        <input
          id={inputId}
          type={type}
          className={cn(
            `flex-1 h-full pr-[1.6rem] ${!Icon ? 'pl-[1.6rem]' : 'pl-[4rem]'} py-0 text-[1.4rem] bg-black-100 text-white-100 placeholder-gray-700 focus:outline-none`,
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
