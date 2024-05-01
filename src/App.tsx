import 'react-datepicker/dist/react-datepicker.css'
import './global.css'
import '@/lib/date-fns'

import { RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner'

import { queryClient } from './lib/query-client'
import { AuthProvider } from './contexts/auth'
import { router } from './routes'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster position="bottom-center" richColors />
      </AuthProvider>
    </QueryClientProvider>
  )
}
