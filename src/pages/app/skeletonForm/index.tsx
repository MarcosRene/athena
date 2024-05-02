import { Skeleton } from '@/components/skeleton'

import './styles.css'

export function FormSkeleton() {
  return (
    <div className="form-skeleton-container">
      <div className="form-skeleton-field-group">
        <Skeleton className="form-skeleton-label" />
        <Skeleton className="form-skeleton-field" />
      </div>

      <div className="form-skeleton-field-group">
        <Skeleton className="form-skeleton-label" />
        <Skeleton className="form-skeleton-field" />
      </div>

      <div className="form-skeleton-field-group">
        <Skeleton className="form-skeleton-label" />
        <Skeleton className="form-skeleton-field" />
      </div>

      <div className="form-skeleton-field-group">
        <Skeleton className="form-skeleton-label" />
        <Skeleton className="form-skeleton-field" />
      </div>

      <div className="form-skeleton-button-group">
        <Skeleton className="form-skeleton-button" />
      </div>
    </div>
  )
}
