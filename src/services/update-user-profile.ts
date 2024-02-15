import { api } from './api'
import { GetUserProfileResponse } from './get-user'

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
