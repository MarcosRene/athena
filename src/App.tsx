import 'react-datepicker/dist/react-datepicker.css'
import './global.css'
import '@/lib/date-fns'

import { RouterProvider } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner'

import { AuthProvider } from './contexts/auth'
import { router } from './routes'

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <AuthProvider>
        <HelmetProvider>
          <Helmet titleTemplate="%s | Athena" />

          <RouterProvider router={router} />
          <Toaster position="bottom-center" richColors />
        </HelmetProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}
