import { Breadcrumbs } from '@/components/breadcrumbs'
import { Helmet } from 'react-helmet-async'

export function Profile() {
  return (
    <>
      <Helmet title="Perfil" />

      <Breadcrumbs
        breadcrumbs={[
          { label: 'Geral', href: '/' },
          { label: 'Perfil', href: '/profile', activeLink: true },
        ]}
      />

      <span>Profile</span>
    </>
  )
}
