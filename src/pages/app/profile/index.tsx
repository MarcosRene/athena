import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

import { useAuth } from '@/contexts/auth'

import { Button } from '@/components/button'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Input } from '@/components/input'
import { InputFile } from '@/components/input-file'

import { updateUserProfile } from '@/services/update-user-profile'

import { ProfileSkeleton } from './profile-skeleton'
import { useFetch } from '@/hooks/useFetch'

import { UserProfileResponse } from '../types'

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

  const { data, isLoading } = useFetch<UserProfileResponse>({
    url: `/users/${user.id}`,
    errorMessage:
      'Não foi possível carregar os dados do usuário, tente novamente!',
  })

  useEffect(() => {
    if (!data) return
    setUserProfile({
      ...data,
      avatar: `http://localhost:3333/uploads/${data.avatar}`,
    })
  }, [data])

  const hasUserProfile = data !== null && !isLoading

  return (
    <>
      <Helmet title="Perfil" />

      <Breadcrumbs breadcrumbs={[{ label: 'Perfil', href: '/profile' }]} />

      {hasUserProfile ? (
        <form
          onSubmit={onSubmit}
          className="pt-4 flex flex-col items-center md:flex-row md:items-start gap-8 lg:gap-16"
        >
          <div className="w-full max-w-40 flex flex-col items-center">
            <InputFile
              avatarURL={userProfile.avatar?.toString()}
              onFileSelected={handleAvatarChange}
            />

            <span className="font-medium text-2xl whitespace-nowrap">
              {user.name}
            </span>
          </div>

          <div className="block space-y-4 w-full self-baseline md:space-y-0 md:grid md:grid-cols-2 md:gap-6">
            <Input.Field>
              <Input.Container>
                <Input.Control
                  id="email"
                  placeholder="johndoe@email.com"
                  value={userProfile.email}
                  disabled
                />
              </Input.Container>
            </Input.Field>

            <Input.Field>
              <Input.Container>
                <Input.Control
                  id="name"
                  placeholder="John Doe"
                  onChange={handleNameChange}
                  value={userProfile.name}
                />
              </Input.Container>
            </Input.Field>

            <Input.Field>
              <Input.Container>
                <Input.Control
                  id="password"
                  type="password"
                  placeholder="Senha"
                  value={userProfile.password}
                  disabled
                />
              </Input.Container>
            </Input.Field>

            <Input.Field>
              <Input.Container>
                <Input.Control
                  id="confirm_password"
                  type="password"
                  placeholder="Confirmar senha"
                  value={userProfile.confirm_password}
                  disabled
                />
              </Input.Container>
            </Input.Field>

            <div className="col-start-2 col-end-2 flex justify-end">
              <Button.Root
                type="submit"
                className="uppercase font-medium"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Button.Icon name={Loader2} className="size-4 animate-spin" />
                ) : (
                  'Atualizar'
                )}
              </Button.Root>
            </div>
          </div>
        </form>
      ) : (
        <ProfileSkeleton />
      )}
    </>
  )
}
