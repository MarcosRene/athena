import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

import './styles.css'

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
    <nav aria-label="Breadcrumb" className="breadcrumbs-container">
      <ol>
        {Object.entries(breadcrumbs).map(
          ([index, { label, href, activeLink }]) => (
            <li
              key={`${href}-${index}`}
              aria-current={activeLink}
              className={activeLink ? 'active-link' : ''}
            >
              <Link to={href}>{label}</Link>
              {Number(index) < breadcrumbs.length - 1 ? (
                <ChevronRight size={20} />
              ) : null}
            </li>
          )
        )}
      </ol>
    </nav>
  )
}
