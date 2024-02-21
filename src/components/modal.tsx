import { createPortal } from 'react-dom'
import { Loader2, X } from 'lucide-react'

import { Button } from './button'

interface ModalProps {
  title: string
  description: string
  isOpen: boolean
  onClose: () => void
  onSubmit?: () => Promise<void>
  labelSubmitAction?: string
  isDisabled?: boolean
}

export function Modal({
  title,
  description,
  isOpen,
  onClose,
  onSubmit,
  labelSubmitAction,
  isDisabled,
}: ModalProps) {
  const containerId = document.getElementById('modal-root')

  if (!containerId) return null

  return (
    isOpen &&
    createPortal(
      <section className="w-full h-full absolute inset-0 backdrop-blur-sm z-20 flex items-center justify-center">
        <div className="mx-4 max-w-[480px] border border-gray-900 rounded-lg shadow-2xl bg-black-100">
          <div className="py-4 px-6 flex items-center justify-between">
            <span className="md:text-xl font-semibold inline-block">
              {title}
            </span>

            <Button.Root
              className="w-8 h-8 p-0 bg-transparent"
              onClick={onClose}
            >
              <Button.Icon name={X} />
            </Button.Root>
          </div>
          <div className="py-4 px-6">
            <p className="text-sm md:text-base text-gray-500">{description}</p>
          </div>
          <div className="py-4 px-6 flex items-center justify-end gap-4">
            <Button.Root onClick={onClose}>Cancelar</Button.Root>
            {!!onSubmit && (
              <Button.Root
                className="bg-[#ad0337] hover:bg-[#7e0028]"
                onClick={onSubmit}
                disabled={isDisabled}
              >
                {isDisabled ? (
                  <Loader2 className="animate-spin size-5" />
                ) : (
                  labelSubmitAction
                )}
              </Button.Root>
            )}
          </div>
        </div>
      </section>,
      containerId
    )
  )
}
