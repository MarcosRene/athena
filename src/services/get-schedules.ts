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
  signal: GenericAbortSignal
}

export async function getSchedules({ signal }: GetSchedulesParams) {
  const response = await api.get<GetSchedulesResponse[]>(`/schedules`, {
    signal,
  })

  return response.data
}
