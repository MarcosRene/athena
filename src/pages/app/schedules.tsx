import {
  ChangeEvent,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { PencilIcon, SearchIcon, Trash2Icon } from 'lucide-react'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Modal } from '@/components/modal'

import { api } from '@/services/api'
import { GetSchedulesResponse, getSchedules } from '@/services/get-schedules'

import { SchedulesSkeleton } from './schedules-skeleton'

export function Schedules() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const subject = searchParams.get('subject')

  const [searchTerm, setSearchTerm] = useState(subject ?? '')
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [schedules, setSchedules] = useState<GetSchedulesResponse[]>([])

  function handleSearchTerm(event: ChangeEvent<HTMLInputElement>) {
    const term = event.target.value

    setSearchParams((state) => {
      if (term) {
        state.set('subject', term)
      } else {
        state.delete('subject')
      }

      return state
    })

    setSearchTerm(term)
  }

  // const filteredSchedules = useMemo(
  //   () =>
  //     schedules.filter((schedule) =>
  //       schedule.subject.toLowerCase().includes(debouncedValue.toLowerCase())
  //     ),
  //   [schedules, debouncedValue]
  // )

  useEffect(() => {
    const controller = new AbortController()

    async function fetchSchedules() {
      setIsLoading(true)

      try {
        const data = await getSchedules({ signal: controller.signal })

        setSchedules(data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSchedules()

    return () => controller.abort()
  }, [])

  if (isLoading) {
    return <SchedulesSkeleton />
  }

  return (
    <>
      <div className="flex flex-col items-end">
        <Input
          placeholder="Buscar por um agendamento"
          icon={SearchIcon}
          onChange={handleSearchTerm}
          value={searchTerm}
          fullFilled
        />

        {schedules.length > 0 ? (
          <ul className="w-auto grid grid-cols-1 gap-[1px] sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 bg-gray-900 border border-gray-900 rounded-lg overflow-hidden list-none">
            {schedules.slice(0, 12).map((schedule) => (
              <li
                key={schedule.identifier}
                className="relative p-4 bg-zinc-950/75 transition-colors hover:bg-black-100"
              >
                <div className="mb-4 flex items-center justify-between gap-1">
                  <Link
                    to="/1/edit-schedule"
                    className={`relative text-sm font-medium block underline before:h-2 before:w-2 before:absolute before:top-1 before:-right-4 before:rounded-full ${schedule.oldScheduling ? 'before:bg-orange-600' : 'before:bg-green-600'}`}
                  >
                    {schedule.identifier}
                  </Link>

                  <div className="flex gap-1">
                    <Button
                      className="w-6 h-6 p-0 bg-transparent text-gray-500"
                      icon={PencilIcon}
                      iconSize={16}
                      onClick={() => navigate(`/${schedule._id}/edit-schedule`)}
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

                <div className="h-24 flex flex-col gap-2">
                  <h4
                    className="text-sm font-medium line-clamp-1"
                    title={schedule.subject}
                  >
                    {schedule.subject}
                  </h4>

                  <p
                    className="text-sm text-gray-500 line-clamp-2"
                    title={schedule.description}
                  >
                    {schedule.description}
                  </p>

                  <span className="w-full mt-auto text-sm text-gray-500 block">
                    • {schedule.dateTime}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

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
