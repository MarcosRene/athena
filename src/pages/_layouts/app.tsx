import { Outlet } from 'react-router-dom'

import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'

export function AppLayout() {
  return (
    <div className="container px-[2.4rem] m-auto flex justify-start flex-col">
      <Header />

      <div className="h-full flex">
        <Sidebar />

        <div className="w-full ml-[2.4rem] mb-[4.8rem]">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
