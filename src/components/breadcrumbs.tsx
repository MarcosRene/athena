import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

import { cn } from '@/lib/utils'

interface BreadcrumbsProps {
  breadcrumbs: { label: string; href: string; activeLink?: boolean }[]
}

export function Breadcrumbs({ breadcrumbs }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-12 block">
      <ol className="flex text-xl md:text-2xl">
        {Object.entries(breadcrumbs).map(
          ([index, { label, href, activeLink }]) => (
            <li
              key={`${href}-${index}`}
              aria-current={activeLink}
              className={cn(
                activeLink ? 'text-green-500 font-medium' : 'text-gray-300'
              )}
            >
              <Link to={href}>{label}</Link>
              {Number(index) < breadcrumbs.length - 1 ? (
                <ChevronRight size={20} className="mx-3 inline-block" />
              ) : null}
            </li>
          )
        )}
      </ol>
    </nav>
  )
}
