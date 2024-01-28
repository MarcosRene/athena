import { Outlet } from 'react-router-dom'

import { Sidebar } from '@/components/sidebar'
import { Profile } from '@/components/profile'

export function AppLayout() {
  return (
    <div className="container px-[2.4rem] m-auto flex justify-start flex-col">
      <div className="h-full flex">
        <Sidebar />

        <div className="ml-0 w-full md:ml-[2.4rem] mb-[4.8rem]">
          <header className="mt-[2.4rem] mb-[4.8rem] flex items-center justify-end">
            <Profile />
          </header>

          <Outlet />
        </div>
      </div>
    </div>
  )
}
