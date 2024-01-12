import { Outlet } from 'react-router-dom'

export function DashboardLayout() {
  return (
    <div className="w-full h-screen flex justify-start flex-col bg-black100">
      <nav className="py-4 px-8 h-[5.6rem] flex items-center justify-between">
        <h1 className="text-6xl font-sans font-extrabold leading-normal">
          ui
          <span className="text-pink-500">.</span>
        </h1>

        <button>Sign In</button>
      </nav>

      <Outlet />
    </div>
  )
}
