import { useEffect, useState } from 'react'

export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const debounceTime = setTimeout(() => {
      setDebouncedValue(value)
    }, delay ?? 500)

    return () => clearTimeout(debounceTime)
  }, [value, delay])

  return debouncedValue
}
