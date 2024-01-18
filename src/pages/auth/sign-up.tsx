import { Link, useNavigate } from 'react-router-dom'

import { Button } from '@/components/button'
import { Helmet } from 'react-helmet-async'

export function SignUp() {
  const navigate = useNavigate()

  function onSubmit() {
    navigate('/')
  }

  return (
    <>
      <Helmet title="Cadastre-se" />

      <div className="h-full w-full flex items-center justify-center">
        <form
          aria-label="sign-up-form"
          onSubmit={onSubmit}
          className="w-full max-w-[40rem] py-[4.8rem] px-[3.8rem] border border-[#27272a] rounded-[0.8rem] animate-slider-right-to-left"
        >
          <h2 className="mb-[4rem] text-4xl font-bold">Crie sua conta</h2>

          <label className="text-[1.2rem] mb-[2.4rem] block" htmlFor="email">
            <input
              id="email"
              type="email"
              placeholder="E-mail"
              value={''}
              onChange={(event) => {
                console.log(event.target.name)
              }}
              className="h-[4rem] w-full py-0 px-[1.6rem] text-[1.4rem] bg-black-100 text-white-100 border border-[#27272a] rounded-[0.8rem] placeholder-[#767676] focus:border-[transparent] focus:outline outline-2 outline-green-600"
            />
          </label>

          <label className="text-[1.2rem] mb-[2.4rem] block" htmlFor="name">
            <input
              id="name"
              placeholder="Nome"
              value={''}
              onChange={(event) => {
                console.log(event.target.name)
              }}
              className="h-[4rem] w-full py-0 px-[1.6rem] text-[1.4rem] bg-black-100 text-white-100 border border-[#27272a] rounded-[0.8rem] placeholder-[#767676] focus:border-[transparent] focus:outline outline-2 outline-green-600"
            />
          </label>

          <label className="text-[1.2rem] mb-[2.4rem] block" htmlFor="password">
            <input
              id="password"
              type="password"
              placeholder="Senha"
              value={''}
              onChange={(event) => {
                console.log(event.target.name)
              }}
              className="h-[4rem] w-full py-0 px-[1.6rem] text-[1.4rem] bg-black-100 text-white-100 border border-[#27272a] rounded-[0.8rem] placeholder-[#767676] focus:border-[transparent] focus:outline outline-2 outline-green-600"
            />
          </label>

          <label
            className="text-[1.2rem] mb-[2.4rem] block"
            htmlFor="confirm_password"
          >
            <input
              id="confirm_password"
              type="password"
              placeholder="Confirmar senha"
              value={''}
              onChange={(event) => {
                console.log(event.target.name)
              }}
              className="h-[4rem] w-full py-0 px-[1.6rem] text-[1.4rem] bg-black-100 text-white-100 border border-[#27272a] rounded-[0.8rem] placeholder-[#767676] focus:border-[transparent] focus:outline outline-2 outline-green-600"
            />
          </label>

          <Link
            to="/sign-in"
            state={{ from: '/sign-up' }}
            className="w-full h-auto mb-[2.4rem] bg-transparent underline text-[1.2rem] text-end transition-colors block hover:text-[#a1a1aa]"
          >
            Voltar para login 👈
          </Link>

          <Button type="submit" className="w-full uppercase">
            Cadastrar
          </Button>
        </form>
      </div>
    </>
  )
}
