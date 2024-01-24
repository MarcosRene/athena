import { ChangeEvent, ComponentProps, useMemo, useState } from 'react'

import { cn } from '@/lib/utils'

interface InputFile extends ComponentProps<'label'> {
  onFileSelected: (file: File) => void
}

export function InputFile({ onFileSelected, ...attrs }: InputFile) {
  const { className } = attrs

  const [imageFile, setImageFile] = useState<File | null>(null)

  function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget

    if (!files) {
      return
    }

    const selectedFile = files[0]

    if (!selectedFile.type.startsWith('image/')) {
      alert('Aquivo inválido!')
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
    <div className="mb-[4.8rem] block">
      <label
        htmlFor="video"
        className={cn(
          'relative w-[12.8rem] h-[12.8rem] border border-[#27272a] flex rounded-full ring-2 ring-[#27272a] overflow-hidden cursor-pointer',
          className
        )}
        title="Selecione uma foto"
        aria-label="Selecione uma foto"
        {...attrs}
      >
        {previewURL ? (
          <img src={previewURL} alt="" className="absolute inset-0" />
        ) : (
          <div className="absolute inset-0 bg-gray-500 text-4xl font-semibold flex items-center justify-center">
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