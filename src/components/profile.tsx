import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'

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
        <div className="flex flex-col items-end">
          <span>{user.name}</span>
          <span className="text-gray-500 text-sm">{user.email}</span>
        </div>

        <img
          className="inline-block h-12 w-12 rounded-full cursor-pointer"
          src={user.avatar}
          alt={`Avatar do usuário ${user.name}`}
        />
      </div>

      {isDropdownOpen && (
        <Dropdown
          options={[
            {
              icon: LogOut,
              label: 'Sair',
              onClick: handleSignOut,
            },
          ]}
        />
      )}
    </div>
  )
}
