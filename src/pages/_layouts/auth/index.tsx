import { Outlet } from 'react-router-dom'

import './styles.css'

export function AuthLayout() {
  return (
    <div className="auth_layout">
      <Outlet />
    </div>
  )
}
