import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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

import { initializeDateTime } from '@/utils/initialize-date-time'

import { api } from '@/services/api'

import { UsersTeacherResponse } from './types'
import { format } from 'date-fns'

interface FormData {
  subject: string
  userId: string
  description: string
  date: Date
}

const initialFormDataState: FormData = {
  subject: '',
  userId: '',
  description: '',
  date: new Date(),
}

export function NewSchedule() {
  const navigate = useNavigate()

  const [date, setDate] = useState<Date>(initializeDateTime(0, 8))

  const [formData, setFormData] = useState<FormData>(initialFormDataState)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = event.target

    setFormData({ ...formData, [name]: value })
  }

  const isFormValid = Object.values({
    ...formData,
  }).every((value) => value !== '')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      setIsSubmitting(true)

      await api.post('/schedules', {
        ...formData,
        date: format(date, 'yyyy/MM/dd HH:mm'),
      })

      navigate('/', { replace: true })
    } catch (error) {
      toast.error('Não foi possível criar uma agendamento, tente novamente!')
    } finally {
      setIsSubmitting(false)
    }
  }

  const { data: teachers, isLoading } = useFetch<UsersTeacherResponse[]>({
    url: `/users?role=TEACHER`,
    errorMessage: 'Não foi possível carregar os professores.',
  })

  const formattedTeachers = teachers?.map((teacher) => ({
    label: teacher.name,
    value: teacher._id,
  }))

  return (
    <>
      <Helmet title="Novo" />

      <Breadcrumbs
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Novo', href: '/new-schedule', activeLink: true },
        ]}
      />

      <form onSubmit={onSubmit} className="flex flex-col items-start space-y-4">
        <Input.Field className="w-full">
          <Input.Label htmlFor="subject">Assunto</Input.Label>

          <Input.Container>
            <Input.Control
              name="subject"
              id="subject"
              placeholder="ex: TCC"
              value={formData?.subject}
              onChange={handleChange}
            />
          </Input.Container>
        </Input.Field>

        <Select
          name="userId"
          label="Professor"
          options={formattedTeachers}
          value={formData.userId}
          onChange={handleChange}
          disabled={isLoading}
        />

        <Textarea.TextareaField>
          <Textarea.Label htmlFor="description">Descrição</Textarea.Label>

          <Textarea.Control
            id="description"
            name="description"
            placeholder="ex: Discutir tema do TCC"
            value={formData.description}
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
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? (
              <Button.Icon name={Loader2} className="size-4 animate-spin" />
            ) : (
              'Salvar'
            )}
          </Button.Root>
        </div>
      </form>
    </>
  )
}
