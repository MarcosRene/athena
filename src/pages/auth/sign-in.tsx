import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/button'

export function SignIn() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit() {
    navigate('/')
  }

  return (
    <div className="w-full max-w-[32rem] py-[4.8rem] px-[3.8rem] border border-[#27272a] rounded-[0.8rem] flex flex-col items-center">
      <form onSubmit={handleSubmit} aria-label="form">
        <label className="text-[1.2rem] mb-[1.6rem] block" htmlFor="email">
          <input
            id="email"
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="input"
          />
        </label>

        <label className="text-[1.2rem] mb-[1.6rem] block" htmlFor="password">
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="input"
          />
        </label>

        <button className="w-full h-auto p-0 mb-[2.4rem] bg-transparent underline text-[1.2rem] text-end transition-colors hover:text-[#a1a1aa]">
          Forgot your password?
        </button>

        <Button type="submit" className="w-full mb-[1.6rem]">
          Sign in now
        </Button>
      </form>
    </div>
  )
}
