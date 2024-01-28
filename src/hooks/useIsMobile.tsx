import { useLayoutEffect, useState } from 'react'

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  const handleResize = () => setIsMobile(window.innerWidth < 1024)

  useLayoutEffect(() => {
    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return isMobile
}
