import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Dayjs } from 'dayjs'
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

import { UsersTeacherResponse } from './types'

interface FormData {
  subject: string
  teacherId: string
  description: string
}

export function NewSchedule() {
  const navigate = useNavigate()

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null)
  const [selectedtime, setSelectedTime] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>({} as FormData)
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
    selectedDate,
    selectedtime,
  }).every((value) => value !== '')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      setIsSubmitting(true)
      await api.post('/schedules', {
        ...formData,
        date: selectedDate?.format('YYYY-MM-DD'),
        time: selectedtime,
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
          name="teacherId"
          label="Professor"
          options={formattedTeachers}
          value={formData.teacherId}
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
          selectedDate={selectedDate}
          onDateSelected={setSelectedDate}
          onTimeSelected={setSelectedTime}
        />

        <div className="w-full flex justify-end mt-4">
          <Button.Root
            type="submit"
            className="uppercase font-mediu"
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
