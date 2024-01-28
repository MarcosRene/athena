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
          className="flex lg:hidden w-[2.4rem] h-[2.4rem] p-[1.6rem] bg-transparent absolute top-12 left-8 md:left-14"
          onClick={handleDrawerSidebar}
          aria-label="Open button sidebar"
        />

        {isDrawerSidebar && (
          <div className="backdrop-blur-sm absolute inset-0 z-20 animate-fade-in">
            <aside className="w-full max-w-[25rem] h-screen p-[1.6rem] bg-black-100 border-r-[1px] border-r-gray-900">
              <SidebarNav onClose={handleDrawerSidebar} />
            </aside>
          </div>
        )}
      </>
    )
  }

  return (
    <aside className="w-full max-w-[25rem] pb-[1.6rem] hidden lg:flex flex-col">
      <Link
        to="/"
        className="mt-[2.4rem] mb-[4.8rem] text-[2.4rem] font-logo font-extrabold leading-normal"
      >
        <span className="h-[4.8rem] flex items-center gap-4">
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
