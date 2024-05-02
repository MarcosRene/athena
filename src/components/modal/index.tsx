import { createPortal } from 'react-dom'
import { Loader2, X } from 'lucide-react'

import { Button } from '../button'

import './styles.css'

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
      <section className="modal-overlay">
        <div className="modal-container">
          <div className="modal-head">
            <span>{title}</span>

            <Button onClick={onClose}>
              <X size={20} />
            </Button>
          </div>

          <div className="modal-body">
            <p>{description}</p>
          </div>

          <div className="modal-footer">
            <Button onClick={onClose}>Cancelar</Button>

            {!!onSubmit && (
              <Button onClick={onSubmit} disabled={isDisabled}>
                {isDisabled ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  labelSubmitAction
                )}
              </Button>
            )}
          </div>
        </div>
      </section>,
      containerId
    )
  )
}
