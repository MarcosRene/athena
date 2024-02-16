import { ChangeEvent, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { PlusIcon, SearchIcon } from 'lucide-react'

import { Button } from '@/components/button'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Input } from '@/components/input'

import { useDebounce } from '@/hooks/useDebounce'
import { useFetch } from '@/hooks/useFetch'

import { Schedules } from './schedules'
import { ScheduleResponse } from '../types'

export function Dashboard() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const subject = searchParams.get('subject')

  const [searchTerm, setSearchTerm] = useState(subject ?? '')

  const debouncedValue = useDebounce(searchTerm)

  function handleSearchTerm(event: ChangeEvent<HTMLInputElement>) {
    const term = event.target.value

    setSearchParams((state) => {
      if (term) {
        state.set('subject', term)
      } else {
        state.delete('subject')
      }

      return state
    })

    setSearchTerm(term)
  }

  const { data: schedules, isLoading } = useFetch<ScheduleResponse[]>({
    url: '/schedules',
    query: {
      key: 'subject',
      value: debouncedValue,
    },
    errorMessage: 'Não foi possível carregar os agendamentos.',
  })

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

      <div className="flex flex-col items-end">
        <Input
          placeholder="Buscar por um agendamento"
          icon={SearchIcon}
          onChange={handleSearchTerm}
          value={searchTerm}
          fullFilled
        />

        <Schedules isLoading={isLoading} schedules={schedules} />
      </div>
    </>
  )
}
