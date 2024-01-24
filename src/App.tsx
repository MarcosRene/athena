import './global.css'
import '@/lib/dayjs'

import { RouterProvider } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'sonner'

import { router } from './routes'

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | Athena" />

      <RouterProvider router={router} />
      <Toaster richColors />
    </HelmetProvider>
  )
}
