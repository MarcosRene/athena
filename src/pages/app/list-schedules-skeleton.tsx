import { Skeleton } from '@/components/skeleton'

export function ListSchedulesSkeleton() {
  return (
    <ul className="grid grid-cols-1 gap-[1px] md:grid-cols-3 xl:grid-cols-4 bg-gray-900 border border-gray-900 rounded-lg overflow-hidden list-none">
      {Array.from(Array(12).keys()).map((index) => (
        <li key={index} className="relative p-4 bg-zinc-950/75">
          <div className="mb-6 flex items-center justify-between gap-1">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-12" />
          </div>

          <div className="flex flex-col gap-4">
            <Skeleton className="h-4 w-24" />
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
