import { useEffect, useState } from 'react'
import { AxiosResponse } from 'axios'
import { toast } from 'sonner'

import { api } from '@/services/api'

type Query = {
  key: string
  value: string
}

interface FetchParams {
  url: string
  query?: Query
  errorMessage?: string
}

interface FetchResponse<T> {
  data: T | null
  isLoading: boolean
}

export function useFetch<T>({
  url,
  query,
  errorMessage,
}: FetchParams): FetchResponse<T> {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const queryParams = query?.value ? `?${query.key}=${query.value}` : ``

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    async function fetchData() {
      try {
        setIsLoading(true)

        const response: AxiosResponse<T> = await api.get(
          `${url}${queryParams}`,
          { signal }
        )

        setData(response.data)
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (error?.name === 'CanceledError') {
          return
        }

        if (errorMessage) toast.error(errorMessage)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()

    return () => controller.abort()
  }, [url, errorMessage, queryParams])

  return { data, isLoading }
}
