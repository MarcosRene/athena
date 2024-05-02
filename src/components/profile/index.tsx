import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'

import { useAuth } from '@/contexts/auth'

import { Dropdown } from '../dropdown'

import './styles.css'

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
    <div className="profile-container">
      <div
        className="profile-content"
        onClick={handleDropdownOpen}
        aria-label="Abrir modal"
        title="Abrir modal"
      >
        <div className="profile-infor">
          <span>{user.name}</span>
          <span>{user.email}</span>
        </div>

        {user.avatar ? (
          <img src={user.avatar} alt={`Avatar do usuário ${user.name}`} />
        ) : (
          <div className="profile-preview">{user.name.slice(0, 2)}</div>
        )}
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
