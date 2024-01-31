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
    <div className="flex flex-col p-4">
      <header className="mb-6 flex items-center justify-between">
        <Button
          icon={ChevronLeftIcon}
          iconSize={18}
          className="w-8 h-w-8 p-0 bg-transparent text-gray-100"
          onClick={handlePreviusMonth}
        ></Button>

        <span className="text-sm capitalize text-gray-100 md:text-base">
          {currentMonth} <span>{currentYear}</span>
        </span>

        <Button
          icon={ChevronRightIcon}
          iconSize={18}
          className="w-8 h-8 p-0 bg-transparent text-gray-100"
          onClick={handleNextMonth}
        ></Button>
      </header>

      <table
        data-label="."
        className="h-3/4 border-separate border-spacing-2 md:table-auto before:content-[attr(data-label)] before:text-transparent"
      >
        <thead>
          <tr>
            {shortWeekDays.map((weekDay) => (
              <th
                key={weekDay}
                className="text-xs md:text-sm text-gray-700 font-medium"
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
                      className={`px-0 w-8 h-8 md:py-0 md:w-12 md:h-12 text-xs md:text-sm font-normal bg-transparent text-gray-100 ${disabled && 'bg-gray-900 cursor-not-allowed hover:bg-gray-900 disabled:opacity-50'}`}
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
