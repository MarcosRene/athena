import { memo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Pencil, Trash2 } from 'lucide-react'

import { Button } from '@/components/button'

import { ScheduleResponse } from '../../types'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import './styles.css'

interface SchedulesProps {
  schedules: ScheduleResponse[]
  onSelectedScheduleId: (id: string) => void
}

function SchedulesBase({ schedules, onSelectedScheduleId }: SchedulesProps) {
  const navigate = useNavigate()

  return (
    <ul className="schedules-container">
      {schedules?.map((schedule) => (
        <li key={schedule.identifier}>
          <div className="schedules-item-head">
            <Link
              to={`${schedule._id}/edit-schedule`}
              className={`${schedule.oldScheduling ? 'schedule-inactive' : 'schedule-active'}`}
              aria-disabled={schedule.oldScheduling}
            >
              {schedule.identifier}
            </Link>

            <div>
              {!schedule.oldScheduling && (
                <Button
                  onClick={() => navigate(`/${schedule._id}/edit-schedule`)}
                  title="Botão editar"
                >
                  <Pencil size={16} />
                </Button>
              )}

              <Button
                onClick={() => onSelectedScheduleId(schedule._id)}
                title="Botão excluír"
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </div>

          <div className="schedules-item-body">
            <span data-label="Professor" title={schedule.teacher?.name}>
              Professor: <span>{schedule.teacher?.name}</span>
            </span>

            <span title={schedule.subject}>{schedule.subject}</span>

            <span title={schedule.description}>{schedule.description}</span>
          </div>

          <span className="schedules-item-date">
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
