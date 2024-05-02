import { ComponentProps } from 'react'
import { ChevronDownIcon } from 'lucide-react'

import './styles.css'

type OptionProps = {
  label: string
  value: string
}

interface SelectProps extends ComponentProps<'select'> {
  options: OptionProps[] | undefined
}

export function Select({ options = [], ...props }: SelectProps) {
  return (
    <div className="select-container">
      <select {...props}>
        <option defaultChecked>Selecione um professor</option>
        {options?.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      <ChevronDownIcon size={18} />
    </div>
  )
}
