import { ChangeEvent, useMemo, useState } from 'react'
import { toast } from 'sonner'

import { useAuth } from '@/contexts/auth'

import './styles.css'

interface InputFile {
  onFileSelected: (file: File) => void
  avatarURL?: string
}

export function InputFile({ onFileSelected, avatarURL }: InputFile) {
  const { user } = useAuth()

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
    <div className="input-file-container">
      <label
        htmlFor="video"
        title="Selecione uma foto"
        aria-label="Selecione uma foto"
      >
        {previewURL ? (
          <img src={previewURL} alt="Preview do Avatar" />
        ) : (
          <>
            {avatarURL ? (
              <img src={avatarURL} alt="Avatar" />
            ) : (
              <div className="input-file-preview">{user.name.slice(0, 2)}</div>
            )}
          </>
        )}
      </label>

      <input
        id="video"
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleFileSelected}
      />
    </div>
  )
}
