import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Dayjs } from 'dayjs'
import { toast } from 'sonner'

import { Button } from '@/components/button'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Calendar } from '@/components/calendar'
import { Input } from '@/components/input'
import { Select } from '@/components/select'
import { Textarea } from '@/components/textarea'

import { api } from '@/services/api'
import { getUsersTeacher } from '@/services/get-users-teacher'

interface ValuesProps {
  subject: string
  teacherId: string
  description: string
}

interface Teacher {
  label: string
  value: string
}

const initialValues: ValuesProps = {
  subject: '',
  teacherId: '',
  description: '',
}

export function NewSchedule() {
  const navigate = useNavigate()

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null)
  const [selectedtime, setSelectedTime] = useState<string | null>(null)
  const [values, setValues] = useState<ValuesProps>(initialValues)
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = event.target

    setValues({ ...values, [name]: value })
  }

  const isFormValid = Object.values({
    ...values,
    selectedDate,
    selectedtime,
  }).every((value) => value !== '')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      const formData = {
        ...values,
        date: selectedDate?.format('YYYY-MM-DD'),
        time: selectedtime,
      }

      await api.post('/schedules', formData)

      navigate('/', { replace: true })
    } catch (error) {
      toast.error('Não foi possível criar uma agendamento, tente novamente!')
    }
  }

  useEffect(() => {
    const controller = new AbortController()

    async function fetchTeachers() {
      try {
        const data = await getUsersTeacher({
          query: 'TEACHER',
          signal: controller.signal,
        })

        setTeachers(data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTeachers()

    return () => controller.abort()
  }, [])

  return (
    <>
      <Helmet title="Novo" />

      <Breadcrumbs
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Novo', href: '/new-schedule', activeLink: true },
        ]}
      />

      <form onSubmit={onSubmit} className="flex flex-col items-start">
        <Input
          name="subject"
          label="Assunto"
          placeholder="ex: TCC"
          value={values.subject}
          onChange={handleChange}
        />

        <Select
          name="teacherId"
          label="Professor"
          options={teachers}
          value={values.teacherId}
          onChange={handleChange}
        />

        <Textarea
          name="description"
          label="Descrição"
          placeholder="ex: Discutir tema do TCC"
          value={values.description}
          onChange={handleChange}
        />

        <Calendar
          label="Data/Hora"
          selectedDate={selectedDate}
          onDateSelected={setSelectedDate}
          onTimeSelected={setSelectedTime}
        />

        <div className="w-full flex justify-end mt-4">
          <Button
            type="submit"
            className="uppercase font-mediu"
            isLoading={isLoading}
            disabled={!isFormValid || isLoading}
          >
            Salvar
          </Button>
        </div>
      </form>
    </>
  )
}
