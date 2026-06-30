'use client'

import { useState } from 'react'

type UniversityLogoProps = {
  name: string
  src?: string
  className?: string
}

export default function UniversityLogo({ name, src, className = '' }: UniversityLogoProps) {
  const [hasError, setHasError] = useState(false)
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
      {src && !hasError ? (
        // Native img allows a reliable client-side fallback for arbitrary CMS URLs.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          className="absolute inset-0 h-full w-full bg-white object-cover"
          onError={() => setHasError(true)}
        />
      ) : null}
    </div>
  )
}
