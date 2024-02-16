import { api } from './api'

interface GetUserProfileResponse {
  avatar: string | File
  confirm_password: string
  email: string
  name: string
  password: string
}

type UpdateUserProfileParams = {
  userId: string
  userProfile: GetUserProfileResponse
}

export async function updateUserProfile({
  userId,
  userProfile,
}: UpdateUserProfileParams) {
  const formData = new FormData()

  Object.entries(userProfile).forEach(([key, value]) => {
    if (value !== undefined && key !== 'avatar') {
      formData.append(key, value)
    }
  })

  if (userProfile.avatar) {
    formData.append('image', userProfile.avatar)
  }

  await api.patch(`/users/${userId}`, formData)
}
