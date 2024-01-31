import { ComponentProps, ElementType } from 'react'

import { cn } from '@/lib/utils'

type DropdownOption = {
  label: string
  icon?: ElementType
}

interface DropdownProps extends ComponentProps<'ol'> {
  options: DropdownOption[]
}

export function Dropdown({ options, className, ...attrs }: DropdownProps) {
  return (
    <ol
      className={cn(
        'absolute -bottom-2/4 translate-y-full right-0 max-w-fit bg-[#0c0c10] border border-gray-900 rounded-lg overflow-hidden',
        className
      )}
      {...attrs}
    >
      {options.map(({ icon: Icon = '', label }) => (
        <li
          key={label}
          className="w-32 py-3 px-4 text-sm border-b border-b-gray-900 flex items-center gap-2 transition-colors cursor-pointer hover:bg-gray-900 last:border-none"
        >
          <Icon size={18} />
          <span className="font-medium gap-4 text-gray-100">{label}</span>
        </li>
      ))}
    </ol>
  )
}
