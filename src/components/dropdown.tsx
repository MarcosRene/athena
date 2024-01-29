import {
  ComponentProps,
  ComponentRef,
  ElementType,
  useEffect,
  useRef,
} from 'react'

import { cn } from '@/lib/utils'

interface DropdownRootProps extends ComponentProps<'div'> {
  isOpen: boolean
  onClose: (value: boolean) => void
}

interface DropdownItemProps extends ComponentProps<'div'> {}

function DropdownRoot({
  children,
  className,
  isOpen,
  onClose,
}: DropdownRootProps) {
  const dropdownRootRef = useRef<ComponentRef<'div'>>(null)

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        dropdownRootRef.current &&
        !dropdownRootRef.current.contains(event.target as Node)
      ) {
        onClose(!isOpen)
      }
    }

    window.addEventListener('mousedown', handleOutsideClick)

    return () => window.removeEventListener('mousedown', handleOutsideClick)
  }, [isOpen, onClose])

  return (
    <div
      ref={dropdownRootRef}
      className={cn(
        'absolute -bottom-2/4 translate-y-full right-0 max-w-fit bg-[#0c0c10] border border-gray-900 rounded-lg overflow-hidden',
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
        'w-32 py-3 px-4 text-sm border-b border-b-gray-900 flex items-center transition-colors cursor-pointer hover:bg-gray-900 last:border-none',
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
