import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'

import { Button } from '@/components/button'
import { Input } from '@/components/form/input'

import { useAuth } from '@/contexts/auth'

import './styles.css'

export function SignIn() {
  const navigate = useNavigate()
  const { isLoading, signIn } = useAuth()

  const { mutateAsync } = useMutation({
    mutationKey: ['sign-in'],
    mutationFn: signIn,
  })

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    await mutateAsync({ email, password })
    navigate('/')
  }

  return (
    <div className="sign-in-container">
      <h1>
        Gerencie <br />
        seus <br />
        <span>horários</span>.
      </h1>

      <form onSubmit={onSubmit} aria-label="sign-in-form">
        <Input
          placeholder="E-mail"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <Link to="/sign-up">Cadastre-se aqui 👈</Link>

        <Button type="submit" disabled={isLoading}>
          {!isLoading ? (
            'Entrar'
          ) : (
            <Loader2 size={20} className="animate-spin" />
          )}
        </Button>
      </form>
    </div>
  )
}
