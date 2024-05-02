import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarClock, Menu } from 'lucide-react'

import { useIsMobile } from '@/hooks/useIsMobile'

import { Button } from '../button'
import { SidebarNav } from './sidebar-nav'

import './styles.css'

export function Sidebar() {
  const isMobile = useIsMobile()
  const [isDrawerSidebar, setIsDrawerSidebar] = useState(false)

  const handleDrawerSidebar = () =>
    setIsDrawerSidebar((prevState) => !prevState)

  if (isMobile) {
    return (
      <>
        <Button
          className="sidebar-button"
          onClick={handleDrawerSidebar}
          aria-label="Open button sidebar"
        >
          <Menu size={20} />
        </Button>

        {isDrawerSidebar && (
          <div className="sidebar-overlay">
            <aside className="sidebar-container-mobile">
              <SidebarNav onClose={handleDrawerSidebar} />
            </aside>
          </div>
        )}
      </>
    )
  }

  return (
    <aside className="sidebar-container-desktop">
      <Link to="/">
        <span>
          <CalendarClock size={24} />
          Athena
        </span>
      </Link>

      <SidebarNav />
    </aside>
  )
}
