import { Link } from 'react-router-dom'
import { CalendarClock } from 'lucide-react'

import { Profile } from './profile'

export function Header() {
  return (
    <header className="mt-[2.4rem] mb-[4.8rem] flex items-center justify-between">
      <Link
        to="/"
        className="text-[2.4rem] font-logo font-extrabold leading-normal"
      >
        <span className="flex items-center gap-4">
          <CalendarClock size={24} className="text-green-500" />
          Athena
        </span>
      </Link>

      <Profile />
    </header>
  )
}
