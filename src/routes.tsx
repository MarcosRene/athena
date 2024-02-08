import { Navigate, createBrowserRouter } from 'react-router-dom'

import { useAuth } from '@/contexts/auth'

import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'
import { Dashboard } from './pages/app/dashboard'
import { NewSchedule } from './pages/app/new-schedule'
import { EditSchedule } from './pages/app/edit-schedule'
import { Profile } from './pages/app/profile'
import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'
import { NotFound } from './pages/404'

interface PrivateRoutesProps {
  children: React.ReactNode
}

function PrivateRoutes({ children }: PrivateRoutesProps) {
  const { signed } = useAuth()

  if (!signed) {
    return <Navigate to="/sign-in" replace />
  }

  return children
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoutes>
        <AppLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/new-schedule',
        element: <NewSchedule />,
      },
      {
        path: '/:id/edit-schedule',
        element: <EditSchedule />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignIn />,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-up',
        element: <SignUp />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
