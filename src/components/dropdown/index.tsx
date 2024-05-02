import { ElementType } from 'react'

import './styles.css'

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
    <ol className="dropdown-container">
      {options.map(({ icon: Icon, label, onClick }) => (
        <li key={label} onClick={onClick}>
          {Icon && <Icon size={18} />}
          <span>{label}</span>
        </li>
      ))}
    </ol>
  )
}
