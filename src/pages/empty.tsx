import { Link } from 'react-router-dom'

import empty from '@/assets/img/empty.svg'

export function Empty() {
  return (
    <div className="mt-20 flex flex-col items-center">
      <img
        src={empty}
        alt="Duas pranchetas uma sobre a outra, na cor preta, com prendedor verde e folhas cinzas."
        width={280}
        height={280}
      />

      <div className="mt-8 flex flex-col items-center">
        <h4 className="text-base md:text-lg text-center">
          Você não possui agendamentos disponíveis!
        </h4>

        <Link
          to="/new-schedule"
          className="w-auto text-sm md:text-base text-green-500 underline inline-block"
        >
          Criar uma agendamento
        </Link>
      </div>
    </div>
  )
}
