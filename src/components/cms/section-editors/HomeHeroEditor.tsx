'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { HomeHeroSection } from '@/lib/cms/types'
import CmsImageField from './CmsImageField'

interface HomeHeroEditorProps {
  hero: HomeHeroSection
  setHeroField: <Key extends keyof HomeHeroSection>(
    key: Key,
    value: HomeHeroSection[Key]
  ) => void
  setHeroImageField: (key: 'src' | 'alt', value: string) => void
  setHeroFeatureField: (
    index: number,
    key: 'title' | 'text',
    value: string
  ) => void
}

export default function HomeHeroEditor({
  hero,
  setHeroField,
  setHeroImageField,
  setHeroFeatureField,
}: HomeHeroEditorProps) {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="title-line-1">Title Line 1</Label>
          <Input
            id="title-line-1"
            value={hero.titleLine1}
            onChange={event => setHeroField('titleLine1', event.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="title-line-2">Title Line 2</Label>
          <Input
            id="title-line-2"
            value={hero.titleLine2}
            onChange={event => setHeroField('titleLine2', event.target.value)}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="highlighted-title">Highlighted Title</Label>
        <Input
          id="highlighted-title"
          value={hero.highlightedTitle}
          onChange={event =>
            setHeroField('highlightedTitle', event.target.value)
          }
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="hero-description">Description</Label>
        <Textarea
          id="hero-description"
          rows={4}
          value={hero.description}
          onChange={event => setHeroField('description', event.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 ">
        <CmsImageField
          id="hero-image"
          label="Hero Image"
          value={hero.image.src}
          folder="nextlevel/home/hero"
          onChange={value => setHeroImageField('src', value)}
        />
        <div className="space-y-1.5">
          <Label htmlFor="hero-image-alt">Image Alt</Label>
          <Input
            id="hero-image-alt"
            value={hero.image.alt}
            onChange={event => setHeroImageField('alt', event.target.value)}
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label>Feature Cards</Label>
        {hero.features.map((feature, index) => (
          <div
            key={`${feature.icon}-${index}`}
            className="rounded-lg border border-slate-200 bg-slate-50 p-3"
          >
            <p className="mb-2 text-[11px] font-bold uppercase text-slate-400">
              {feature.icon}
            </p>
            <div className="space-y-2">
              <Input
                value={feature.title}
                onChange={event =>
                  setHeroFeatureField(index, 'title', event.target.value)
                }
              />
              <Textarea
                rows={2}
                value={feature.text}
                onChange={event =>
                  setHeroFeatureField(index, 'text', event.target.value)
                }
              />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
