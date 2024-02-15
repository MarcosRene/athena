import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Dayjs } from 'dayjs'

import { Button } from '@/components/button'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Calendar } from '@/components/calendar'
import { Input } from '@/components/input'
import { Select } from '@/components/select'
import { Textarea } from '@/components/textarea'

import { getSchedule, GetScheduleResponse } from '@/services/get-schedule'
import { getUsersTeacher, TeacherResponse } from '@/services/get-users-teacher'

export function EditSchedule() {
  const { id } = useParams()

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null)
  const [selectedtime, setSelectedTime] = useState<string | null>(null)
  const [teachers, setTeachers] = useState<TeacherResponse[]>([])
  const [schedule, setSchedule] = useState<GetScheduleResponse | null>(null)

  console.log('selectedtime', selectedtime)
  console.log('schedule', schedule)

  useEffect(() => {
    if (!id) return

    const controller = new AbortController()

    async function fetchSchedule() {
      try {
        const data = await getSchedule({
          scheduleId: id,
          signal: controller.signal,
        })

        setSchedule(data)
      } catch (error) {
        console.log(error)
      } finally {
        //
      }
    }

    fetchSchedule()

    return () => controller.abort()
  }, [id])

  useEffect(() => {
    const controller = new AbortController()

    async function fetchTeachers() {
      try {
        const data = await getUsersTeacher({
          signal: controller.signal,
        })

        setTeachers(data)
      } catch (error) {
        console.log(error)
      } finally {
        //
      }
    }

    fetchTeachers()

    return () => controller.abort()
  }, [])

  return (
    <>
      <Helmet title="Editar" />

      <Breadcrumbs
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Editar', href: '/edit-schedule', activeLink: true },
        ]}
      />

      <div className="flex flex-col items-start">
        <Input id="subject" label="Assunto" placeholder="ex: TCC" />

        <Select id="teacher" label="Professor" options={teachers} />

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
      </div>
    </>
  )
}
