import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/button'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Calendar } from '@/components/calendar'
import { Input } from '@/components/input'
import { Select } from '@/components/select'
import { Textarea } from '@/components/textarea'

import { useFetch } from '@/hooks/useFetch'

import { api } from '@/services/api'

import { ScheduleResponse, UsersTeacherResponse } from './types'

import { FormSkeleton } from './form-skeleton'
import { format } from 'date-fns'

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
      <Helmet title="Editar" />

      <Breadcrumbs
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Editar', href: '/edit-schedule', activeLink: true },
        ]}
      />

      {hasSchedule ? (
        <form
          onSubmit={onSubmit}
          className="flex flex-col items-start space-y-4"
        >
          <Input.Field className="w-full">
            <Input.Label htmlFor="subject">Assunto</Input.Label>

            <Input.Container>
              <Input.Control
                id="subject"
                name="subject"
                placeholder="ex: TCC"
                value={schedule?.subject}
                onChange={handleChange}
              />
            </Input.Container>
          </Input.Field>

          <Select
            id="teacherId"
            name="teacherId"
            label="Professor"
            options={formattedTeachers}
            value={schedule?.teacherId}
            onChange={handleChange}
          />

          <Textarea.TextareaField>
            <Textarea.Label htmlFor="description">Descrição</Textarea.Label>

            <Textarea.Control
              id="description"
              name="description"
              placeholder="ex: Discutir tema do TCC"
              value={schedule?.description}
              onChange={handleChange}
            />
          </Textarea.TextareaField>

          <Calendar
            label="Data/Hora"
            selected={date}
            onChange={(value: Date) => setDate(value)}
          />

          <div className="w-full flex justify-end mt-4">
            <Button.Root
              type="submit"
              className="uppercase font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Button.Icon name={Loader2} className="size-4 animate-spin" />
              ) : (
                'Salvar'
              )}
            </Button.Root>
          </div>
        </form>
      ) : (
        <FormSkeleton />
      )}
    </>
  )
}
