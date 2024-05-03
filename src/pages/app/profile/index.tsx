import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

import { useAuth } from '@/contexts/auth'

import { api } from '@/services/api'

import { Button } from '@/components/button'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Input } from '@/components/form/input'
import { InputFile } from '@/components/form/inputFile'

import { updateUserProfile } from '@/services/update-user-profile'

import { ProfileSkeleton } from './skeleton'

import { UserProfileResponse } from '../types'

import './styles.css'

export function Profile() {
  const { user, updateUser } = useAuth()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfileResponse>(
    {} as UserProfileResponse
  )

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target

    setUserProfile((prevState) => ({
      ...prevState,
      name: value,
    }))
  }

  function handleAvatarChange(value: File) {
    setUserProfile((prevState) => ({
      ...prevState,
      avatar: value,
    }))
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      setIsSubmitting(true)

      const response = await updateUserProfile({ userId: user.id, userProfile })

      updateUser({
        id: response._id,
        email: response.email,
        name: response.name,
        avatar: response.avatar,
      })

      toast.success('Usuário atualizado com successo.')
    } catch (error) {
      toast.error('Não foi possível atualizar o perfil, tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function fetchUserProfile() {
    try {
      const response = await api.get(`/users/${user.id}`)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  const { data: profileData, isLoading } = useQuery<UserProfileResponse>({
    queryKey: ['user-profile'],
    queryFn: fetchUserProfile,
  })

  const hasUserProfile = profileData !== null && !isLoading

  useEffect(() => {
    if (profileData) {
      setUserProfile(profileData)
    }
  }, [profileData])

  return (
    <>
      <Breadcrumbs breadcrumbs={[{ label: 'Perfil', href: '/profile' }]} />

      {hasUserProfile ? (
        <form onSubmit={onSubmit} className="profile-form-container">
          <div className="user-profile-container">
            <InputFile
              avatarURL={userProfile?.avatar?.toString()}
              onFileSelected={handleAvatarChange}
            />

            <span>{user.name}</span>
          </div>

          <div className="form-field-group">
            <Input
              id="email"
              placeholder="johndoe@email.com"
              value={userProfile?.email}
              disabled
            />

            <Input
              id="name"
              placeholder="John Doe"
              onChange={handleNameChange}
              value={userProfile?.name}
            />

            <Input
              id="password"
              type="password"
              placeholder="Senha"
              value={userProfile?.password}
              disabled
            />

            <Input
              id="confirm_password"
              type="password"
              placeholder="Confirmar senha"
              value={userProfile?.confirm_password}
              disabled
            />

            <div className="form-button-group">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  'Atualizar'
                )}
              </Button>
            </div>
          </div>
        </form>
      ) : (
        <ProfileSkeleton />
      )}
    </>
  )
}
