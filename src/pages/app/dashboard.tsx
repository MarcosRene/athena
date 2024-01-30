import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { PlusIcon } from 'lucide-react'

import { Button } from '@/components/button'
import { Breadcrumbs } from '@/components/breadcrumbs'

import { ListSchedules } from './list-schedules'

export function Dashboard() {
  const navigate = useNavigate()

  return (
    <>
      <Helmet title="Dashboard" />

      <div className="flex items-start justify-between">
        <Breadcrumbs breadcrumbs={[{ label: 'Dashboard', href: '/' }]} />

        <Button
          icon={PlusIcon}
          iconSize={18}
          rlt
          className="uppercase font-medium gap-2"
          onClick={() => navigate('/new-schedule', { replace: true })}
        >
          Criar
        </Button>
      </div>

      <ListSchedules />
    </>
  )
}
