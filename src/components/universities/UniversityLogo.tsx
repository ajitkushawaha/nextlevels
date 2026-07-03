'use client'

import { useState } from 'react'

type UniversityLogoProps = {
  name: string
  src?: string
  className?: string
}

function isImageSource(value?: string) {
  if (!value) return false

  const source = value.trim()

  return (
    source.startsWith('/') ||
    source.startsWith('http://') ||
    source.startsWith('https://') ||
    source.startsWith('data:image/') ||
    source.startsWith('blob:')
  )
}

export default function UniversityLogo({ name, src, className = '' }: UniversityLogoProps) {
  const [failedSource, setFailedSource] = useState('')
  const imageSource = isImageSource(src) ? src!.trim() : ''
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .map(word => word[0])
    .join('')
    .slice(0, 3)
    .toUpperCase()

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-white font-black uppercase text-[#081638] ${className}`}
      aria-label={`${name} logo`}
    >
      <span aria-hidden="true">{initials}</span>
      {imageSource && imageSource !== failedSource ? (
        // Native img allows a reliable client-side fallback for arbitrary CMS URLs.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageSource}
          alt=""
          className="absolute inset-0 h-full w-full bg-white object-cover"
          onError={() => setFailedSource(imageSource)}
        />
      ) : null}
    </div>
  )
}
