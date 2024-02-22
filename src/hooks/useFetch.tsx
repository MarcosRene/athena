import { useEffect, useRef, useState } from 'react'
import { AxiosResponse, isCancel } from 'axios'
import { toast } from 'sonner'

import { api } from '@/services/api'

import { delay } from '@/utils/deplay'

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

  const abortControllerRef = useRef<AbortController | null>(null)

  const queryParams = query?.value ? `?${query.key}=${query.value}` : ``

  useEffect(() => {
    async function fetchData() {
      abortControllerRef.current?.abort()
      abortControllerRef.current = new AbortController()

      try {
        setIsLoading(true)

        await delay(1000)

        const response: AxiosResponse<T> = await api.get(
          `${url}${queryParams}`,
          { signal: abortControllerRef.current.signal }
        )

        setData(response.data)
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (isCancel(error)) {
          return
        }

        if (errorMessage) toast.error(errorMessage)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [url, errorMessage, queryParams])

  return { data, isLoading }
}
