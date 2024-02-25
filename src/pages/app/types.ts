type Teacher = {
  _id: string
  name: string
}

export interface ScheduleResponse {
  _id: string
  identifier: string
  subject: string
  description: string
  userId: string
  date: Date
  oldScheduling: boolean
  teacher?: Teacher | null
}

export interface UsersTeacherResponse {
  _id: string
  name: string
  email: string
  password: string
  confirm_password: string
  role: string
}

export interface UserProfileResponse {
  _id: string
  avatar: string | File
  confirm_password: string
  email: string
  name: string
  password: string
}
