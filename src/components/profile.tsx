import { useCallback, useState } from 'react'
import { LogOutIcon } from 'lucide-react'

import { Dropdownm } from './dropdown'

export function Profile() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleDropdownOpen = useCallback(() => {
    setIsDropdownOpen((prevState) => !prevState)
  }, [])

  return (
    <div className="relative">
      <div
        className="flex items-center gap-8"
        onClick={handleDropdownOpen}
        aria-label="Abrir modal"
        title="Abrir modal"
      >
        <div className="hidden sm:flex flex-col items-end">
          <span>Marcos Renê</span>
          <span className="text-gray-500 text-[1.4rem]">
            marcosrenedev@gmail.com
          </span>
        </div>

        <img
          className="inline-block h-[4.8rem] w-[4.8rem] rounded-full cursor-pointer"
          src="https://avatars.githubusercontent.com/MarcosRene"
          alt=""
        />
      </div>

      {isDropdownOpen && (
        <Dropdownm.Root isOpen={isDropdownOpen} onClose={setIsDropdownOpen}>
          <Dropdownm.Item className="font-medium gap-4 text-gray-100">
            <Dropdownm.Icon icon={LogOutIcon} />
            Sair
          </Dropdownm.Item>
        </Dropdownm.Root>
      )}
    </div>
  )
}
