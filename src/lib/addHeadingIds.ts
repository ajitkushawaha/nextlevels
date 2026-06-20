/**
 * Adds unique IDs to headings in HTML content for Table of Contents functionality
 */
export function addHeadingIds(htmlContent: string): string {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    const usedIds = new Map<string, number>()

    const getUniqueId = (baseId: string) => {
      const count = usedIds.get(baseId) || 0
      usedIds.set(baseId, count + 1)
      return count === 0 ? baseId : `${baseId}-${count + 1}`
    }

    // Server-side: use regex to add IDs to headings
    return htmlContent.replace(
      /<(h[1-6])([^>]*?)>(.*?)<\/h[1-6]>/gi,
      (match, tag, attributes, content) => {
        // Check if ID already exists
        const existingId = attributes.match(/\sid=(["'])(.*?)\1/i)?.[2]
        if (existingId) {
          const uniqueId = getUniqueId(existingId)
          if (uniqueId === existingId) return match

          return `<${tag}${attributes.replace(/\sid=(["'])(.*?)\1/i, ` id="${uniqueId}"`)}>${content}</${tag}>`
        }
        
        // Create a slug from the heading content
        const text = content.replace(/<[^>]*>/g, '') // Remove HTML tags
        const slug = text
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
          .replace(/\s+/g, '-') // Replace spaces with hyphens
          .replace(/-+/g, '-') // Replace multiple hyphens with single
          .trim()
        
        // Use slug if available, otherwise use a random ID
        const baseId = slug ? `heading-${slug}` : 'heading-section'
        const id = getUniqueId(baseId)
        
        return `<${tag}${attributes} id="${id}">${content}</${tag}>`
      }
    )
  }

  // Client-side: use DOMParser
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlContent, 'text/html')
  const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6')
  const usedIds = new Map<string, number>()

  const getUniqueId = (baseId: string) => {
    const count = usedIds.get(baseId) || 0
    usedIds.set(baseId, count + 1)
    return count === 0 ? baseId : `${baseId}-${count + 1}`
  }

  headings.forEach((heading, index) => {
    // Create a slug from the heading text
    const text = heading.textContent || ''
    const slug = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim()

    const baseId = heading.id || (slug ? `heading-${slug}` : `heading-${index}`)
    heading.id = getUniqueId(baseId)
  })

  return doc.documentElement.outerHTML
}
