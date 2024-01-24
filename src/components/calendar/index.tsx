import { ComponentRef, useEffect, useRef, useState } from 'react'
import { CalendarIcon } from 'lucide-react'
import dayjs, { Dayjs } from 'dayjs'

import { CalendarPicker } from './calendar-picker'
import { TimerPicker } from './timer-picker'

interface CalendarProps {
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

export function Calendar({ selectedDate, onDateSelected }: CalendarProps) {
  const [isOpenCalendar, setIsOpenCalendar] = useState(false)
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })
  const [selectedTime, setSelectedTime] = useState('')

  const targetRef = useRef<ComponentRef<'div'>>(null)

  const formatDisplayValue = (selectedDate: Dayjs, selectedTime: string) => {
    const formattedDate = selectedDate?.format('DD [de] MMMM[,] YYYY')

    const currentTime = selectedTime
      ? selectedTime
      : currentDate.format('HH:mm')

    return `${formattedDate} às ${currentTime}`
  }

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent): void {
      if (
        targetRef.current &&
        !targetRef.current.contains(event.target as Node)
      ) {
        setIsOpenCalendar(false)
      } else {
        setIsOpenCalendar(true)
      }
    }

    document.addEventListener('click', handleOutsideClick)

    return () => document.removeEventListener('click', handleOutsideClick)
  }, [])

  return (
    <div className="relative flex flex-col" ref={targetRef}>
      <div
        className={`w-full h-[4rem] px-[1.6rem] mb-[1.6rem] flex items-center gap-4 p-[1.6rem] py-0 text-[1.4rem] bg-black-100 text-white-100 placeholder-gray-700 border border-gray-900 rounded-[0.8rem] cursor-text transition-colors ${isOpenCalendar && 'outline outline-2 outline-green-600'}`}
      >
        <CalendarIcon
          size={16}
          className={`${isOpenCalendar ? 'text-green-600' : 'text-gray-700'}`}
        />
        {formatDisplayValue(dayjs(selectedDate), selectedTime)}
      </div>

      {isOpenCalendar && (
        <div className="w-auto relative">
          <div
            className={`absolute bg-[#0c0c10] border border-gray-900 rounded-[0.8rem] flex overflow-hidden z-10 shadow-2xl ${isOpenCalendar && 'animate-slider-left-to-right'}`}
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
      )}
    </div>
  )
}
