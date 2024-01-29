import { Helmet } from 'react-helmet-async'

import { Breadcrumbs } from '@/components/breadcrumbs'
import { Input } from '@/components/input'
import { InputFile } from '@/components/input-file'
import { Button } from '@/components/button'

export function Profile() {
  return (
    <>
      <Helmet title="Perfil" />

      <Breadcrumbs breadcrumbs={[{ label: 'Perfil', href: '/profile' }]} />

      <div className="pt-4 flex flex-col items-center md:flex-row md:items-start gap-16">
        <div className="w-full max-w-40 flex flex-col items-center">
          <InputFile
            onFileSelected={(value) => {
              console.log({ value })
            }}
          />

          <span className="font-medium text-2xl">Marcos Renê</span>
        </div>

        <div className="block md:grid md:grid-cols-2 gap-x-6 w-full self-baseline">
          <Input
            id="email"
            placeholder="johndoe@email.com"
            value={''}
            onChange={(event) => {
              console.log(event.target.value)
            }}
          />
          <Input
            id="name"
            placeholder="John Doe"
            value={''}
            onChange={(event) => {
              console.log(event.target.value)
            }}
          />
          <Input
            id="password"
            placeholder="Senha"
            value={''}
            onChange={(event) => {
              console.log(event.target.value)
            }}
          />
          <Input
            id="confirm_password"
            placeholder="Confirmar senha"
            value={''}
            onChange={(event) => {
              console.log(event.target.value)
            }}
          />
          <div className="col-start-2 col-end-2 flex justify-end">
            <Button className="uppercase font-medium">Atualizar</Button>
          </div>
        </div>
      </div>
    </>
  )
}
