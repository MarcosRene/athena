import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOutIcon } from 'lucide-react'

import { useAuth } from '@/contexts/auth'

import { Dropdown } from './dropdown'

export function Profile() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  function handleDropdownOpen() {
    setIsDropdownOpen((prevState) => !prevState)
  }

  function handleSignOut() {
    signOut()
    navigate('/sign-in')
  }

  return (
    <div className="relative">
      <div
        className="flex items-center gap-4"
        onClick={handleDropdownOpen}
        aria-label="Abrir modal"
        title="Abrir modal"
      >
        <div className="hidden sm:flex flex-col items-end">
          <span>{user.name}</span>
          <span className="text-gray-500 text-sm">{user.email}</span>
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
              onClick: handleSignOut,
            },
          ]}
        />
      )}
    </div>
  )
}
