import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { toast } from 'sonner'

import { useAuth } from '@/contexts/auth'

import { Button } from '@/components/button'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Input } from '@/components/input'
import { InputFile } from '@/components/input-file'

import { getUserProfile, GetUserProfileResponse } from '@/services/get-user'
import { updateUserProfile } from '@/services/update-user-profile'

import { ProfileSkeleton } from './profile-skeleton'

const initialUserProfileState = {
  avatar: '',
  confirm_password: '',
  email: '',
  name: '',
  password: '',
}

export function Profile() {
  const { user } = useAuth()

  const [userProfile, setUserProfile] = useState<GetUserProfileResponse>(
    initialUserProfileState
  )
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

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

      await updateUserProfile({ userId: user.id, userProfile })
    } catch (error) {
      toast.error('Não foi possível atualizar o perfil, tente novamente!')
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    if (!user.id) return

    const controller = new AbortController()

    async function fetchUserProfile() {
      try {
        setIsLoading(true)

        const data = await getUserProfile({
          userId: user.id,
          signal: controller.signal,
        })

        if (data) {
          setUserProfile(data)
        }
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (error?.name === 'CanceledError') {
          return
        }

        toast.error(
          'Não foi possível carregar os dados do usuário, tente novamente!'
        )
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserProfile()

    return () => controller.abort()
  }, [user.id])

  return (
    <>
      <Helmet title="Perfil" />

      <Breadcrumbs breadcrumbs={[{ label: 'Perfil', href: '/profile' }]} />

      {isLoading ? (
        <ProfileSkeleton />
      ) : (
        <form
          onSubmit={onSubmit}
          className="pt-4 flex flex-col items-center md:flex-row md:items-start gap-8 lg:gap-16"
        >
          <div className="w-full max-w-40 flex flex-col items-center">
            <InputFile
              avatarURL={user.avatar}
              onFileSelected={handleAvatarChange}
            />

            <span className="font-medium text-2xl">{user.name}</span>
          </div>

          <div className="block md:grid md:grid-cols-2 gap-x-6 w-full self-baseline">
            <Input
              id="email"
              placeholder="johndoe@email.com"
              value={userProfile.email}
              disabled
            />

            <Input
              id="name"
              placeholder="John Doe"
              onChange={handleNameChange}
              value={userProfile.name}
            />

            <Input
              id="password"
              type="password"
              placeholder="Senha"
              value={userProfile.password}
              disabled
            />

            <Input
              id="confirm_password"
              type="password"
              placeholder="Confirmar senha"
              value={userProfile.confirm_password}
              disabled
            />

            <div className="col-start-2 col-end-2 flex justify-end">
              <Button
                type="submit"
                className="uppercase font-medium"
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                Atualizar
              </Button>
            </div>
          </div>
        </form>
      )}
    </>
  )
}
