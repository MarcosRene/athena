import { Header } from '@/components/header'
import { Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <div className="w-full h-screen flex justify-start flex-col bg-black100">
      <Header />

      <div className="px-12">
        <Outlet />
      </div>
    </div>
  )
}
