import { ChangeEvent, FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User2, Lock, Mail, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/button'
import { Input } from '@/components/input'

import { api } from '@/services/api'

import { delay } from '@/utils/deplay'

import './styles.css'

interface FormData {
  name: string
  email: string
  password: string
  confirm_password: string
}

export function SignUp() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState<FormData>({} as FormData)
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

      toast.success('Usuário cadastrado com sucesso.')
      navigate('/sign-in')
    } catch (error) {
      toast.error('Não foi possível se cadastrar, tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="sign-up__container">
      <form aria-label="sign-up-form" onSubmit={onSubmit}>
        <h1>Crie sua conta</h1>

        <Input.Field>
          <Input.Container>
            <Input.Prefix>
              <Mail className="size-4" />
            </Input.Prefix>

            <Input.Control
              id="email"
              name="email"
              type="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleChange}
            />
          </Input.Container>
        </Input.Field>

        <Input.Field>
          <Input.Container>
            <Input.Prefix>
              <User2 className="size-4" />
            </Input.Prefix>

            <Input.Control
              id="name"
              name="name"
              placeholder="Nome"
              value={formData.name}
              onChange={handleChange}
            />
          </Input.Container>
        </Input.Field>

        <Input.Field>
          <Input.Container>
            <Input.Prefix>
              <Lock className="size-4" />
            </Input.Prefix>

            <Input.Control
              id="password"
              name="password"
              type="password"
              placeholder="Senha"
              value={formData.password}
              onChange={handleChange}
            />
          </Input.Container>
        </Input.Field>

        <Input.Field>
          <Input.Container>
            <Input.Prefix>
              <Lock className="size-4" />
            </Input.Prefix>

            <Input.Control
              id="confirm_password"
              name="confirm_password"
              type="password"
              placeholder="Confirmar senha"
              value={formData.confirm_password}
              onChange={handleChange}
            />
          </Input.Container>
        </Input.Field>

        <Link to="/sign-in">Voltar para login 👈</Link>

        <Button.Root
          type="submit"
          className="w-full uppercase"
          disabled={isLoading}
        >
          {!isLoading ? (
            'Cadastrar'
          ) : (
            <Button.Icon name={Loader2} className="animate-spin size-5" />
          )}
        </Button.Root>
      </form>
    </div>
  )
}
