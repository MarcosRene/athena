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
    <div className="max-w-[102.4rem] py-[4.8rem] px-[3.8rem] flex items-center justify-between gap-8">
      <h1 className="text-[9.2rem] font-black leading-[8.8rem]">
        Gerencie seus <span className="text-green-500">horários</span>.
      </h1>

      <form
        onSubmit={handleSubmit}
        aria-label="form"
        className="w-full max-w-[32rem] py-[4.8rem] px-[3.8rem] border border-[#27272a] rounded-[0.8rem]"
      >
        <label className="text-[1.2rem] mb-[1.6rem] block" htmlFor="email">
          <input
            id="email"
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-[4rem] w-full py-0 px-[1.6rem] text-[1.4rem] bg-black-100 text-white-100 border border-[#27272a] rounded-[0.8rem] placeholder-[#767676] focus:border-[transparent] focus:outline outline-2 outline-green-600"
          />
        </label>

        <label className="text-[1.2rem] mb-[1.6rem] block" htmlFor="password">
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-[4rem] w-full py-0 px-[1.6rem] text-[1.4rem] bg-black-100 text-white-100 border border-[#27272a] rounded-[0.8rem] placeholder-[#767676] focus:border-[transparent] focus:outline outline-2 outline-green-600"
          />
        </label>

        <Button
          type="submit"
          className="w-full mt-[4rem] mb-[1.6rem] uppercase"
        >
          Entrar
        </Button>
      </form>
    </div>
  )
}
