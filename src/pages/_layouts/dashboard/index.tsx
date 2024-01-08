import { Outlet } from 'react-router-dom'

import { Button } from '@/components/Button'

export function DashboardLayout() {
  return (
    <div className="w-full flex justify-start flex-col">
      <nav className="py-4 px-8 h-[5.6rem] flex items-center justify-between">
        <h1 className="text-5xl leading-normal font-extrabold">
          ui
          <span className="text-pink-500">.</span>
        </h1>

        <Button variant="primary">Sign In</Button>
      </nav>

      <Outlet />
    </div>
  )
}
