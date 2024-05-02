import { isLinkActive } from './activeLink'

describe('isLinkActive', () => {
  it('Is active link', () => {
    const pathnames = ['/new-schedule', '/edit-schedule']
    const currentPath = '/edit-schedule'

    const isActiveLink = isLinkActive({ pathnames, currentPath })

    expect(isActiveLink).toEqual({ isActiveLink: true })
  })

  it('When pathnames to empty', () => {
    const pathnames: [] = []
    const currentPath = '/edit-schedule'

    const isActiveLink = isLinkActive({ pathnames, currentPath })

    expect(isActiveLink).toEqual({ isActiveLink: false })
  })

  it('When currentPath to empty', () => {
    const pathnames = ['/new-schedule', '/edit-schedule']
    const currentPath = ''

    const isActiveLink = isLinkActive({ pathnames, currentPath })

    expect(isActiveLink).toEqual({ isActiveLink: false })
  })

  it('When pathnames and currentPath to empty', () => {
    const pathnames: [] = []
    const currentPath = ''

    const isActiveLink = isLinkActive({ pathnames, currentPath })

    expect(isActiveLink).toEqual({ isActiveLink: false })
  })
})
