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
  signal: GenericAbortSignal
}

export interface TeacherResponse {
  label: string
  value: string
}

export async function getUsersTeacher({ signal }: GetUsersTeacherParams) {
  const { data } = await api.get<GetUsersTeacherResponse[]>(
    `/users?role=TEACHER`,
    {
      signal,
    }
  )

  const response: TeacherResponse[] = data.map((teacher) => ({
    label: teacher.name,
    value: teacher._id,
  }))

  return response
}
