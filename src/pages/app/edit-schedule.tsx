import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Dayjs } from 'dayjs'

import { Button } from '@/components/button'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Calendar } from '@/components/calendar'
import { Input } from '@/components/input'
import { Select } from '@/components/select'
import { Textarea } from '@/components/textarea'

import { useFetch } from '@/hooks/useFetch'

import { ScheduleResponse, UsersTeacherResponse } from './types'

import { FormSkeleton } from './form-skeleton'

export function EditSchedule() {
  const { id } = useParams()

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null)
  const [selectedtime, setSelectedTime] = useState<string | null>(null)

  console.log('selectedtime', selectedtime)

  const { data: schedule, isLoading } = useFetch<ScheduleResponse>({
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

  console.log('schedule', schedule)
  console.log('teachers', teachers)

  return (
    <>
      <Helmet title="Editar" />

      <Breadcrumbs
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Editar', href: '/edit-schedule', activeLink: true },
        ]}
      />

      {isLoading ? (
        <FormSkeleton />
      ) : (
        <form className="flex flex-col items-start">
          <Input id="subject" label="Assunto" placeholder="ex: TCC" />

          <Select id="teacher" label="Professor" options={formattedTeachers} />

          <Textarea
            id="description"
            label="Descrição"
            placeholder="ex: Discutir tema do TCC"
          />

          <Calendar
            label="Data/Hora"
            selectedDate={selectedDate}
            onDateSelected={setSelectedDate}
            onTimeSelected={setSelectedTime}
          />

          <div className="w-full flex justify-end mt-4">
            <Button className="uppercase font-medium">Salvar</Button>
          </div>
        </form>
      )}
    </>
  )
}
