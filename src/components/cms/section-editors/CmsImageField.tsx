'use client'

import { useRef, useState } from 'react'
import { ImagePlus, Link2, Trash2, UploadCloud } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface CmsImageFieldProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  folder?: string
  placeholder?: string
}

export default function CmsImageField({
  id,
  label,
  value,
  onChange,
  folder = 'nextlevel/home',
  placeholder = 'https://example.com/image.jpg or /image.png',
}: CmsImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [mode, setMode] = useState<'url' | 'upload'>('url')
  const [isUploading, setIsUploading] = useState(false)

  const uploadImage = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', folder)

    setIsUploading(true)

    try {
      const response = await fetch('/api/admin/upload-image', {
        method: 'POST',
        body: formData,
      })
      const result = await response.json().catch(() => null)

      if (!response.ok || !result?.success) {
        throw new Error(result?.error || 'Image upload failed')
      }

      const imageUrl = result.image?.url || result.data?.url
      if (!imageUrl) throw new Error('Upload succeeded but no image URL was returned')

      onChange(imageUrl)
      toast.success('Image uploaded')
    } catch (error: any) {
      toast.error(error.message || 'Could not upload image')
    } finally {
      setIsUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-3">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Label htmlFor={id}>{label}</Label>
          <div className="flex rounded-md border border-slate-200 bg-slate-50 p-0.5">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setMode('url')}
              className={`h-7 gap-1 px-2 text-[11px] ${
                mode === 'url' ? 'bg-[#061331] text-white shadow-xs' : ''
              }`}
            >
              <Link2 className="h-3.5 w-3.5" />
              Link
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setMode('upload')}
              className={`h-7 gap-1 px-2 text-[11px] ${
                mode === 'upload' ? 'bg-[#061331] text-white shadow-xs' : ''
              }`}
            >
              <UploadCloud className="h-3.5 w-3.5" />
              Upload
            </Button>
          </div>
        </div>

        {mode === 'url' ? (
          <Input
            id={id}
            value={value}
            placeholder={placeholder}
            onChange={event => onChange(event.target.value)}
          />
        ) : (
          <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-3 text-center">
            <input
              ref={inputRef}
              id={id}
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
              className="hidden"
              onChange={event => {
                const file = event.target.files?.[0]
                if (file) uploadImage(file)
              }}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isUploading}
              onClick={() => inputRef.current?.click()}
              className="gap-2"
            >
              <ImagePlus className="h-4 w-4" />
              {isUploading ? 'Uploading...' : 'Choose Image'}
            </Button>
            <p className="mt-2 text-[11px] text-slate-400">
              PNG, JPG, GIF, or WebP. Max 5MB.
            </p>
          </div>
        )}
      </div>

      {value && (
        <div className="space-y-2 min-w-0">
          <div
            className="h-24 w-full rounded-md border border-slate-200 bg-slate-100 bg-cover bg-center"
            style={{ backgroundImage: `url("${value}")` }}
            aria-label={`${label} preview`}
          />
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-[11px] text-slate-400">{value}</p>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => onChange('')}
              className="h-8 w-8 shrink-0 text-red-600 hover:text-red-700"
              aria-label={`Remove ${label}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
