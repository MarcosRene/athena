import { createPortal } from 'react-dom'
import { XIcon } from 'lucide-react'

import { Button } from './button'

interface ModalProps {
  title: string
  description: string
  isOpen: boolean
  onClose: () => void
  onSubmit?: () => void
  labelSubmitAction?: string
}

export function Modal({
  title,
  description,
  isOpen,
  onClose,
  onSubmit,
  labelSubmitAction,
}: ModalProps) {
  const containerId = document.getElementById('modal-root')

  if (!containerId) return

  return (
    isOpen &&
    createPortal(
      <section className="w-full h-full absolute inset-0 backdrop-blur-sm z-20 flex items-center justify-center">
        <div className="mx-4 max-w-[480px] border border-gray-900 rounded-lg shadow-2xl bg-black-100">
          <div className="py-4 px-6 flex items-center justify-between">
            <span className="md:text-xl font-semibold inline-block">
              {title}
            </span>

            <Button
              icon={XIcon}
              iconSize={20}
              className="w-8 h-8 p-0 bg-transparent"
              onClick={onClose}
            ></Button>
          </div>
          <div className="py-4 px-6">
            <p className="text-sm md:text-base text-gray-500">{description}</p>
          </div>
          <div className="py-4 px-6 flex items-center justify-end gap-4">
            <Button onClick={onClose}>Cancelar</Button>
            {!!onSubmit && (
              <Button
                className="bg-[#ad0337] hover:bg-[#7e0028]"
                onClick={onSubmit}
              >
                {labelSubmitAction}
              </Button>
            )}
          </div>
        </div>
      </section>,
      containerId
    )
  )
}
