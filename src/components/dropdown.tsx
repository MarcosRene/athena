import { ElementType } from 'react'

type DropdownOption = {
  label: string
  icon?: ElementType
  onClick: () => void
}

interface DropdownProps {
  options: DropdownOption[]
}

export function Dropdown({ options }: DropdownProps) {
  return (
    <ol className="absolute -bottom-2/4 translate-y-full right-0 max-w-fit bg-black-200 border border-gray-900 rounded-lg overflow-hidden">
      {options.map(({ icon: Icon, label, onClick }) => (
        <li
          key={label}
          className="w-32 py-3 px-4 text-sm border-b border-b-gray-900 flex items-center gap-2 transition-colors cursor-pointer hover:bg-gray-900 last:border-none"
          onClick={onClick}
        >
          {Icon && <Icon size={18} />}
          <span className="font-medium gap-4">{label}</span>
        </li>
      ))}
    </ol>
  )
}
