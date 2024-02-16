export interface ScheduleResponse {
  _id: string
  identifier: string
  subject: string
  description: string
  teacher: string
  dateTime: string
  oldScheduling: boolean
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
  avatar: string | File
  confirm_password: string
  email: string
  name: string
  password: string
}