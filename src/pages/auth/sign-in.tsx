import { FormEvent, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation, Link, useNavigate } from 'react-router-dom'

import { Button } from '@/components/button'

export function SignIn() {
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const isBackFromSignUpPage = location.state?.from === '/sign-up'

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    navigate('/')
  }

  return (
    <>
      <Helmet title="Login" />

      <div
        className={`max-w-[102.4rem] py-[4.8rem] px-[3.8rem] flex items-center justify-between gap-8 ${isBackFromSignUpPage && 'animate-slider-left-to-right'}`}
      >
        <h1 className="text-[9.2rem] font-black leading-[8.8rem]">
          Gerencie seus <span className="text-green-500">horários</span>.
        </h1>

        <form
          onSubmit={onSubmit}
          aria-label="sign-in-form"
          className="w-full max-w-[40rem] py-[4.8rem] px-[3.8rem] border border-gray-900 rounded-[0.8rem]"
        >
          <label className="text-[1.2rem] mb-[1.6rem] block" htmlFor="email">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-[4rem] w-full py-0 px-[1.6rem] text-[1.4rem] bg-black-100 text-white-100 border border-gray-900 rounded-[0.8rem] placeholder-gray-700 focus:border-[transparent] focus:outline outline-2 outline-green-600"
            />
          </label>

          <label className="text-[1.2rem] mb-[1.6rem] block" htmlFor="password">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-[4rem] w-full py-0 px-[1.6rem] text-[1.4rem] bg-black-100 text-white-100 border border-gray-900 rounded-[0.8rem] placeholder-gray-700 focus:border-[transparent] focus:outline outline-2 outline-green-600"
            />
          </label>

          <Link
            to="/sign-up"
            className="w-full h-auto mb-[2.4rem] bg-transparent underline text-[1.2rem] text-end transition-colors block hover:text-gray-500"
          >
            Cadastre-se aqui 👈
          </Link>

          <Button type="submit" className="w-full mb-[1.6rem] uppercase">
            Entrar
          </Button>
        </form>
      </div>
    </>
  )
}
