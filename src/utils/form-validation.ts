import { isAfter } from 'date-fns'

export function formValidation<T>(formData: T, date: Date) {
  const isPastTime = isAfter(date, new Date())

  if (!formData) return

  const isFormValid =
    Object.values(formData).every((value) => value !== '') && isPastTime

  return isFormValid
}
