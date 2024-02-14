import { ElementType, type ComponentProps } from 'react'
import { LoaderIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

interface ButtonProps extends ComponentProps<'button'> {
  icon?: ElementType
  iconSize?: number
  rlt?: boolean
  isLoading?: boolean
}

export function Button({
  children,
  className,
  icon: Icon,
  iconSize = 18,
  rlt,
  isLoading = false,
  ...attrs
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(`button ${rlt && 'flex-row-reverse'}`, className)}
      {...attrs}
    >
      {isLoading ? (
        <LoaderIcon size={iconSize} className="flex-shrink-0 animate-spin" />
      ) : (
        <>
          {!!Icon && <Icon size={iconSize} className="flex-shrink-0" />}

          {children}
        </>
      )}
    </button>
  )
}
