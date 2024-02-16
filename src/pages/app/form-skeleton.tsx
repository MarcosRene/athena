import { Skeleton } from '@/components/skeleton'

export function FormSkeleton() {
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="block w-full">
        <Skeleton className="mb-2 w-20 h-5" />
        <Skeleton className="w-auto h-10 rounded-lg" />
      </div>

      <div className="block w-full">
        <Skeleton className="mb-2 w-20 h-5" />
        <Skeleton className="w-auto h-10 rounded-lg" />
      </div>

      <div className="block w-full">
        <Skeleton className="mb-2 w-20 h-5" />
        <Skeleton className="w-auto h-40 rounded-lg" />
      </div>

      <div className="block w-full">
        <Skeleton className="mb-2 w-20 h-5" />
        <Skeleton className="w-[446px] h-[436px] rounded-lg" />
      </div>

      <div className="w-full flex justify-end mt-4">
        <Skeleton className="w-20 h-10 rounded-lg" />
      </div>
    </div>
  )
}
