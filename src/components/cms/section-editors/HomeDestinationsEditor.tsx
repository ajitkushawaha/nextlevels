'use client'

import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { HomeDestinationsSection } from '@/lib/cms/types'
import CmsImageField from './CmsImageField'

interface HomeDestinationsEditorProps {
  destinations: HomeDestinationsSection
  setDestinationsField: <Key extends keyof HomeDestinationsSection>(
    key: Key,
    value: HomeDestinationsSection[Key]
  ) => void
  setDestinationCardField: (
    index: number,
    key: 'name' | 'image' | 'alt',
    value: string
  ) => void
  addDestination: () => void
  removeDestination: (index: number) => void
}

export default function HomeDestinationsEditor({
  destinations,
  setDestinationsField,
  setDestinationCardField,
  addDestination,
  removeDestination,
}: HomeDestinationsEditorProps) {
  return (
    <>
      <div className="space-y-1.5">
        <Label htmlFor="destinations-title">Title</Label>
        <Input
          id="destinations-title"
          value={destinations.title}
          onChange={event =>
            setDestinationsField('title', event.target.value)
          }
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="destinations-description">Description</Label>
        <Textarea
          id="destinations-description"
          rows={4}
          value={destinations.description}
          onChange={event =>
            setDestinationsField('description', event.target.value)
          }
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <Label>Destination Cards</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addDestination}
            disabled={destinations.destinations.length >= 4}
          >
            <Plus className="h-3.5 w-3.5" />
            Add
          </Button>
        </div>

        {destinations.destinations.map((destination, index) => (
          <div
            key={`destination-card-${index}`}
            className="space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-3"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] font-bold uppercase text-slate-400">
                Card {index + 1}
              </p>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeDestination(index)}
                disabled={destinations.destinations.length <= 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor={`destination-name-${index}`}>Name</Label>
              <Input
                id={`destination-name-${index}`}
                value={destination.name}
                required
                aria-invalid={!destination.name.trim()}
                aria-describedby={!destination.name.trim() ? `destination-name-error-${index}` : undefined}
                className={!destination.name.trim() ? 'border-red-500 focus-visible:ring-red-500' : undefined}
                onChange={event =>
                  setDestinationCardField(index, 'name', event.target.value)
                }
              />
              {!destination.name.trim() ? (
                <p id={`destination-name-error-${index}`} className="text-[11px] font-semibold text-red-600">
                  Destination name is required. Enter at least one word.
                </p>
              ) : null}
            </div>

            <CmsImageField
              id={`destination-image-${index}`}
              label="Image"
              value={destination.image}
              required
              folder="nextlevel/home/destinations"
              onChange={value =>
                setDestinationCardField(index, 'image', value)
              }
            />

            <div className="space-y-1.5">
              <Label htmlFor={`destination-alt-${index}`}>Image Alt</Label>
              <Input
                id={`destination-alt-${index}`}
                value={destination.alt || ''}
                onChange={event =>
                  setDestinationCardField(index, 'alt', event.target.value)
                }
              />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
