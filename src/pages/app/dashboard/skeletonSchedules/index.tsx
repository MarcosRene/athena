import { Skeleton } from '@/components/skeleton'

import './styles.css'

export function SchedulesSkeleton() {
  return (
    <ul
      className="schedules-skeleton-container"
      aria-label="schedules-skeleton"
      title="Carregando..."
    >
      {Array.from(Array(12).keys()).map((index) => (
        <li key={index} className="schedules-skeleton-item">
          <div className="schedules-skeleton-item-head">
            <Skeleton className="schedules-skeleton-item-identifier" />
            <Skeleton className="schedules-skeleton-item-button" />
          </div>

          <div className="schedules-skeleton-item-content">
            <Skeleton className="schedules-skeleton-item-teacher" />
            <Skeleton className="schedules-skeleton-item-subject" />

            <div className="schedules-skeleton-item-description">
              <Skeleton className="schedules-skeleton-description" />
              <Skeleton className="schedules-skeleton-description" />
            </div>

            <Skeleton className="schedules-skeleton-datetime" />
          </div>
        </li>
      ))}
    </ul>
  )
}
