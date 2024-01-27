import { Dayjs } from 'dayjs'

import { Button } from '../button'
import { useMemo } from 'react'
import { availableTimes } from './available-times'

interface TimerPickerProps {
  selectedDate: Dayjs
  onTimeSelected: (time: string | null) => void
}

export function TimerPicker({
  onTimeSelected,
  selectedDate,
}: TimerPickerProps) {
  const weekDay = selectedDate ? selectedDate.format('dddd') : null
  const describedDate = selectedDate
    ? selectedDate.format('DD [de] MMMM')
    : null

  const availabilityTimes = useMemo(() => {
    return availableTimes.map((time) => {
      const currentHour = parseInt(time.substring(0, 2))
      const currentMinute = parseInt(time.substring(3, 5))

      const currentTime = selectedDate
        .set('hour', currentHour)
        .set('minute', currentMinute)

      return { time, disabled: selectedDate.isAfter(currentTime) }
    })
  }, [selectedDate])

  return (
    <div className="w-[28rem] p-[1.6rem] border-l border-l-gray-900">
      <span className="mt-[0.4rem] mb-[2.4rem] text-[1.4rem] font-medium text-gray-100 block">
        {weekDay}, <span>{describedDate}</span>
      </span>

      <ul className="w-full grid grid-cols-[auto,auto] gap-4 text-center">
        {availabilityTimes.map(({ time, disabled }) => (
          <li key={time}>
            <Button
              className={`w-full font-normal text-[1.4rem] text-gray-100 bg-gray-900 ${disabled && 'bg-gray-900 cursor-not-allowed hover:bg-gray-900 disabled:opacity-50'}`}
              onClick={() => onTimeSelected(time)}
              disabled={disabled}
            >
              {time}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
