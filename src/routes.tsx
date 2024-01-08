import { createBrowserRouter } from 'react-router-dom'

import { DashboardLayout } from './pages/_layouts/dashboard'
import { Dashboard } from './pages/dashbard'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
    ],
  },
])
