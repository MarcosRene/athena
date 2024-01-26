interface ShortWeekDaysProps {
  language?: string
}

export function getShortWeekDays({
  language = 'pt-BR',
}: ShortWeekDaysProps = {}) {
  const formatter = new Intl.DateTimeFormat(`${language}`, {
    weekday: 'short',
  })

  return Array.from(Array(7).keys())
    .map((day) => formatter.format(new Date(Date.UTC(2021, 5, day))))
    .map((weekDay) => weekDay.toUpperCase())
}
