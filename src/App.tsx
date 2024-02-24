import 'react-datepicker/dist/react-datepicker.css'
import './global.css'
import '@/lib/date-fns'

import { RouterProvider } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'sonner'

import { AuthProvider } from './contexts/auth'
import { router } from './routes'

export function App() {
  return (
    <AuthProvider>
      <HelmetProvider>
        <Helmet titleTemplate="%s | Athena" />

        <RouterProvider router={router} />
        <Toaster position="bottom-center" richColors />
      </HelmetProvider>
    </AuthProvider>
  )
}
