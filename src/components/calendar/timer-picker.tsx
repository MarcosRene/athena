import dayjs, { Dayjs } from 'dayjs'

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

      const isScheduledToday = dayjs().isSame(selectedDate, 'day')
      const isPastScheduledTime = selectedDate.isAfter(currentTime)

      return {
        time,
        disabled: isScheduledToday && isPastScheduledTime,
      }
    })
  }, [selectedDate])

  return (
    <div className="w-72 p-4 border-l border-l-gray-900">
      <span className="mt-1 mb-6 text-sm font-medium text-gray-100 block md:text-base">
        {weekDay}, <span>{describedDate}</span>
      </span>

      <ul className="w-full grid grid-cols-[auto,auto] gap-2 text-center">
        {availabilityTimes.map(({ time, disabled }) => (
          <li key={time}>
            <Button.Root
              className="w-full font-normal text-xs md:text-sm text-gray-100 bg-gray-900 disabled:hover:bg-gray-900"
              onClick={() => onTimeSelected(time)}
              disabled={disabled}
            >
              {time}
            </Button.Root>
          </li>
        ))}
      </ul>
    </div>
  )
}
