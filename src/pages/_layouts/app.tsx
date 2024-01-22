import { Outlet } from 'react-router-dom'

import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'

export function AppLayout() {
  return (
    <div className="container px-[2.4rem] h-screen m-auto flex justify-start flex-col">
      <Header />

      <div className="h-full flex">
        <Sidebar />

        <div className="ml-[2.4rem]">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
