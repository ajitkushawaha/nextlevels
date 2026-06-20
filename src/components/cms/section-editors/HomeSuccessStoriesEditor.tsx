'use client'

import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { HomeSuccessStoriesSection } from '@/lib/cms/types'
import CmsImageField from './CmsImageField'

interface HomeSuccessStoriesEditorProps {
  section: HomeSuccessStoriesSection
  onChange: (section: HomeSuccessStoriesSection) => void
}

type SuccessStory = HomeSuccessStoriesSection['videos'][number]

const emptyStory: SuccessStory = {
  mediaType: 'image',
  youtubeUrl: '',
  studentName: 'Student Name',
  studentAvatar: '/home2/happy-gi.png',
  thumbnail: '/home2/happy-team.png',
  isLocked: false,
}

export default function HomeSuccessStoriesEditor({
  section,
  onChange,
}: HomeSuccessStoriesEditorProps) {
  const updateStory = (
    index: number,
    updater: (story: SuccessStory) => SuccessStory
  ) => {
    onChange({
      ...section,
      videos: section.videos.map((story, storyIndex) =>
        storyIndex === index ? updater(story) : story
      ),
    })
  }

  const addStory = () => {
    onChange({
      ...section,
      videos: [...section.videos, emptyStory],
    })
  }

  const removeStory = (index: number) => {
    onChange({
      ...section,
      videos: section.videos.filter((_story, storyIndex) => storyIndex !== index),
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <Label htmlFor="success-stories-title">Title</Label>
        <Input
          id="success-stories-title"
          value={section.title}
          onChange={event => onChange({ ...section, title: event.target.value })}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="success-stories-description">Description</Label>
        <Textarea
          id="success-stories-description"
          value={section.description}
          rows={3}
          onChange={event =>
            onChange({ ...section, description: event.target.value })
          }
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <Label>Story Items</Label>
          <Button
            type="button"
            size="sm"
            onClick={addStory}
            className="h-8 gap-1.5 bg-[#061331] px-3 text-[10px] font-black uppercase text-white hover:bg-[#061331]/95"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Story
          </Button>
        </div>

        {section.videos.map((story, index) => (
          <div
            key={`${story.studentName}-${index}`}
            className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                Story {index + 1}
              </p>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeStory(index)}
                disabled={section.videos.length <= 1}
                className="h-8 w-8 text-red-600 hover:text-red-700"
                aria-label={`Remove story ${index + 1}`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Media Type</Label>
              <div className="grid grid-cols-2 gap-2">
                {(['image', 'youtube'] as const).map(mediaType => (
                  <Button
                    key={mediaType}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updateStory(index, story => ({ ...story, mediaType }))
                    }
                    className={`h-9 capitalize ${
                      (story.mediaType || 'image') === mediaType
                        ? 'border-[#061331] bg-[#061331] text-white hover:bg-[#061331]'
                        : ''
                    }`}
                  >
                    {mediaType === 'youtube' ? 'YouTube Link' : 'Photo'}
                  </Button>
                ))}
              </div>
            </div>

            {(story.mediaType || 'image') === 'youtube' ? (
              <div className="space-y-1.5">
                <Label htmlFor={`success-story-youtube-${index}`}>
                  YouTube Video Link
                </Label>
                <Input
                  id={`success-story-youtube-${index}`}
                  value={story.youtubeUrl || ''}
                  placeholder="https://youtu.be/Smdd1XOO2gA"
                  onChange={event =>
                    updateStory(index, story => ({
                      ...story,
                      youtubeUrl: event.target.value,
                    }))
                  }
                />
              </div>
            ) : (
              <CmsImageField
                id={`success-story-thumbnail-${index}`}
                label="Story Photo"
                value={story.thumbnail || ''}
                folder="nextlevel/success-stories"
                placeholder="Upload photo or paste image URL"
                onChange={value =>
                  updateStory(index, story => ({ ...story, thumbnail: value }))
                }
              />
            )}

            {(story.mediaType || 'image') === 'youtube' && (
              <CmsImageField
                id={`success-story-youtube-poster-${index}`}
                label="Video Poster / Fallback Image"
                value={story.thumbnail || ''}
                folder="nextlevel/success-stories"
                placeholder="Optional poster image URL"
                onChange={value =>
                  updateStory(index, story => ({ ...story, thumbnail: value }))
                }
              />
            )}

            <div className="space-y-1.5">
              <Label htmlFor={`success-story-student-name-${index}`}>
                Student Name
              </Label>
              <Input
                id={`success-story-student-name-${index}`}
                value={story.studentName}
                onChange={event =>
                  updateStory(index, story => ({
                    ...story,
                    studentName: event.target.value,
                  }))
                }
              />
            </div>

            <CmsImageField
              id={`success-story-avatar-${index}`}
              label="Student Profile Image"
              value={story.studentAvatar}
              folder="nextlevel/success-stories/profiles"
              placeholder="Upload profile image or paste image URL"
              onChange={value =>
                updateStory(index, story => ({ ...story, studentAvatar: value }))
              }
            />
          </div>
        ))}
      </div>
    </div>
  )
}
