import { NavLink, useLocation, useParams } from 'react-router-dom'
import { LayoutGrid, User } from 'lucide-react'

import { isLinkActive } from '@/utils/active-link'

export function Sidebar() {
  const location = useLocation()
  const params = useParams()

  const pathnames = ['/new-schedule', `/${params.id}/edit-schedule`]

  const { isActiveLink } = isLinkActive({
    pathnames,
    currentPath: location.pathname,
  })

  return (
    <aside className="w-full max-w-[25rem] h-[calc(100vh-120px)] pb-[1.6rem] flex flex-col justify-between">
      <div>
        <span className="text-[1.4rem] font-bold text-gray-300 uppercase">
          Geral
        </span>

        <div className="my-[3.2rem] flex items-start flex-col">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `w-full mb-[2.4rem] flex items-center gap-4 transition-colors hover:text-green-500 font-medium leading-[100%] ${(isActive || isActiveLink) && 'text-green-500'}`
            }
            title="Início"
          >
            <LayoutGrid size={20} />
            Início
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `w-full mb-[2.4rem] flex items-center gap-4 transition-colors hover:text-green-500 font-medium leading-[100%] ${isActive && 'text-green-500'}`
            }
            title="Perfil"
          >
            <User size={20} />
            Perfil
          </NavLink>
        </div>
      </div>
    </aside>
  )
}
