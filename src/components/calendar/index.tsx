import { ComponentRef, useRef, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'

import { CalendarPicker } from './calendar-picker'
import { TimerPicker } from './timer-picker'

interface CalendarProps {
  label?: string
  selectedDate: Dayjs | null
  onDateSelected: (date: Dayjs) => void
  onTimeSelected: (time: string | null) => void
}

export function Calendar({
  label,
  selectedDate,
  onDateSelected,
  onTimeSelected,
}: CalendarProps) {
  const calendarRef = useRef<ComponentRef<'div'>>(null)

  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })

  function handleFocus() {
    if (calendarRef.current) {
      calendarRef.current?.focus()
    }
  }

  return (
    <div className="relative mb-4 flex flex-col">
      {!!label && (
        <label
          className="mb-2 text-sm text-gray-100"
          onClick={handleFocus}
          aria-label={label}
        >
          {label}
        </label>
      )}

      <div
        ref={calendarRef}
        className="relative bg-black-200 border border-gray-900 rounded-lg flex flex-col md:flex-row overflow-hidden z-10 shadow-2xl focus:outline outline-2 outline-green-600"
        tabIndex={0}
      >
        <CalendarPicker
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          onDateSelected={onDateSelected}
        />

        {!!selectedDate && (
          <TimerPicker
            selectedDate={selectedDate}
            onTimeSelected={onTimeSelected}
          />
        )}
      </div>
    </div>
  )
}
