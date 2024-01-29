import { FormEvent, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { User2Icon, LockIcon } from 'lucide-react'
import { useLocation, Link, useNavigate } from 'react-router-dom'

import { Button } from '@/components/button'
import { Input } from '@/components/input'

export function SignIn() {
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const hasBackFromSignUpPage = location.state?.from === '/sign-up'

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

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
          className="w-full max-w-[400px] py-12 px-10 border border-gray-900 rounded-lg"
        >
          <Input
            id="email"
            placeholder="E-mail"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            icon={User2Icon}
          />

          <Input
            id="password"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            icon={LockIcon}
          />

          <Link
            to="/sign-up"
            className="w-full h-auto mb-6 bg-transparent underline text-xs text-end transition-colors block hover:text-gray-500"
          >
            Cadastre-se aqui 👈
          </Link>

          <Button type="submit" className="w-full mb-4 uppercase">
            Entrar
          </Button>
        </form>
      </div>
    </>
  )
}
