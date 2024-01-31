import { ChangeEvent, ComponentProps, useMemo, useState } from 'react'
import { toast } from 'sonner'

import { cn } from '@/lib/utils'

interface InputFile extends ComponentProps<'label'> {
  onFileSelected: (file: File) => void
}

export function InputFile({ onFileSelected, className, ...attrs }: InputFile) {
  const [imageFile, setImageFile] = useState<File | null>(null)

  function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget

    if (!files) {
      return
    }

    const selectedFile = files[0]

    if (!selectedFile.type.startsWith('image/')) {
      toast.error('Selecione um arquivo válido!')
      return
    }

    setImageFile(selectedFile)
    onFileSelected(selectedFile)
  }

  const previewURL = useMemo(() => {
    if (!imageFile) {
      return null
    }

    return URL.createObjectURL(imageFile)
  }, [imageFile])

  return (
    <div className="mb-4 block">
      <label
        htmlFor="video"
        className={cn(
          'relative w-28 h-28 lg:w-32 lg:h-32 border border-[#27272a] flex rounded-full ring-2 ring-[#27272a] overflow-hidden cursor-pointer',
          className
        )}
        title="Selecione uma foto"
        aria-label="Selecione uma foto"
        {...attrs}
      >
        {previewURL ? (
          <img src={previewURL} alt="" className="absolute inset-0" />
        ) : (
          <div className="absolute inset-0 bg-gray-500 text-2xl lg:text-4xl font-logo font-semibold flex items-center justify-center">
            US
          </div>
        )}
      </label>

      <input
        id="video"
        type="file"
        accept="image/png, image/jpeg"
        className="sr-only"
        onChange={handleFileSelected}
      />
    </div>
  )
}
