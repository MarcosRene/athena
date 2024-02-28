import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import { format, getDay, getTime } from 'date-fns'

import { ptBR } from '@/lib/date-fns'

import { initializeDateTime } from '@/utils/initialize-date-time'

import { Input } from './input'

interface CalendarProps extends ReactDatePickerProps {
  label?: string
}

export function Calendar({ label, ...props }: CalendarProps) {
  const { selected } = props

  const filterPassedDate = (date: Date) => {
    const passedDate = new Date() < date

    const day = getDay(date)
    const isWeekDay = day !== 0 && day !== 6

    return passedDate && isWeekDay
  }

  const filterPassedTime = (time: Date) => {
    const currentDate = getTime(new Date())
    const selectedDate = getTime(time)

    return currentDate < selectedDate
  }

  return (
    <DatePicker
      selected={selected}
      filterDate={filterPassedDate}
      filterTime={filterPassedTime}
      dateFormat="dd/MM/yyyy HH:mm"
      showTimeSelect
      timeCaption={format(String(selected), 'iiii, dd', { locale: ptBR })}
      minTime={initializeDateTime(0, 8)}
      maxTime={initializeDateTime(0, 17)}
      timeIntervals={30}
      customInput={
        <Input.Field>
          {!!label && <Input.Label htmlFor="calendar">{label}</Input.Label>}

          <Input.Container>
            <Input.Control
              id="calendar"
              value={format(String(selected), 'dd/MM/yyyy HH:mm')}
              readOnly
            />
          </Input.Container>
        </Input.Field>
      }
      locale="ptBR"
      withPortal
      disabledKeyboardNavigation
      {...props}
    />
  )
}
