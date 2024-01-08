import { Helmet } from 'react-helmet-async'

export function Dashboard() {
  return (
    <div className="m-8">
      <Helmet title="Dashboard" />
      <span>Dashboard</span>
    </div>
  )
}
