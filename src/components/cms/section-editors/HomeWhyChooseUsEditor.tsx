'use client'

import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import type {
  HomeWhyChooseUsIcon,
  HomeWhyChooseUsSection,
} from '@/lib/cms/types'

const iconOptions: Array<{ value: HomeWhyChooseUsIcon; label: string }> = [
  { value: 'UsersRound', label: 'Expert Advisors' },
  { value: 'BookOpenCheck', label: 'Clear Process' },
  { value: 'Globe2', label: 'Global Opportunities' },
  { value: 'Headphones', label: 'Support' },
]

interface HomeWhyChooseUsEditorProps {
  whyChooseUs: HomeWhyChooseUsSection
  setWhyChooseUsField: <Key extends keyof HomeWhyChooseUsSection>(
    key: Key,
    value: HomeWhyChooseUsSection[Key]
  ) => void
  setWhyChooseUsItemField: (
    index: number,
    key: 'icon' | 'title' | 'text',
    value: string
  ) => void
  addWhyChooseUsItem: () => void
  removeWhyChooseUsItem: (index: number) => void
}

export default function HomeWhyChooseUsEditor({
  whyChooseUs,
  setWhyChooseUsField,
  setWhyChooseUsItemField,
  addWhyChooseUsItem,
  removeWhyChooseUsItem,
}: HomeWhyChooseUsEditorProps) {
  return (
    <>
      <div className="space-y-1.5">
        <Label htmlFor="why-choose-us-eyebrow">Eyebrow</Label>
        <Input
          id="why-choose-us-eyebrow"
          value={whyChooseUs.eyebrow}
          onChange={event =>
            setWhyChooseUsField('eyebrow', event.target.value)
          }
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="why-choose-us-title">Title</Label>
        <Input
          id="why-choose-us-title"
          value={whyChooseUs.title}
          onChange={event => setWhyChooseUsField('title', event.target.value)}
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <Label>Reason Cards</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addWhyChooseUsItem}
            disabled={whyChooseUs.items.length >= 8}
          >
            <Plus className="h-3.5 w-3.5" />
            Add
          </Button>
        </div>

        {whyChooseUs.items.map((item, index) => (
          <div
            key={`${item.icon}-${index}`}
            className="space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-3"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] font-bold uppercase text-slate-400">
                Reason {index + 1}
              </p>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeWhyChooseUsItem(index)}
                disabled={whyChooseUs.items.length <= 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-1.5">
              <Label>Icon</Label>
              <Select
                value={item.icon}
                onValueChange={value =>
                  setWhyChooseUsItemField(index, 'icon', value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select icon" />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor={`why-choose-us-item-title-${index}`}>Title</Label>
              <Input
                id={`why-choose-us-item-title-${index}`}
                value={item.title}
                onChange={event =>
                  setWhyChooseUsItemField(index, 'title', event.target.value)
                }
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor={`why-choose-us-item-text-${index}`}>Text</Label>
              <Textarea
                id={`why-choose-us-item-text-${index}`}
                rows={3}
                value={item.text}
                onChange={event =>
                  setWhyChooseUsItemField(index, 'text', event.target.value)
                }
              />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
