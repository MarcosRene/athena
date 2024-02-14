import { GenericAbortSignal } from 'axios'
import { api } from './api'

export interface GetUsersTeacherResponse {
  _id: string
  name: string
  email: string
  password: string
  confirm_password: string
  role: string
}

interface GetUsersTeacherParams {
  query?: string
  signal: GenericAbortSignal
}

export async function getUsersTeacher({
  query,
  signal,
}: GetUsersTeacherParams) {
  const { data } = await api.get<GetUsersTeacherResponse[]>(
    `/users?role=${query}`,
    {
      signal,
    }
  )

  const response = data.map((teacher) => ({
    label: teacher?.name,
    value: teacher?._id,
  }))

  return response
}
