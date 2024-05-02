import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import { format, getDay, getTime } from 'date-fns'

import { ptBR } from '@/lib/date-fns'

import { initializeDateTime } from '@/utils/initializeDateTime'

import { Input } from '../form/input'
import { Field } from '../form/field'
import { Label } from '../form/label'

import './styles.css'

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
        <Field>
          {!!label && (
            <Label htmlFor="calendar" style={{ marginBottom: 8 }}>
              {label}
            </Label>
          )}

          <Input
            id="calendar"
            value={format(String(selected), 'dd/MM/yyyy HH:mm')}
            readOnly
          />
        </Field>
      }
      locale="ptBR"
      withPortal
      disabledKeyboardNavigation
      {...props}
    />
  )
}
