import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">Página não encontrada</h1>
      <p>
        Voltar para o{' '}
        <Link to="/" className="text-green-500 underline">
          Dashboard
        </Link>
      </p>
    </div>
  )
}
