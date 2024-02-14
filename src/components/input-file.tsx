import { ChangeEvent, useMemo, useState } from 'react'
import { toast } from 'sonner'

interface InputFile {
  onFileSelected: (file: File) => void
  avatarURL?: string
}

export function InputFile({ onFileSelected, avatarURL }: InputFile) {
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
        className="relative w-28 h-28 lg:w-32 lg:h-32 border border-gray-900 flex rounded-full ring-2 ring-gray-900 overflow-hidden cursor-pointer"
        title="Selecione uma foto"
        aria-label="Selecione uma foto"
      >
        {previewURL ? (
          <img
            src={previewURL}
            alt="Preview do Avatar"
            className="absolute inset-0"
          />
        ) : (
          <>
            {avatarURL ? (
              <div className="absolute inset-0 bg-zinc-500 text-2xl lg:text-4xl font-logo font-semibold flex items-center justify-center">
                US
              </div>
            ) : (
              <img src={avatarURL} alt="Avatar" className="absolute inset-0" />
            )}
          </>
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
