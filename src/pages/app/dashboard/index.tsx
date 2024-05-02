import { ChangeEvent, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/button'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Input } from '@/components/form/input'
import { Modal } from '@/components/modal'

import { useDebounce } from '@/hooks/useDebounce'

import { api } from '@/services/api'

import { Empty } from '@/pages/empty'
import { Schedules } from './schedules'
import { SchedulesSkeleton } from './skeletonSchedules'

import { useMutation, useQuery } from '@tanstack/react-query'
import { queryClient } from '@/lib/query-client'
import type { ScheduleResponse } from '../types'

import './styles.css'

export function Dashboard() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const subject = searchParams.get('subject')

  const [searchTerm, setSearchTerm] = useState(subject ?? '')
  const [scheduleId, setScheduleId] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

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

  function toggleModal() {
    setIsModalOpen((prevState) => !prevState)
  }

  function onSelectedScheduleId(scheduleId: string) {
    setScheduleId(scheduleId)
    toggleModal()
  }

  async function deleteSchedule() {
    try {
      setIsDeleting(true)

      await api.delete(`/schedules/${scheduleId}`)

      toast.success('O agendamento foi excluído com successo.')
      toggleModal()
    } catch (error) {
      if (error instanceof Error) {
        return
      }

      toast.success('Não foi possível excluir o agendamento, tente novamente.')
    } finally {
      setIsDeleting(false)
    }
  }

  async function fetchSchedules() {
    try {
      const response = await api.get(
        `/schedules?${debouncedValue && `subject=${debouncedValue}`}`
      )
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  async function updatedSchedules(scheduleId: string) {
    const schedulesListingCache = queryClient.getQueriesData({
      queryKey: ['schedules'],
    })

    schedulesListingCache.forEach(([cacheKey, cached]) => {
      if (!cached) {
        return
      }

      queryClient.setQueryData(
        cacheKey,
        schedules.filter(
          (schedule: ScheduleResponse) => schedule._id !== scheduleId
        )
      )
    })
  }

  const { data: schedules, isLoading } = useQuery({
    queryKey: ['schedules', debouncedValue],
    queryFn: fetchSchedules,
  })

  const { mutateAsync: onDeleteSchedule } = useMutation({
    mutationKey: ['delete-schedule', scheduleId],
    mutationFn: deleteSchedule,
    onSuccess: async () => updatedSchedules(scheduleId),
  })

  const hasSchedules = schedules?.length > 0 && !isLoading
  const isEmptyList = schedules?.length === 0 && !isLoading

  return (
    <>
      <div className="dashboard-container">
        <Breadcrumbs breadcrumbs={[{ label: 'Dashboard', href: '/' }]} />

        <Button onClick={() => navigate('/new-schedule', { replace: true })}>
          Criar
          <Plus size={20} />
        </Button>
      </div>

      <div className="dashboard-content">
        <Input
          placeholder="Buscar por um agendamento"
          onChange={handleSearchTerm}
          value={searchTerm}
        />

        <div className="schedules-list">
          {isLoading && <SchedulesSkeleton />}

          {hasSchedules && (
            <>
              <Schedules
                schedules={schedules}
                onSelectedScheduleId={onSelectedScheduleId}
              />

              <Modal
                title="Deseja excluir o agendamento?"
                description="Você tem certeza que deseja excluir o agendamento? Após a exclusão, não será possível visualizar mais informações sobre o agendamento."
                isOpen={isModalOpen}
                onClose={toggleModal}
                onSubmit={onDeleteSchedule}
                labelSubmitAction="Excluir"
                isDisabled={isDeleting}
              />
            </>
          )}

          {isEmptyList && <Empty />}
        </div>
      </div>
    </>
  )
}
