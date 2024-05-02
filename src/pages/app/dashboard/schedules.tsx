import { memo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Pencil, Trash2 } from 'lucide-react'

import { Button } from '@/components/button'

import { ScheduleResponse } from '../types'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface SchedulesProps {
  schedules: ScheduleResponse[]
  onSelectedScheduleId: (id: string) => void
}

function SchedulesBase({ schedules, onSelectedScheduleId }: SchedulesProps) {
  const navigate = useNavigate()

  return (
    <ul className="w-full grid grid-cols-auto-fill gap-4 list-none">
      {schedules?.map((schedule) => (
        <li
          key={schedule.identifier}
          className="relative p-4 transition-colors border border-gray-900 rounded-lg hover:bg-zinc-900"
        >
          <div className="mb-2 flex items-center justify-between">
            <Link
              to={`${schedule._id}/edit-schedule`}
              className={`relative text-sm font-medium block underline before:h-2 before:w-2 before:absolute before:top-1 before:-right-4 before:rounded-full ${schedule.oldScheduling ? 'before:bg-orange-600 aria-disabled:pointer-events-none' : 'before:bg-green-600'}`}
              aria-disabled={schedule.oldScheduling}
            >
              {schedule.identifier}
            </Link>

            <div className="flex gap-1">
              {!schedule.oldScheduling && (
                <Button
                  className="w-6 h-6 p-0 bg-transparent text-gray-500"
                  onClick={() => navigate(`/${schedule._id}/edit-schedule`)}
                  title="Botão editar"
                >
                  <Pencil className="size-4" />
                </Button>
              )}

              <Button
                className="w-6 h-6 p-0 bg-transparent text-gray-500"
                onClick={() => onSelectedScheduleId(schedule._id)}
                title="Botão excluír"
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>

          <div className="h-28 flex flex-col gap-2">
            <span
              data-label="Professor"
              className="text-sm font-medium line-clamp-1"
              title={schedule.teacher?.name}
            >
              Professor:{' '}
              <span className="text-gray-500">{schedule.teacher?.name}</span>
            </span>

            <span
              className="text-sm font-medium line-clamp-1"
              title={schedule.subject}
            >
              {schedule.subject}
            </span>

            <span
              className="text-sm text-gray-500 line-clamp-2"
              title={schedule.description}
            >
              {schedule.description}
            </span>
          </div>

          <span className="w-full mt-auto text-sm text-gray-500 block">
            {format(schedule.date, "• dd 'de' MMMM, 'às' HH:mm.", {
              locale: ptBR,
            })}
          </span>
        </li>
      ))}
    </ul>
  )
}

export const Schedules = memo(SchedulesBase)
