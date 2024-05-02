import { Link } from 'react-router-dom'

import './styles.css'

export function NotFound() {
  return (
    <div className="not-found-container">
      <h1>Página não encontrada</h1>
      <p>
        Voltar para o <Link to="/">Dashboard</Link>
      </p>
    </div>
  )
}
