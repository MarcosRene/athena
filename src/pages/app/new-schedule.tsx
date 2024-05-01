import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { format } from 'date-fns'

import { Button } from '@/components/button'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Calendar } from '@/components/calendar'
import { Input } from '@/components/input'
import { Select } from '@/components/select'
import { Textarea } from '@/components/textarea'

import { useFetch } from '@/hooks/useFetch'

import { formValidation } from '@/utils/form-validation'
import { initializeDateTime } from '@/utils/initialize-date-time'

import { api } from '@/services/api'

import { UsersTeacherResponse } from './types'

interface FormData {
  subject: string
  userId: string
  description: string
}

const initialFormDataState: FormData = {
  subject: '',
  userId: '',
  description: '',
}

export function NewSchedule() {
  const navigate = useNavigate()

  const [date, setDate] = useState<Date>(initializeDateTime(0, 8))

  const [formData, setFormData] = useState<FormData>(initialFormDataState)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const hasButtonDisabled = formValidation(formData, date)

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = event.target

    setFormData({ ...formData, [name]: value })
  }

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
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Novo', href: '/new-schedule', activeLink: true },
        ]}
      />

      <form onSubmit={onSubmit} className="flex flex-col items-start space-y-4">
        <Input.Field className="w-full">
          <Input.Label htmlFor="subject">Assunto</Input.Label>

          <Input.Container data-invalid={formData.subject.length === 30}>
            <Input.Control
              name="subject"
              id="subject"
              placeholder="ex: TCC"
              value={formData?.subject}
              onChange={handleChange}
              maxLength={30}
            />
          </Input.Container>

          <Input.Prefix className="w-full p-0 flex justify-end">
            <span className="text-xs text-gray-500">
              {formData.subject.length}/30
            </span>
          </Input.Prefix>
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

        <small>• Todos os campos são obrigatórios.</small>

        <div className="w-full flex justify-end">
          <Button type="submit" disabled={!hasButtonDisabled || isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              'Salvar'
            )}
          </Button>
        </div>
      </form>
    </>
  )
}
