import { composeStorageKey } from './compose-storage-key'

describe('composeStorageKey', () => {
  it('should return a compose storage', () => {
    const storageKey = composeStorageKey('token')

    expect(storageKey).toBe('@athena:token')
  })
})
