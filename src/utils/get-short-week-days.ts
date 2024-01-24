export function getShortWeekDays() {
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'short',
  })

  return Array.from(Array(7).keys())
    .map((day) => formatter.format(new Date(Date.UTC(2021, 5, day))))
    .map((weekDay) => weekDay.toUpperCase())
}
