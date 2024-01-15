import { Outlet, Link } from 'react-router-dom'

export function AppLayout() {
  return (
    <div className="w-full h-screen flex justify-start flex-col bg-black100">
      <nav className="h-[8rem] px-12 flex items-center justify-between">
        <h1 className="text-[6rem] font-sans font-extrabold leading-normal">
          ui
          <span className="text-pink500">.</span>
        </h1>

        <Link to="/sign-in" className="btn">
          Sign Out
        </Link>
      </nav>

      <Outlet />
    </div>
  )
}
