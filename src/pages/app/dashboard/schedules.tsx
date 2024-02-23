import { memo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Pencil, Trash2 } from 'lucide-react'

import { Button } from '@/components/button'

import { ScheduleResponse } from '../types'

interface SchedulesProps {
  schedules: ScheduleResponse[]
  onSelectedScheduleId: (id: string) => void
}

function SchedulesBase({ schedules, onSelectedScheduleId }: SchedulesProps) {
  const navigate = useNavigate()

  // width: min-content;
  // max-width: -webkit-fill-available;
  // margin-right: auto;

  return (
    <ul className="w-full grid gap-[1px] grid-cols-auto-fill bg-gray-900 border border-gray-900 rounded-lg overflow-hidden list-none">
      {schedules?.slice(0, 12)?.map((schedule) => (
        <li
          key={schedule.identifier}
          className="relative p-4 bg-zinc-950/75 transition-colors hover:bg-black-100"
        >
          <div className="mb-4 flex items-center justify-between gap-1">
            <Link
              to="/1/edit-schedule"
              className={`relative text-sm font-medium block underline before:h-2 before:w-2 before:absolute before:top-1 before:-right-4 before:rounded-full ${schedule.oldScheduling ? 'before:bg-orange-600 aria-disabled:pointer-events-none' : 'before:bg-green-600'}`}
              aria-disabled={schedule.oldScheduling}
            >
              {schedule.identifier}
            </Link>

            <div className="flex gap-1">
              {!schedule.oldScheduling && (
                <Button.Root
                  className="w-6 h-6 p-0 bg-transparent text-gray-500"
                  onClick={() => navigate(`/${schedule._id}/edit-schedule`)}
                  title="Botão editar"
                >
                  <Button.Icon name={Pencil} className="size-4" />
                </Button.Root>
              )}

              <Button.Root
                className="w-6 h-6 p-0 bg-transparent text-gray-500"
                onClick={() => onSelectedScheduleId(schedule._id)}
                title="Botão excluír"
              >
                <Button.Icon name={Trash2} className="size-4" />
              </Button.Root>
            </div>
          </div>

          <div className="h-24 flex flex-col gap-2">
            <h1
              className="text-sm font-medium line-clamp-1"
              title={schedule.subject}
            >
              {schedule.subject}
            </h1>

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
  )
}

export const Schedules = memo(SchedulesBase)
