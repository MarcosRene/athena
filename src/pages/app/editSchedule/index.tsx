import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/button'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Calendar } from '@/components/calendar'
import { Input } from '@/components/form/input'
import { Select } from '@/components/form/select'
import { Textarea } from '@/components/form/textArea'

import { api } from '@/services/api'

import { ScheduleResponse } from '../types'

import { FormSkeleton } from '../skeletonForm'
import { format } from 'date-fns'
import { Field } from '@/components/form/field'
import { Label } from '@/components/form/label'

import './styles.css'
import { useUsers } from '@/hooks/useUsers'
import { useQuery } from '@tanstack/react-query'

export function EditSchedule() {
  const { id } = useParams()

  const [date, setDate] = useState<Date>(new Date())

  const [schedule, setSchedule] = useState<ScheduleResponse | null>(
    {} as ScheduleResponse
  )

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const { data: teachersData } = useUsers()

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    if (!schedule) return

    const { name, value } = event.target

    setSchedule({ ...schedule, [name]: value })
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      setIsSubmitting(true)

      await api.put(`/schedules/${id}`, {
        ...schedule,
        date: format(date, 'yyyy/MM/dd HH:mm'),
      })

      toast.success('Agendamento atualizado com successo.')
    } catch (error) {
      if (error instanceof Error) {
        return
      }

      toast.error('Não foi possível atualizar o agendamento, tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function fetchScheduleById() {
    try {
      const response = await api.get(`/schedules/${id}`)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  const { data: scheduleData, isLoading } = useQuery<ScheduleResponse>({
    queryKey: ['schedule'],
    queryFn: fetchScheduleById,
  })

  const hasSchedule = scheduleData !== null && !isLoading

  useEffect(() => {
    if (scheduleData) {
      setSchedule(scheduleData)
    }
  }, [scheduleData])

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          {
            label: 'Editar',
            href: `/${schedule?._id}/edit-schedule`,
            activeLink: true,
          },
        ]}
      />

      {hasSchedule ? (
        <form onSubmit={onSubmit} className="form-container">
          <Field>
            <Label htmlFor="subject">Assunto</Label>

            <Input
              id="subject"
              name="subject"
              placeholder="ex: TCC"
              value={schedule?.subject}
              onChange={handleChange}
              maxLength={30}
              data-invalid={schedule?.subject?.length === 30}
            />

            <div className="field-message-error">
              <span>{schedule?.subject?.length}/30</span>
            </div>
          </Field>

          <Field>
            <Label htmlFor="userId">Professor</Label>

            <Select
              id="userId"
              name="userId"
              options={teachersData}
              value={schedule?.userId}
              onChange={handleChange}
            />
          </Field>

          <Field>
            <Label htmlFor="description">Descriação</Label>

            <Textarea
              id="description"
              name="description"
              placeholder="ex: Discutir tema do TCC"
              value={schedule?.description}
              onChange={handleChange}
            />
          </Field>

          <Calendar
            label="Data/Hora"
            selected={date}
            onChange={(value: Date) => setDate(value)}
          />

          <small>• Todos os campos são obrigatórios.</small>

          <div className="button-group">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                'Salvar'
              )}
            </Button>
          </div>
        </form>
      ) : (
        <FormSkeleton />
      )}
    </>
  )
}
