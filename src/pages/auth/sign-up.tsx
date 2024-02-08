import { ChangeEvent, FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { User2Icon, LockIcon, MailIcon } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/button'
import { Input } from '@/components/input'

import { api } from '@/services/api'

import { delay } from '@/utils/deplay'

interface FormData {
  name: string
  email: string
  password: string
  confirm_password: string
}

const initialFormDataState = {
  name: '',
  email: '',
  password: '',
  confirm_password: '',
}

export function SignUp() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState<FormData>(initialFormDataState)
  const [isLoading, setIsLoading] = useState(false)

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    try {
      delay(1000)

      await api.post('/users', formData)

      toast.success('Usuário cadastrado com sucesso!')
      navigate('/sign-in')
    } catch (error) {
      console.log(error)
      toast.error('Não foi possível se cadastrar, tente novamente!')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Helmet title="Cadastre-se" />

      <div className="h-full w-full flex items-center justify-center">
        <form
          aria-label="sign-up-form"
          onSubmit={onSubmit}
          className="w-full max-w-[400px] py-12 px-[38px] border border-gray-900 rounded-lg animate-slider-right-to-left"
        >
          <h2 className="mb-10 text-2xl font-bold">Crie sua conta</h2>

          <Input
            id="email"
            name="email"
            type="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            icon={MailIcon}
          />

          <Input
            id="name"
            name="name"
            placeholder="Nome"
            value={formData.name}
            onChange={handleChange}
            icon={User2Icon}
          />

          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
            icon={LockIcon}
          />

          <Input
            id="confirm_password"
            name="confirm_password"
            type="password"
            placeholder="Confirmar senha"
            value={formData.confirm_password}
            onChange={handleChange}
            icon={LockIcon}
          />

          <Link
            to="/sign-in"
            state={{ from: '/sign-up' }}
            className="w-full h-auto mb-6 bg-transparent underline text-xs text-end transition-colors block hover:text-[#a1a1aa]"
          >
            Voltar para login 👈
          </Link>

          <Button
            type="submit"
            className="w-full uppercase"
            isLoading={isLoading}
            disabled={isLoading}
          >
            Cadastrar
          </Button>
        </form>
      </div>
    </>
  )
}
