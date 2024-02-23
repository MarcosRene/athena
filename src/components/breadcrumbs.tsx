import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

import { cn } from '@/lib/utils'

type Breadcrumb = {
  label: string
  href: string
  activeLink?: boolean
}

interface BreadcrumbsProps {
  breadcrumbs: Breadcrumb[]
}

export function Breadcrumbs({ breadcrumbs }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-12 block">
      <ol className="flex">
        {Object.entries(breadcrumbs).map(
          ([index, { label, href, activeLink }]) => (
            <li
              key={`${href}-${index}`}
              aria-current={activeLink}
              className={cn(activeLink && 'text-green-500 font-medium')}
            >
              <Link to={href}>{label}</Link>
              {Number(index) < breadcrumbs.length - 1 ? (
                <ChevronRight size={20} className="mx-2 inline-block" />
              ) : null}
            </li>
          )
        )}
      </ol>
    </nav>
  )
}
