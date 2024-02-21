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
    <div className="block">
      <span className="font-bold uppercase flex items-center justify-between">
        <h1>Geral</h1>

        {!!onClose && (
          <Button.Root className="w-6 h-6 p-4 bg-transparent" onClick={onClose}>
            <Button.Icon name={X} className="size-5" />
          </Button.Root>
        )}
      </span>

      <div className="my-8 flex items-start flex-col">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `w-full mb-6 flex items-center gap-4 transition-colors hover:text-green-500 font-medium leading-none ${(isActive || isActiveLink) && 'text-green-500'}`
          }
          title="Início"
        >
          <LayoutGrid size={20} />
          Início
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `w-full mb-6 flex items-center gap-4 transition-colors hover:text-green-500 font-medium leading-none ${isActive && 'text-green-500'}`
          }
          title="Perfil"
        >
          <User2 size={20} />
          Perfil
        </NavLink>
      </div>
    </div>
  )
}
