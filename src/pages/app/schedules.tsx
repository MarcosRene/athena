import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PencilIcon, Trash2Icon } from 'lucide-react'

import { Button } from '@/components/button'
import { Modal } from '@/components/modal'

import { SchedulesSkeleton } from './schedules-skeleton'

interface Schedule {
  identifier: string
  subject: string
  description: string
  teacher: string
  dateTime: string
  oldScheduling: boolean
}

export function ListSchedules() {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [schedules, setSchedules] = useState<Schedule[]>([])

  useEffect(() => {
    async function fetchSchedules() {
      setIsLoading(true)

      try {
        await new Promise<void>((resolve) => setTimeout(() => resolve(), 3000))

        const response = await fetch('http://localhost:3333/schedules')
        const schedules = await response.json()

        if (!schedules) return

        setSchedules(schedules)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSchedules()
  }, [])

  return (
    <>
      {isLoading ? (
        <SchedulesSkeleton />
      ) : (
        <ul className="grid grid-cols-1 gap-[1px] md:grid-cols-3 xl:grid-cols-4 bg-gray-900 border border-gray-900 rounded-lg overflow-hidden list-none">
          {schedules
            .slice(0, 12)
            .map(
              ({
                identifier,
                subject,
                description,
                dateTime,
                oldScheduling,
              }) => (
                <li
                  key={identifier}
                  className="relative p-4 bg-zinc-950/75 transition-colors hover:bg-black-100"
                >
                  <div className="mb-4 flex items-center justify-between gap-1">
                    <Link
                      to="/1/edit-schedule"
                      className={`relative text-sm font-medium block underline before:h-2 before:w-2 before:absolute before:top-1 before:-right-4 before:rounded-full ${oldScheduling ? 'before:bg-orange-600' : 'before:bg-green-600'}`}
                    >
                      {identifier}
                    </Link>

                    <div className="flex gap-1">
                      <Button
                        className="w-6 h-6 p-0 bg-transparent text-gray-500"
                        icon={PencilIcon}
                        iconSize={16}
                        onClick={() => navigate('/1/edit-schedule')}
                        title="Botão editar"
                      ></Button>

                      <Button
                        className="w-6 h-6 p-0 bg-transparent text-gray-500"
                        icon={Trash2Icon}
                        iconSize={16}
                        onClick={() => setIsModalOpen(true)}
                        title="Botão excluír"
                      ></Button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h4
                      className="text-sm font-medium line-clamp-1"
                      title={subject}
                    >
                      {subject}
                    </h4>

                    <p
                      className="min-h-10 text-sm text-gray-500 line-clamp-2"
                      title={description}
                    >
                      {description}
                    </p>

                    <span className="w-full text-sm text-gray-500 block">
                      • {dateTime}
                    </span>
                  </div>
                </li>
              )
            )}
        </ul>
      )}

      <Modal
        title="Deseja excluir o agendamento?"
        description="Você tem certeza que deseja excluir o agendamento? Após a exclusão, não será possível visualizar mais informações sobre o agendamento."
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={() => {}}
        labelSubmitAction="Excluir"
      />
    </>
  )
}