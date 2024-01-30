import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2Icon, SettingsIcon, Trash2Icon } from 'lucide-react'

import { Button } from '@/components/button'
import { Modal } from '@/components/modal'

export function ListSchedules() {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
      setIsLoading(false)
    }, 2000)
  })

  return (
    <div className="overflow-x-auto border border-gray-900 rounded-lg">
      <table className="w-full relative min-h-44">
        <thead>
          <tr className="border-b border-b-gray-900">
            <th className="min-w-28 lg:w-auto pl-6 lg:pl-16 py-4 text-start text-sm font-medium">
              Identificador
            </th>
            <th className="min-w-28 lg:w-auto pl-6 lg:pl-16 py-4 text-start text-sm font-medium">
              Assunto
            </th>
            <th className="max-w-28 lg:w-auto pl-6 lg:pl-16 py-4 text-start text-sm font-medium">
              Descrição
            </th>
            <th className="min-w-52 lg:w-auto pl-6 lg:pl-16 py-4 text-start text-sm font-medium">
              Data/Horário
            </th>
            <th className="min-w-28 lg:w-auto pl-6 pr-6 lg:pl-16"></th>
          </tr>
        </thead>

        {isLoading ? (
          <div className="absolute top-2/4 right-2/4 -translate-x-2/4">
            <Loader2Icon className="h-12 w-h-12 animate-spin text-green-500" />
          </div>
        ) : (
          <tbody>
            {Array.from(Array(10).keys()).map((index) => (
              <tr
                key={`tr-${index}`}
                className="border-b border-b-gray-900 even:bg-[#0c0c10] last:border-none"
              >
                <td className="min-w-28 lg:w-auto pl-6 lg:pl-16 py-4 text-sm">
                  #12345678
                </td>
                <td className="min-w-28 lg:w-auto pl-6 lg:pl-16 py-4 text-sm">
                  Tema TCC
                </td>
                <td
                  className="max-w-52 lg:w-auto pl-6 lg:pl-16 py-4 text-sm overflow-hidden overflow-ellipsis whitespace-nowrap"
                  title={'Fala sobre o tema do meu tcc'}
                >
                  Fala sobre o tema do meu tcc
                </td>
                <td className="min-w-52 lg:w-auto pl-6 lg:pl-16 py-4 text-sm">
                  08 de Janeiro, às 14:00
                </td>
                <td className="min-w-28 lg:w-auto pl-6 pr-pl-6 lg:pl-16 py-4 text-sm">
                  <div className="flex items-center gap-4">
                    <Button
                      icon={SettingsIcon}
                      iconSize={16}
                      title="Editar"
                      aria-label="Edit Button"
                      className="w-8 h-8 p-0 bg-[#1F70C6] hover:bg-[#14609b] flex justify-center gap-0"
                      onClick={() => navigate('/1/edit-schedule')}
                    ></Button>
                    <Button
                      icon={Trash2Icon}
                      iconSize={16}
                      title="Deletar"
                      aria-label="Delete Button"
                      className="w-8 h-8 p-0 bg-[#DD0939] hover:bg-[#ad0337] flex justify-center gap-0"
                      onClick={() => setIsModalOpen(true)}
                    ></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>

      <Modal
        title="Deseja excluir o agendamento?"
        description="Você tem certeza que deseja excluir o agendamento? Após a exclusão, não será possível visualizar mais informações sobre o agendamento."
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={() => {}}
        labelSubmitAction="Excluir"
      />
    </div>
  )
}
