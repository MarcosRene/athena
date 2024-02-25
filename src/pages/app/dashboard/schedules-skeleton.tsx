import { Skeleton } from '@/components/skeleton'

export function SchedulesSkeleton() {
  return (
    <ul
      className="w-full grid grid-cols-auto-fill gap-4 list-none"
      aria-label="schedules-skeleton"
      title="Carregando..."
    >
      {Array.from(Array(9).keys()).map((index) => (
        <li
          key={index}
          className="relative px-4 py-5 transition-colors border border-gray-900 rounded-lg"
        >
          <div className="mb-6 flex items-center justify-between gap-1">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-12" />
          </div>

          <div className="flex flex-col gap-3">
            <Skeleton className="h-4 w-3/6" />
            <Skeleton className="h-4 w-4/6" />

            <div className="flex flex-col gap-2">
              <Skeleton className="h-3 w-4/5" />
              <Skeleton className="h-3 w-full" />
            </div>

            <Skeleton className="h-3 w-40" />
          </div>
        </li>
      ))}
    </ul>
  )
}
