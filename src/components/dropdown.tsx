import { ComponentProps, ElementType } from 'react'

import { cn } from '@/lib/utils'

interface DropdownRootProps extends ComponentProps<'div'> {}
interface DropdownItemProps extends ComponentProps<'div'> {}

function DropdownRoot({ children, className }: DropdownRootProps) {
  return (
    <div
      className={cn(
        'absolute bottom-[-50%] translate-y-[100%] right-0 max-w-fit bg-[#0c0c10] border border-gray-900 rounded-[0.8rem] overflow-hidden',
        className
      )}
    >
      {children}
    </div>
  )
}

function DropdownItem({ children, className }: DropdownItemProps) {
  return (
    <div
      className={cn(
        'w-[13.2rem] py-[1rem] px-[1.6rem] text-[1.4rem] border-b border-b-gray-900 flex items-center transition-colors cursor-pointer hover:bg-gray-900 last:border-none',
        className
      )}
    >
      {children}
    </div>
  )
}

interface DropdownIconProps {
  icon: ElementType
  size?: number
}

function DropdownIcon({ icon: Icon, size = 16, ...attrs }: DropdownIconProps) {
  return <Icon size={size} {...attrs} />
}

export const Dropdownm = {
  Root: DropdownRoot,
  Item: DropdownItem,
  Icon: DropdownIcon,
}
