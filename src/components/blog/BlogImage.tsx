'use client'

import Image from 'next/image'
import { useState } from 'react'

interface BlogImageProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
}

export default function BlogImage({
  src,
  alt,
  fill,
  width,
  height,
  className,
  priority,
  sizes,
}: BlogImageProps) {
  const [imageError, setImageError] = useState(false)

  const imageSrc = !src || imageError ? '/placeholder.svg' : src

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={sizes}
      onError={() => setImageError(true)}
    />
  )
}
