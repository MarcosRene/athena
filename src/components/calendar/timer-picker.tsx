import { Dayjs } from 'dayjs'

import { Button } from '../button'

interface TimerPickerProps {
  selectedDate: Dayjs
  availabilityTimes: string[]
  onSelecedTime: (time: string) => void
}

export function TimerPicker({
  onSelecedTime,
  selectedDate,
  availabilityTimes,
}: TimerPickerProps) {
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
        {availabilityTimes.length > 0
          ? availabilityTimes.map((time) => (
              <li key={time}>
                <Button
                  className="w-full font-normal text-[1.4rem] text-gray-100 bg-gray-900"
                  onClick={() => onSelecedTime(time)}
                >
                  {time}
                </Button>
              </li>
            ))
          : null}
      </ul>
    </div>
  )
}
