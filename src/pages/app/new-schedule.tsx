import { Helmet } from 'react-helmet-async'

import { Breadcrumbs } from '@/components/breadcrumbs'

export function NewSchedule() {
  return (
    <>
      <Helmet title="Novo" />

      <Breadcrumbs
        breadcrumbs={[
          { label: 'Geral', href: '/' },
          { label: 'Dashboard', href: '/' },
          { label: 'Novo', href: '/new-schedule', activeLink: true },
        ]}
      />

      <div>NewSchedule</div>
    </>
  )
}
