import { useCallback, useState } from 'react'
import { LogOutIcon } from 'lucide-react'

import { Dropdown } from './dropdown'

export function Profile() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleDropdownOpen = useCallback(() => {
    setIsDropdownOpen((prevState) => !prevState)
  }, [])

  return (
    <div className="relative">
      <div
        className="flex items-center gap-4"
        onClick={handleDropdownOpen}
        aria-label="Abrir modal"
        title="Abrir modal"
      >
        <div className="hidden sm:flex flex-col items-end">
          <span>Marcos Renê</span>
          <span className="text-gray-500 text-sm">marcosrenedev@gmail.com</span>
        </div>

        <img
          className="inline-block h-12 w-12 rounded-full cursor-pointer"
          src="https://avatars.githubusercontent.com/MarcosRene"
          alt=""
        />
      </div>

      {isDropdownOpen && (
        <Dropdown
          options={[
            {
              icon: LogOutIcon,
              label: 'Sair',
            },
          ]}
        />
      )}
    </div>
  )
}
