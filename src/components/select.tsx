import { ComponentProps } from 'react'
import { ChevronDownIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

type OptionProps = {
  label: string
  value: string
}

interface SelectProps extends ComponentProps<'select'> {
  label?: string
  options: OptionProps[] | undefined
}

export function Select({ label, options = [], ...attrs }: SelectProps) {
  const { id, name, className } = attrs

  const selecteId = id ?? name

  return (
    <div className="w-full flex flex-col items-start mb-4">
      {!!label && (
        <label className="mb-2 text-sm text-gray-100" htmlFor={selecteId}>
          {label}
        </label>
      )}

      <div className="relative w-full h-10 flex items-center border border-gray-900 rounded-lg overflow-hidden focus-within:border-[transparent] focus-within:outline outline-2 outline-green-600">
        <select
          id={selecteId}
          className={cn(
            `appearance-none flex-1 h-full px-4 py-0 text-sm bg-black-100 placeholder-gray-700 focus:outline-none`,
            className
          )}
          {...attrs}
        >
          <option defaultChecked>Selecione um professor</option>
          {options?.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        <ChevronDownIcon size={18} className="absolute right-4 text-gray-700" />
      </div>
    </div>
  )
}
