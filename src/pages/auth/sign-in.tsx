import { FormEvent, useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { User2, Lock, Loader2 } from 'lucide-react'

import { Button } from '@/components/button'
import { Input } from '@/components/input'

import { useAuth } from '@/contexts/auth'

export function SignIn() {
  const navigate = useNavigate()
  const location = useLocation()

  const { isLoading, signIn } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const hasBackFromSignUpPage = location.state?.from === '/sign-up'

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    await signIn({ email, password })
    navigate('/')
  }

  return (
    <>
      <Helmet title="Login" />

      <div
        className={`max-w-[1024px] py-12 px-10 flex items-center justify-between gap-8 ${hasBackFromSignUpPage && 'animate-slider-left-to-right'}`}
      >
        <h1 className="text-[92px] font-black leading-[88px]">
          Gerencie seus <span className="text-green-500">horários</span>.
        </h1>

        <form
          onSubmit={onSubmit}
          aria-label="sign-in-form"
          className="w-full max-w-[400px] space-y-4 py-12 px-10 border border-gray-900 rounded-lg"
        >
          <Input.Field>
            <Input.Container>
              <Input.Prefix>
                <User2 className="size-4" />
              </Input.Prefix>

              <Input.Control
                placeholder="E-mail"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Input.Container>
          </Input.Field>

          <Input.Field>
            <Input.Container>
              <Input.Prefix>
                <Lock className="size-4" />
              </Input.Prefix>

              <Input.Control
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Input.Container>
          </Input.Field>

          <Link
            to="/sign-up"
            className="w-full h-auto mb-6 bg-transparent underline text-xs text-end transition-colors block hover:text-gray-500"
          >
            Cadastre-se aqui 👈
          </Link>

          <Button.Root
            type="submit"
            className="w-full uppercase"
            disabled={isLoading}
          >
            {!isLoading ? (
              'Entrar'
            ) : (
              <Button.Icon name={Loader2} className="animate-spin size-5" />
            )}
          </Button.Root>
        </form>
      </div>
    </>
  )
}
