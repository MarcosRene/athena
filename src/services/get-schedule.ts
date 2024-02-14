import { GenericAbortSignal } from 'axios'
import { api } from './api'

export interface GetScheduleResponse {
  _id: string
  identifier: string
  subject: string
  description: string
  teacher: string
  dateTime: string
}

interface GetScheduleParams {
  scheduleId: string | undefined
  signal: GenericAbortSignal
}

export async function getSchedule({ scheduleId, signal }: GetScheduleParams) {
  const response = await api.get<GetScheduleResponse>(
    `/schedules/${scheduleId}`,
    {
      signal,
    }
  )

  return response.data
}
