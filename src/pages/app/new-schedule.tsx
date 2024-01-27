import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Dayjs } from 'dayjs'

import { Breadcrumbs } from '@/components/breadcrumbs'
import { Calendar } from '@/components/calendar'
import { Input } from '@/components/input'
import { Select } from '@/components/select'
import { Textarea } from '@/components/textarea'

export function NewSchedule() {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null)
  const [selectedtime, setSelectedTime] = useState<string | null>(null)

  console.log({ selectedDate, selectedtime })

  return (
    <>
      <Helmet title="Novo" />

      <Breadcrumbs
        breadcrumbs={[
          { label: 'Geral', href: '/' },
          { label: 'Dashboard', href: '/' },
          { label: 'Novo', href: '/new-schedule', activeLink: true },
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
      </div>
    </>
  )
}
