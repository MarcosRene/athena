import { NavLink, useLocation, useParams } from 'react-router-dom'
import { XIcon, LayoutGrid, User } from 'lucide-react'

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
    <div className="block">
      <span className="font-bold text-gray-300 uppercase flex items-center justify-between">
        <span>Geral</span>

        {!!onClose && (
          <Button
            icon={XIcon}
            iconSize={20}
            className="w-6 h-6 p-4 bg-transparent"
            onClick={onClose}
          ></Button>
        )}
      </span>

      <div className="my-8 flex items-start flex-col">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `w-full mb-6 flex items-center gap-4 transition-colors hover:text-green-500 font-medium leading-[100%] ${(isActive || isActiveLink) && 'text-green-500'}`
          }
          title="Início"
        >
          <LayoutGrid size={20} />
          Início
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `w-full mb-6 flex items-center gap-4 transition-colors hover:text-green-500 font-medium leading-[100%] ${isActive && 'text-green-500'}`
          }
          title="Perfil"
        >
          <User size={20} />
          Perfil
        </NavLink>
      </div>
    </div>
  )
}
