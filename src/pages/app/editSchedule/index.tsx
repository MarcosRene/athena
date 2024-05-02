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

import { useFetch } from '@/hooks/useFetch'

import { api } from '@/services/api'

import { ScheduleResponse, UsersTeacherResponse } from '../types'

import { FormSkeleton } from '../form-skeleton'
import { format } from 'date-fns'
import { Field } from '@/components/form/field'
import { Label } from '@/components/form/label'

import './styles.css'

export function EditSchedule() {
  const { id } = useParams()

  const [date, setDate] = useState<Date>(new Date())

  const [schedule, setSchedule] = useState<ScheduleResponse | null>(
    {} as ScheduleResponse
  )

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

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

  const { data, isLoading } = useFetch<ScheduleResponse>({
    url: `/schedules/${id}`,
    errorMessage: 'Não foi possível carregar o agendamento.',
  })

  const { data: teachers } = useFetch<UsersTeacherResponse[]>({
    url: `/users?role=TEACHER`,
    errorMessage: 'Não foi possível carregar os professores.',
  })

  const formattedTeachers = teachers?.map((teacher) => ({
    label: teacher.name,
    value: teacher._id,
  }))

  useEffect(() => {
    if (!data) return
    setSchedule(data)
    setDate(new Date(data.date))
  }, [data])

  const hasSchedule = data !== null && !isLoading

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
        <form onSubmit={onSubmit} className="form__container">
          <Field>
            <Label htmlFor="subject">Assunto</Label>

            <Input
              id="subject"
              name="subject"
              placeholder="ex: TCC"
              value={schedule?.subject}
              onChange={handleChange}
              maxLength={30}
            />

            {/* <div className="w-full p-0 flex justify-end">
              <span className="text-xs text-gray-500">
                {schedule?.subject?.length}/30
              </span>
            </div> */}
          </Field>

          <Field>
            <Label htmlFor="userId">Professor</Label>

            <Select
              id="userId"
              name="userId"
              options={formattedTeachers}
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

          <div className="button__group">
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
