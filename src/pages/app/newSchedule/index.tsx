import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { format } from 'date-fns'

import { Button } from '@/components/button'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Calendar } from '@/components/calendar'
import { Input } from '@/components/form/input'
import { Select } from '@/components/form/select'
import { Textarea } from '@/components/form/textArea'

import { formValidation } from '@/utils/form-validation'
import { initializeDateTime } from '@/utils/initialize-date-time'

import { api } from '@/services/api'

import { Field } from '@/components/form/field'
import { Label } from '@/components/form/label'
import { useQuery } from '@tanstack/react-query'
import type { UsersTeacherResponse } from '../types'

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

  async function fetchTeachers() {
    try {
      const response = await api.get(`/users?role=TEACHER`)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  const { data: teachers, isLoading } = useQuery<UsersTeacherResponse[]>({
    queryKey: ['schedules'],
    queryFn: fetchTeachers,
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

      <form onSubmit={onSubmit} className="form__container">
        <Field>
          <Label htmlFor="subject">Assunto</Label>

          <Input
            name="subject"
            id="subject"
            placeholder="ex: TCC"
            value={formData?.subject}
            onChange={handleChange}
            maxLength={30}
            style={{ width: '100%' }}
          />

          {/* <div className="w-full p-0 flex justify-end">
            <span className="text-xs text-gray-500">
              {formData.subject.length}/30
            </span>
          </div> */}
        </Field>

        <Field>
          <Label htmlFor="userId">Professor</Label>

          <Select
            name="userId"
            options={formattedTeachers}
            value={formData.userId}
            onChange={handleChange}
            disabled={isLoading}
          />
        </Field>

        <Field>
          <Label htmlFor="description">Descriação</Label>

          <Textarea
            id="description"
            name="description"
            placeholder="ex: Discutir tema do TCC"
            value={formData.description}
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
          <Button type="submit" disabled={!hasButtonDisabled || isSubmitting}>
            {isSubmitting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              'Salvar'
            )}
          </Button>
        </div>
      </form>
    </>
  )
}
