import { ComponentProps } from 'react'

import './styles.css'

interface TextareaProps extends ComponentProps<'textarea'> {}

export function Textarea({ ...props }: TextareaProps) {
  return <textarea className="textarea-container" {...props} />
}
