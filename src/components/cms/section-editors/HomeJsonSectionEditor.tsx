'use client'

import { useMemo, useState, useEffect } from 'react'
import { AlertCircle, FileJson, LayoutTemplate, Plus, Trash2 } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { CmsSection } from '@/lib/cms/types'
import CmsImageField from './CmsImageField'

interface HomeJsonSectionEditorProps {
  section: CmsSection
  onChange: (section: CmsSection) => void
}

type FieldPath = Array<string | number>

type ImageField = {
  path: FieldPath
  label: string
  value: string
}

const imageKeyNames = new Set([
  'image',
  'thumbnail',
  'studentavatar',
  'profileimage',
  'avatar',
  'globeimage',
])

function isImageKey(key: string) {
  return imageKeyNames.has(key.toLowerCase())
}

function formatPath(path: FieldPath) {
  return path
    .map(part => (typeof part === 'number' ? `#${part + 1}` : part))
    .join(' / ')
}

function collectImageFields(value: unknown, path: FieldPath = []): ImageField[] {
  if (!value || typeof value !== 'object') return []

  if (Array.isArray(value)) {
    return value.flatMap((item, index) => collectImageFields(item, [...path, index]))
  }

  return Object.entries(value).flatMap(([key, item]) => {
    const nextPath = [...path, key]

    if (typeof item === 'string' && isImageKey(key)) {
      return [
        {
          path: nextPath,
          label: formatPath(nextPath),
          value: item,
        },
      ]
    }

    return collectImageFields(item, nextPath)
  })
}

function setValueAtPath(
  value: unknown,
  path: FieldPath,
  nextValue: any
): unknown {
  if (path.length === 0) return nextValue

  const [head, ...rest] = path

  if (Array.isArray(value)) {
    return value.map((item, index) =>
      index === head ? setValueAtPath(item, rest, nextValue) : item
    )
  }

  if (value && typeof value === 'object' && typeof head === 'string') {
    return {
      ...value,
      [head]: setValueAtPath(
        (value as Record<string, unknown>)[head],
        rest,
        nextValue
      ),
    }
  }

  return value
}

function JsonFormNode({
  data,
  path,
  onChange,
}: {
  data: any
  path: FieldPath
  onChange: (path: FieldPath, value: any) => void
}) {
  if (data === null || data === undefined) return null

  if (typeof data === 'string') {
    const key = path[path.length - 1]
    if (typeof key === 'string' && isImageKey(key)) return null

    const isLongText = data.length > 60 || (typeof key === 'string' && key.toLowerCase().includes('description'))
    if (isLongText) {
      return (
        <Textarea
          value={data}
          onChange={e => onChange(path, e.target.value)}
          rows={3}
          className="text-xs"
        />
      )
    }
    return (
      <Input
        value={data}
        onChange={e => onChange(path, e.target.value)}
        className="text-xs"
      />
    )
  }

  if (typeof data === 'number') {
    return (
      <Input
        type="number"
        value={data}
        onChange={e => onChange(path, Number(e.target.value))}
        className="text-xs"
      />
    )
  }

  if (typeof data === 'boolean') {
    return (
      <div className="flex items-center gap-2 pt-1">
        <input
          type="checkbox"
          checked={data}
          onChange={e => onChange(path, e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-[#081638] focus:ring-[#d7a23a]"
        />
        <span className="text-xs text-slate-600">{data ? 'True' : 'False'}</span>
      </div>
    )
  }

  if (Array.isArray(data)) {
    return (
      <div className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
        {data.map((item, index) => (
          <div key={index} className="space-y-3 rounded-md bg-white p-3 border border-slate-100 relative shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
              <p className="text-[10px] font-bold uppercase text-slate-400">
                Item {index + 1}
              </p>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={() => {
                  const newArray = [...data]
                  newArray.splice(index, 1)
                  onChange(path, newArray)
                }}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
            <JsonFormNode data={item} path={[...path, index]} onChange={onChange} />
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-7 text-xs gap-1 w-full bg-white hover:bg-slate-50"
          onClick={() => {
            let newItem: any = ''
            if (data.length > 0) {
              newItem = JSON.parse(JSON.stringify(data[0]))
            }
            onChange(path, [...data, newItem])
          }}
        >
          <Plus className="h-3 w-3" /> Add Item
        </Button>
      </div>
    )
  }

  if (typeof data === 'object') {
    return (
      <div className="space-y-4">
        {Object.entries(data).map(([key, value]) => {
          if (key === 'id' || key === 'type' || isImageKey(key)) return null

          return (
            <div key={key} className="space-y-1.5">
              <Label className="text-xs font-bold capitalize text-slate-700">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </Label>
              <JsonFormNode data={value} path={[...path, key]} onChange={onChange} />
            </div>
          )
        })}
      </div>
    )
  }

  return null
}

export default function HomeJsonSectionEditor({
  section,
  onChange,
}: HomeJsonSectionEditorProps) {
  const [mode, setMode] = useState<'form' | 'json'>('form')
  const [jsonString, setJsonString] = useState(() => JSON.stringify(section, null, 2))
  const [error, setError] = useState('')

  useEffect(() => {
    if (mode === 'form') {
      setJsonString(JSON.stringify(section, null, 2))
    }
  }, [section, mode])

  const imageFields = useMemo(() => {
    try {
      return collectImageFields(section)
    } catch {
      return []
    }
  }, [section])

  const updateField = (path: FieldPath, nextValue: any) => {
    try {
      const nextSection = setValueAtPath(section, path, nextValue) as CmsSection
      onChange(nextSection)
      setJsonString(JSON.stringify(nextSection, null, 2))
      setError('')
    } catch {
      setError('Failed to update field.')
    }
  }

  return (
    <div className="space-y-6">
      {imageFields.length > 0 && (
        <div className="space-y-3">
          <div>
            <Label>Image Fields</Label>
            <p className="mt-1 text-[11px] leading-5 text-slate-400">
              Upload to Cloudinary or paste a direct image link.
            </p>
          </div>
          {imageFields.map(field => (
            <CmsImageField
              key={field.path.join('.')}
              id={`image-${field.path.join('-')}`}
              label={field.label}
              value={field.value}
              folder={`nextlevel/home/${section.type}`}
              onChange={imageUrl => updateField(field.path, imageUrl)}
            />
          ))}
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <Label>Section Content</Label>
          <div className="flex rounded-md border border-slate-200 bg-slate-50 p-0.5">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setMode('form')}
              className={`h-7 gap-1 px-2 text-[11px] ${
                mode === 'form' ? 'bg-[#061331] text-white shadow-xs hover:bg-[#061331] hover:text-white' : ''
              }`}
            >
              <LayoutTemplate className="h-3.5 w-3.5" />
              Form
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setMode('json')}
              className={`h-7 gap-1 px-2 text-[11px] ${
                mode === 'json' ? 'bg-[#061331] text-white shadow-xs hover:bg-[#061331] hover:text-white' : ''
              }`}
            >
              <FileJson className="h-3.5 w-3.5" />
              JSON
            </Button>
          </div>
        </div>

        {mode === 'form' ? (
          <div className="space-y-4 pt-2">
            <JsonFormNode data={section} path={[]} onChange={updateField} />
          </div>
        ) : (
          <div className="space-y-2 pt-2">
            <Textarea
              id={`json-${section.id}`}
              value={jsonString}
              onChange={event => {
                const nextValue = event.target.value
                setJsonString(nextValue)

                try {
                  const parsed = JSON.parse(nextValue) as CmsSection
                  if (parsed.id !== section.id || parsed.type !== section.type) {
                    setError('The section id and type must stay unchanged.')
                    return
                  }

                  setError('')
                  onChange(parsed)
                } catch {
                  setError('Enter valid JSON to update the preview.')
                }
              }}
              rows={24}
              className="font-mono text-[11px] leading-5"
              spellCheck={false}
            />
            {error && (
              <p className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs font-semibold text-amber-700">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                {error}
              </p>
            )}
            <p className="text-[11px] leading-5 text-slate-400">
              Save validates this content before writing the draft.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
