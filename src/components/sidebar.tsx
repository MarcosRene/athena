import { NavLink, useLocation, useParams } from 'react-router-dom'
import { LayoutGrid, User, LogOut } from 'lucide-react'

import { Button } from './button'

import { isLinkActive } from '@/utils/active-link'

export function Sidebar() {
  const location = useLocation()
  const params = useParams()

  const pathnames = ['/new-schedule', `/${params.id}/edit-schedule`]

  const isActiveLink = isLinkActive(pathnames, location.pathname)

  return (
    <aside className="w-full max-w-[25rem] pb-[1.6rem] flex flex-col justify-between">
      <div>
        <span className="text-[1.4rem] font-bold text-gray-300 uppercase">
          Geral
        </span>

        <div className="my-[3.2rem] flex items-start flex-col gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `w-full flex items-center gap-4 transition-colors hover:text-green-500 font-medium leading-[100%] ${(isActive || isActiveLink) && 'text-green-500'}`
            }
          >
            <LayoutGrid size={20} />
            Início
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `w-full flex items-center gap-4 transition-colors hover:text-green-500 font-medium leading-[100%] ${isActive && 'text-green-500'}`
            }
          >
            <User size={20} />
            Perfil
          </NavLink>
        </div>
      </div>

      <Button
        className="justify-start gap-4 bg-transparent p-0 hover:bg-transparent hover:text-green-500"
        icon={LogOut}
      >
        Sair
      </Button>
    </aside>
  )
}
