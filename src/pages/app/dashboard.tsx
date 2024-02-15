import { ChangeEvent, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { PlusIcon, SearchIcon } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/button'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Input } from '@/components/input'

import { useDebounce } from '@/hooks/useDebounce'

import { GetSchedulesResponse, getSchedules } from '@/services/get-schedules'

import { Schedules } from './schedules'

export function Dashboard() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const subject = searchParams.get('subject')

  const [searchTerm, setSearchTerm] = useState(subject ?? '')
  const [isLoading, setIsLoading] = useState(false)

  const [schedules, setSchedules] = useState<GetSchedulesResponse[]>([])

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

  useEffect(() => {
    const controller = new AbortController()

    async function fetchSchedules() {
      setIsLoading(true)

      try {
        const data = await getSchedules({
          query: debouncedValue,
          signal: controller.signal,
        })

        setSchedules(data)
      } catch (error) {
        toast.error('Não foi possível carregar os agendamentos.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchSchedules()

    return () => controller.abort()
  }, [debouncedValue])

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
