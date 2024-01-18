import { Link } from 'react-router-dom'
import { LayoutGrid, User } from 'lucide-react'

export function Sidebar() {
  return (
    <aside className="w-[25rem]">
      <div className="flex flex-col">
        <span className="text-[1.4rem] font-bold text-gray-300 uppercase">
          Geral
        </span>

        <div className="my-[3.2rem] flex items-start flex-col gap-8">
          <div className="flex items-center gap-4 transition-colors hover:text-green-500">
            <LayoutGrid size={20} />
            <Link to="/" className="font-medium leading-[100%]">
              Dashboard
            </Link>
          </div>

          <div className="flex items-center gap-4 transition-colors hover:text-green-500">
            <User size={20} />
            <Link to="/profile" className="font-medium leading-[100%]">
              Perfil
            </Link>
          </div>
        </div>
      </div>
    </aside>
  )
}
