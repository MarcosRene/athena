import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Dayjs } from 'dayjs'

import { Button } from '@/components/button'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Calendar } from '@/components/calendar'
import { Input } from '@/components/input'
import { Select } from '@/components/select'
import { Textarea } from '@/components/textarea'

export function EditSchedule() {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null)
  const [selectedtime, setSelectedTime] = useState<string | null>(null)

  console.log({ selectedDate, selectedtime })

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

        <Select id="teacher" label="Professor" options={[]} />

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
