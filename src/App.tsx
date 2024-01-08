import './index.css'

import { RouterProvider } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'

import { globalStyles } from '@/styles/global'
import { router } from './routes'

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | ui.app" />

      <RouterProvider router={router} />

      {globalStyles()}
    </HelmetProvider>
  )
}
