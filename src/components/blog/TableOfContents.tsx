"use client"

import { useEffect, useState } from 'react'

interface TOCItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // Extract headings from HTML content
    const parser = new DOMParser()
    const doc = parser.parseFromString(content, 'text/html')
    const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6')
    const usedIds = new Map<string, number>()

    const getUniqueId = (baseId: string) => {
      const count = usedIds.get(baseId) || 0
      usedIds.set(baseId, count + 1)
      return count === 0 ? baseId : `${baseId}-${count + 1}`
    }
    
    const items: TOCItem[] = Array.from(headings).map((heading, index) => {
      const text = heading.textContent || ''
      const level = parseInt(heading.tagName.charAt(1))
      const baseId = heading.id || `heading-${index}`
      const id = getUniqueId(baseId)
      
      return { id, text, level }
    })
    
    setTocItems(items)
  }, [content])

  useEffect(() => {
    const handleScroll = () => {
      if (tocItems.length === 0) return

      const headings = tocItems.map(item => {
        const element = document.getElementById(item.id)
        return {
          id: item.id,
          element,
          top: element ? element.getBoundingClientRect().top : Infinity,
        }
      }).filter(item => item.element)

      const offset = 140
      const passedHeadings = headings.filter(heading => heading.top <= offset)

      if (passedHeadings.length > 0) {
        setActiveId(passedHeadings[passedHeadings.length - 1].id)
        return
      }

      setActiveId(headings[0]?.id || '')
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    
    window.requestAnimationFrame(handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [tocItems])

  if (tocItems.length === 0) {
    return null
  }

  return (
    <nav className="space-y-1">
          {tocItems.map((item) => (
            <a
              key={`${item.id}-${item.text}`}
          href={`#${item.id}`}
          className={`block rounded-md border-l-2 px-3 py-2 text-xs font-semibold leading-snug transition-colors ${
            activeId === item.id
              ? 'border-[#d7a23a] bg-[#fffcf0] text-[#081638]'
              : 'border-transparent text-slate-500 hover:border-[#d7a23a]/40 hover:bg-slate-50 hover:text-[#081638]'
          } ${
            item.level === 1
              ? ''
              : item.level === 2
                ? 'ml-1'
                : 'ml-3'
          }`}
        >
          {item.text.length > 54 ? `${item.text.substring(0, 54)}...` : item.text}
        </a>
      ))}
    </nav>
  )
}
