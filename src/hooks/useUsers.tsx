import { UsersTeacherResponse } from '@/pages/app/types'
import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

export function useUsers() {
  async function fetchTeachers() {
    try {
      const response = await api.get(`/users?role=TEACHER`)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  const { data: teachersData, isLoading } = useQuery<UsersTeacherResponse[]>({
    queryKey: ['teachers'],
    queryFn: fetchTeachers,
  })

  const formattedTeachers = teachersData?.map((teacher) => ({
    label: teacher.name,
    value: teacher._id,
  }))

  return { data: formattedTeachers, isLoading }
}
