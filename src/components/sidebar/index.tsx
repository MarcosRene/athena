import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarClock, Menu } from 'lucide-react'

import { useIsMobile } from '@/hooks/useIsMobile'

import { Button } from '../button'
import { SidebarNav } from './sidebar-nav'

export function Sidebar() {
  const isMobile = useIsMobile()
  const [isDrawerSidebar, setIsDrawerSidebar] = useState(false)

  const handleDrawerSidebar = () =>
    setIsDrawerSidebar((prevState) => !prevState)

  if (isMobile) {
    return (
      <>
        <Button.Root
          className="flex w-6 h-w-6 p-4 bg-transparent absolute top-6 left-6 lg:hidden"
          onClick={handleDrawerSidebar}
          aria-label="Open button sidebar"
        >
          <Button.Icon name={Menu} />
        </Button.Root>

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
    <aside className="min-w-56 pb-4 hidden lg:flex flex-col">
      <Link
        to="/"
        className="mt-6 mb-12 text-2xl font-logo font-extrabold leading-normal"
      >
        <span className="h-12 flex items-center gap-4">
          <CalendarClock size={24} className="text-green-500" />
          Athena
        </span>
      </Link>

      <SidebarNav />
    </aside>
  )
}
