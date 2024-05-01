import { Link } from 'react-router-dom'

import empty from '@/assets/img/empty.svg'

import './styles.css'

export function Empty() {
  return (
    <div className="empty__container">
      <img
        src={empty}
        alt="Duas pranchetas uma sobre a outra, na cor preta, com prendedor verde e folhas cinzas."
        width={280}
        height={280}
      />

      <div className="empty__content">
        <h4>Você não possui agendamentos disponíveis!</h4>

        <Link to="/new-schedule">Criar uma agendamento</Link>
      </div>
    </div>
  )
}
