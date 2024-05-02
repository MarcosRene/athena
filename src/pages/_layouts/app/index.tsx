import { Outlet } from 'react-router-dom'

import { Sidebar } from '@/components/sidebar'
import { Profile } from '@/components/profile'

import './styles.css'

export function AppLayout() {
  return (
    <main className="app-layout">
      <div className="app-layout-container">
        <Sidebar />

        <div className="app-layout-content">
          <header>
            <Profile />
          </header>

          <section>
            <Outlet />
          </section>
        </div>
      </div>
    </main>
  )
}
