import { useMemo } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Dayjs } from 'dayjs'

import { Button } from '../button'

import { getShortWeekDays } from '@/utils/get-short-week-days'

interface CalendarPickerProps {
  currentDate: Dayjs
  setCurrentDate: (date: Dayjs) => void
  onDateSelected: (date: Dayjs) => void
  isDateSelecetd?: boolean
}

interface CalendarWeek {
  week: number
  days: Array<{
    date: Dayjs | null
    disabled?: boolean
  }>
}

type CalendarWeeks = CalendarWeek[]

export function CalendarPicker({
  currentDate,
  setCurrentDate,
  onDateSelected,
}: CalendarPickerProps) {
  const shortWeekDays = getShortWeekDays()

  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  function handlePreviusMonth() {
    const previusMonth = currentDate.subtract(1, 'month')

    setCurrentDate(previusMonth)
  }

  function handleNextMonth() {
    const nextMonth = currentDate.add(1, 'month')

    setCurrentDate(nextMonth)
  }

  const calendarWeeks = useMemo(() => {
    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, index) => currentDate.set('date', index + 1))

    const firstWeekDay = currentDate.get('day')

    const lastWeekDaysPreviusMonth = Array.from(
      { length: firstWeekDay },
      (_, index) => currentDate.subtract(index + 1, 'day')
    )

    const calendarDays = [
      ...lastWeekDaysPreviusMonth.map(() => ({
        date: null,
        disabled: false,
      })),
      ...daysInMonthArray.map((date) => ({
        date: date,
        disabled: date.endOf('day').isBefore(),
      })),
    ]

    const calendarWeeksAndDays = calendarDays.reduce<CalendarWeeks>(
      (weeks, _, index, original) => {
        const isNewWeek = index % 7 === 0

        if (isNewWeek) {
          weeks.push({
            week: index / 7 + 1,
            days: original.slice(index, index + 7),
          })
        }

        return weeks
      },
      []
    )

    return calendarWeeksAndDays
  }, [currentDate])

  return (
    <div className="flex flex-col p-[1.6rem]">
      <header className="mb-[2.4rem] flex items-center justify-between">
        <Button
          icon={ChevronLeftIcon}
          iconSize={18}
          className="w-[3.2rem] h-[3.2rem] p-0 bg-transparent text-gray-100"
          onClick={handlePreviusMonth}
        ></Button>

        <span className="capitalize text-gray-100">
          {currentMonth} <span>{currentYear}</span>
        </span>

        <Button
          icon={ChevronRightIcon}
          iconSize={18}
          className="w-[3.2rem] h-[3.2rem] p-0 bg-transparent text-gray-100"
          onClick={handleNextMonth}
        ></Button>
      </header>

      <table className="border-separate border-spacing-[0.8rem] table-fixed">
        <thead>
          <tr>
            {shortWeekDays.map((weekDay) => (
              <th
                key={weekDay}
                className="text-[1.4rem] text-gray-700 font-medium"
              >
                {weekDay}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="text-gray-100">
          {calendarWeeks.map(({ days, week }) => (
            <tr key={`week-${week}`}>
              {days.map(({ date, disabled }, index) => (
                <td key={`date-${index + 1}`}>
                  {!!date && (
                    <Button
                      className={`py-0 w-[4.8rem] h-[4.8rem] font-normal bg-transparent text-gray-100 ${disabled && 'bg-gray-900 cursor-not-allowed hover:bg-gray-900 disabled:opacity-50'}`}
                      onClick={() => onDateSelected(date)}
                      disabled={disabled}
                    >
                      {date.get('date')}
                    </Button>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}