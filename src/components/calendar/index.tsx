import { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'

import { CalendarPicker } from './calendar-picker'
import { TimerPicker } from './timer-picker'

interface CalendarProps {
  label?: string
  selectedDate: Dayjs
  onDateSelected: (date: Dayjs) => void
}

const availabilityTimes = [
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
]

export function Calendar({
  label,
  selectedDate,
  onDateSelected,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })
  const [selectedTime, setSelectedTime] = useState('')

  console.log('selectedTime', selectedTime)

  return (
    <div className="relative flex flex-col mb-[1.6rem]">
      {!!label && (
        <label className="mb-[0.8rem] text-[1.2rem] block">{label}</label>
      )}

      <div
        id="calendar"
        className={`relative bg-[#0c0c10] border border-gray-900 rounded-[0.8rem] flex overflow-hidden z-10 shadow-2xl`}
      >
        <CalendarPicker
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          onDateSelected={onDateSelected}
        />

        {!!selectedDate && (
          <TimerPicker
            selectedDate={selectedDate}
            availabilityTimes={availabilityTimes}
            onSelecedTime={setSelectedTime}
          />
        )}
      </div>
    </div>
  )
}
