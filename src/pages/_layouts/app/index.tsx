import { Outlet } from 'react-router-dom'

import { Sidebar } from '@/components/sidebar'
import { Profile } from '@/components/profile'

import './styles.css'

export function AppLayout() {
  return (
    <main className="app-layout">
      <div className="app-layout__container">
        <Sidebar />

        <div className="app-layout__content">
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
