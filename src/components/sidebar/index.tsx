import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarClockIcon, MenuIcon } from 'lucide-react'

import { useIsMobile } from '@/hooks/useIsMobile'

import { SidebarNav } from './sidebar-nav'
import { Button } from '../button'

export function Sidebar() {
  const isMobile = useIsMobile()
  const [isDrawerSidebar, setIsDrawerSidebar] = useState(false)

  const handleDrawerSidebar = () => {
    setIsDrawerSidebar((prevState) => !prevState)
  }

  if (isMobile) {
    return (
      <>
        <Button
          icon={MenuIcon}
          iconSize={20}
          className="flex lg:hidden w-6 h-w-6 p-4 bg-transparent absolute top-12 left-8 md:left-14"
          onClick={handleDrawerSidebar}
          aria-label="Open button sidebar"
        />

        {isDrawerSidebar && (
          <div className="backdrop-blur-sm absolute inset-0 z-20 animate-fade-in">
            <aside className="w-full max-w-64 h-screen p-4 bg-black-100 border-r-[1px] border-r-gray-900">
              <SidebarNav onClose={handleDrawerSidebar} />
            </aside>
          </div>
        )}
      </>
    )
  }

  return (
    <aside className="w-full max-w-64 pb-4 hidden lg:flex flex-col">
      <Link
        to="/"
        className="mt-6 mb-12 text-2xl font-logo font-extrabold leading-normal"
      >
        <span className="h-12 flex items-center gap-4">
          <CalendarClockIcon
            size={24}
            className="text-green-500"
            aria-label="Close button"
          />
          Athena
        </span>
      </Link>

      <SidebarNav />
    </aside>
  )
}
