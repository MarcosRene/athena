import { Skeleton } from '@/components/skeleton'

export function ProfileSkeleton() {
  return (
    <div
      className="pt-4 flex flex-col items-center md:flex-row md:items-start gap-8 lg:gap-16"
      aria-label="profile-skeleton"
      title="Carregando..."
    >
      <div className="w-full max-w-40 flex flex-col items-center gap-5">
        <Skeleton className="w-32 h-32 rounded-full" />

        <Skeleton className="w-32 h-8 rounded-lg" />
      </div>

      <div className="block md:grid md:grid-cols-2 gap-6 w-full self-baseline">
        <Skeleton className="w-auto h-10 rounded-lg" />
        <Skeleton className="w-auto h-10 rounded-lg" />
        <Skeleton className="w-auto h-10 rounded-lg" />
        <Skeleton className="w-auto h-10 rounded-lg" />

        <div className="col-start-2 col-end-2 flex justify-end">
          <Skeleton className="w-28 h-10 rounded-lg" />
        </div>
      </div>
    </div>
  )
}
