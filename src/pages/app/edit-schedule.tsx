import { Helmet } from 'react-helmet-async'

import { Breadcrumbs } from '@/components/breadcrumbs'

export function EditSchedule() {
  return (
    <>
      <Helmet title="Editar" />

      <Breadcrumbs
        breadcrumbs={[
          { label: 'Geral', href: '/' },
          { label: 'Dashboard', href: '/' },
          { label: 'Editar', href: '/edit-schedule', activeLink: true },
        ]}
      />

      <div>EditSchedule</div>
    </>
  )
}
