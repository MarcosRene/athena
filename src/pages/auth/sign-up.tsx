import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { User2Icon, LockIcon, MailIcon } from 'lucide-react'

import { Button } from '@/components/button'
import { Input } from '@/components/input'

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

          <Input
            id="email"
            type="email"
            placeholder="E-mail"
            value={''}
            onChange={(event) => {
              console.log(event.target.name)
            }}
            icon={MailIcon}
          />

          <Input
            id="name"
            placeholder="Nome"
            value={''}
            onChange={(event) => {
              console.log(event.target.name)
            }}
            icon={User2Icon}
          />

          <Input
            id="password"
            type="password"
            placeholder="Senha"
            value={''}
            onChange={(event) => {
              console.log(event.target.name)
            }}
            icon={LockIcon}
          />

          <Input
            id="confirm_password"
            type="password"
            placeholder="Confirmar senha"
            value={''}
            onChange={(event) => {
              console.log(event.target.name)
            }}
            icon={LockIcon}
          />

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
