import { ChangeEvent, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Dayjs } from 'dayjs'

import { Button } from '@/components/button'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Calendar } from '@/components/calendar'
import { Input } from '@/components/input'
import { Select } from '@/components/select'
import { Textarea } from '@/components/textarea'

interface ValuesProps {
  subject: string
  teacher: string
  description: string
}

const initialValues: ValuesProps = {
  subject: '',
  teacher: '',
  description: '',
}

export function NewSchedule() {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null)
  const [selectedtime, setSelectedTime] = useState<string | null>(null)
  const [values, setValues] = useState<ValuesProps>(initialValues)

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

  console.log({ selectedDate, selectedtime })

  return (
    <>
      <Helmet title="Novo" />

      <Breadcrumbs
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Novo', href: '/new-schedule', activeLink: true },
        ]}
      />

      <div className="flex flex-col items-start">
        <Input
          name="subject"
          label="Assunto"
          placeholder="ex: TCC"
          value={values.subject}
          onChange={handleChange}
        />

        <Select
          name="teacher"
          label="Professor"
          options={[]}
          value={values.teacher}
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
            className={`uppercase font-medium ${!isFormValid && 'opacity-50 cursor-not-allowed hover:bg-green-600'}`}
            disabled={!isFormValid}
          >
            Salvar
          </Button>
        </div>
      </div>
    </>
  )
}
