import { getShortWeekDays } from './get-short-week-days'

describe('isLinkActive', () => {
  it('should return days of the week short', () => {
    const shortWeekDays = getShortWeekDays()

    expect(shortWeekDays).toEqual([
      'DOM.',
      'SEG.',
      'TER.',
      'QUA.',
      'QUI.',
      'SEX.',
      'SÁB.',
    ])
  })

  it('Invalid date return', () => {
    const shortWeekDays = getShortWeekDays({ language: 'es-EN' })

    expect(shortWeekDays).not.toEqual([
      'DOM.',
      'SEG.',
      'TER.',
      'QUA.',
      'QUI.',
      'SEX.',
      'SÁB.',
    ])
  })
})
