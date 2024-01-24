import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { PlusIcon, SettingsIcon, Trash2Icon } from 'lucide-react'

import { Button } from '@/components/button'

export function Dashboard() {
  const navigate = useNavigate()

  return (
    <>
      <Helmet title="Dashboard" />

      <div className="mb-[4.2rem] flex items-center justify-between">
        <span>Dashboard</span>

        <Button
          icon={PlusIcon}
          iconSize={18}
          rlt
          className="uppercase font-medium gap-[0.8rem]"
          onClick={() => navigate('/new-schedule', { replace: true })}
        >
          Criar
        </Button>
      </div>

      <div className="relative overflow-x-auto border border-gray-900 rounded-[0.8rem]">
        <table className="w-full table-fixed">
          <thead>
            <tr className="border-b border-b-gray-900">
              <th className="pl-[6.4rem] py-[1.6rem] text-start text-[1.4rem] font-medium">
                Identificador
              </th>
              <th className="pl-[6.4rem] py-[1.6rem] text-start text-[1.4rem] font-medium">
                Assunto
              </th>
              <th className="pl-[6.4rem] py-[1.6rem] text-start text-[1.4rem] font-medium">
                Descrição
              </th>
              <th className="pl-[6.4rem] py-[1.6rem] text-start text-[1.4rem] font-medium">
                Data/Horário
              </th>
              <th className="pl-[6.4rem]"></th>
            </tr>
          </thead>

          <tbody>
            {Array.from(Array(10).keys()).map((index) => (
              <tr
                key={`tr-${index}`}
                className="border-b border-b-gray-900 even:bg-[#0c0c10]"
              >
                <td className="pl-[6.4rem] py-[1.6rem] text-[1.4rem]">
                  #12345678
                </td>
                <td className="pl-[6.4rem] py-[1.6rem] text-[1.4rem]">
                  Tema TCC
                </td>
                <td className="pl-[6.4rem] py-[1.6rem] text-[1.4rem]">
                  Fala sobre o tema do meu tcc
                </td>
                <td className="pl-[6.4rem] py-[1.6rem] text-[1.4rem]">
                  08 de Janeiro, às 14:00
                </td>
                <td className="pl-[6.4rem] py-[1.6rem] text-[1.4rem]">
                  <div className="flex items-center gap-4">
                    <Button
                      icon={SettingsIcon}
                      iconSize={16}
                      title="Editar"
                      aria-label="Edit Button"
                      className="w-[3.2rem] h-[3.2rem] p-0 bg-[#1F70C6] hover:bg-[#14609b] flex justify-center gap-0"
                    ></Button>
                    <Button
                      icon={Trash2Icon}
                      iconSize={16}
                      title="Deletar"
                      aria-label="Delete Button"
                      className="w-[3.2rem] h-[3.2rem] p-0 bg-[#DD0939] hover:bg-[#ad0337] flex justify-center gap-0"
                    ></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
