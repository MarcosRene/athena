import { Dayjs } from 'dayjs'

import { Button } from '../button'

interface TimerPickerProps {
  selectedDate: Dayjs
  onSelecedTime: (time: string) => void
}

const TIMES = [
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
  '20:00',
]

export function TimerPicker({ onSelecedTime, selectedDate }: TimerPickerProps) {
  const weekDay = selectedDate ? selectedDate.format('dddd') : null
  const describedDate = selectedDate
    ? selectedDate.format('DD [de] MMMM')
    : null

  return (
    <div className="w-[28rem] p-[1.6rem] border-l border-l-gray-900">
      <span className="mt-[0.4rem] mb-[2.4rem] text-[1.4rem] font-medium text-gray-100 block">
        {weekDay}, <span>{describedDate}</span>
      </span>

      <ul className="w-full grid grid-cols-[auto,auto] gap-4 text-center">
        {TIMES.map((time) => (
          <li key={time}>
            <Button
              className="w-full font-normal text-[1.4rem] text-gray-100 bg-gray-900"
              onClick={() => onSelecedTime(time)}
            >
              {time}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
