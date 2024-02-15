import { GenericAbortSignal } from 'axios'
import { api } from './api'

export interface GetSchedulesResponse {
  _id: string
  identifier: string
  subject: string
  description: string
  teacher: string
  dateTime: string
  oldScheduling: boolean
}

interface GetSchedulesParams {
  query?: string
  signal: GenericAbortSignal
}

export async function getSchedules({ query, signal }: GetSchedulesParams) {
  const response = await api.get<GetSchedulesResponse[]>(
    `/schedules${query ? `?subject=${query}` : ''}`,
    {
      signal,
    }
  )

  return response.data
}
