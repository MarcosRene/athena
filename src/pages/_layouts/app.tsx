import { Outlet } from 'react-router-dom'

import { Sidebar } from '@/components/sidebar'
import { Profile } from '@/components/profile'

export function AppLayout() {
  return (
    <div className="container h-screen px-6 m-auto flex justify-start flex-col">
      <div className="h-full flex">
        <Sidebar />

        <div className="ml-0 w-full lg:ml-6 mb-12">
          <header className="mt-6 mb-12 flex items-center justify-end">
            <Profile />
          </header>

          <Outlet />
        </div>
      </div>
    </div>
  )
}
