import { GenericAbortSignal } from 'axios'
import { api } from './api'

export interface GetUserProfileResponse {
  avatar: string | File
  confirm_password: string
  email: string
  name: string
  password: string
}

interface GetUserProfileParams {
  userId: string
  signal: GenericAbortSignal
}

export async function getUserProfile({ userId, signal }: GetUserProfileParams) {
  const response = await api.get<GetUserProfileResponse>(`/users/${userId}`, {
    signal,
  })

  return response.data
}
