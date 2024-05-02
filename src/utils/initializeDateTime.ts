export const initializeDateTime = (minute: number, hour: number): Date => {
  const initialDate = new Date()
  initialDate.setMinutes(minute)
  initialDate.setHours(hour)

  return initialDate
}
