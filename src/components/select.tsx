import { ComponentProps } from 'react'
import { ChevronDownIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

type OptionProps = {
  label: string
  value: string
}

interface SelectProps extends ComponentProps<'select'> {
  label?: string
  options: OptionProps[]
}

export function Select({ label, options = [], ...attrs }: SelectProps) {
  const { id, name, className } = attrs

  const selecteId = id ?? name

  return (
    <div className="w-full flex flex-col items-start mb-[1.6rem]">
      {!!label && (
        <label className="mb-[0.8rem] text-[1.2rem]" htmlFor={selecteId}>
          {label}
        </label>
      )}

      <div className="relative w-full h-[4rem] flex items-center border border-gray-900 rounded-[0.8rem] overflow-hidden focus-within:border-[transparent] focus-within:outline outline-2 outline-green-600">
        <select
          id={selecteId}
          className={cn(
            `appearance-none flex-1 h-full px-[1.6rem] py-0 text-[1.4rem] bg-black-100 text-white-100 placeholder-gray-700 focus:outline-none`,
            className
          )}
          {...attrs}
        >
          <option defaultChecked>Selecione um professor</option>
          {options.length > 0
            ? options.map(({ label, value }) => (
                <option key={value} value={value} className="text-white-100">
                  {label}
                </option>
              ))
            : null}
        </select>

        <ChevronDownIcon
          size={18}
          className="absolute right-[1.6rem] text-gray-700"
        />
      </div>
    </div>
  )
}
