import { NavLink, useLocation, useParams } from 'react-router-dom'
import { X, LayoutGrid, User2 } from 'lucide-react'

import { isLinkActive } from '@/utils/active-link'

import { Button } from '../button'

interface SidebarNavProps {
  onClose?: () => void
}

export function SidebarNav({ onClose }: SidebarNavProps) {
  const location = useLocation()
  const params = useParams()

  const pathnames = ['/new-schedule', `/${params.id}/edit-schedule`]

  const { isActiveLink } = isLinkActive({
    pathnames,
    currentPath: location.pathname,
  })

  return (
    <div className="sidebar-nav__container">
      <span className="sidebar-nav__head">
        <h1>Geral</h1>

        {!!onClose && (
          <Button onClick={onClose}>
            <X size={20} />
          </Button>
        )}
      </span>

      <div className="sidebar-nav__body">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${(isActive || isActiveLink) && 'active-link'}`
          }
          title="Início"
        >
          <LayoutGrid size={20} />
          Início
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) => `${isActive && 'active-link'}`}
          title="Perfil"
        >
          <User2 size={20} />
          Perfil
        </NavLink>
      </div>
    </div>
  )
}
