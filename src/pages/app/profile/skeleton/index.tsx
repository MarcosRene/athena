import { Skeleton } from '@/components/skeleton'

import './styles.css'

export function ProfileSkeleton() {
  return (
    <div
      className="profile-skeleton-container"
      aria-label="profile-skeleton"
      title="Carregando..."
    >
      <div className="profile-skeleton-user">
        <Skeleton className="profile-skeleton-avatar" />

        <Skeleton className="profile-skeleton-username" />
      </div>

      <div className="profile-skeleton-field-group">
        <Skeleton className="profile-skeleton-field" />
        <Skeleton className="profile-skeleton-field" />
        <Skeleton className="profile-skeleton-field" />
        <Skeleton className="profile-skeleton-field" />

        <div className="profile-skeleton-button-group">
          <Skeleton className="button" />
        </div>
      </div>
    </div>
  )
}
