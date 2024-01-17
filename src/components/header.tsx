import { Link } from 'react-router-dom'
import { CalendarClock } from 'lucide-react'

export function Header() {
  return (
    <nav className="h-[8rem] px-12 flex items-center justify-between">
      <Link
        to="/"
        className="hidden text-[2.4rem] font-logo font-extrabold leading-normal sm:block"
      >
        <a className="flex items-center gap-4">
          <CalendarClock size={24} className="text-green-500" />
          Athena
        </a>
      </Link>

      <Link
        to="/sign-in"
        className="h-[4rem] py-0 px-[1.6rem] text-[1.4rem] leading-[100%] font-semibold bg-green-600 rounded-[0.8rem] transition-colors flex items-center justify-center hover:bg-green-700"
      >
        Sign Out
      </Link>
    </nav>
  )
}
