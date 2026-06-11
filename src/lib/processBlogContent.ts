/**
 * Processes blog content HTML to ensure links are clickable and properly configured
 */
export function processBlogContent(htmlContent: string): string {
  const normalizedContent = normalizeBlogContent(htmlContent)

  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    // Server-side: use regex to process links
    // This regex handles both self-closing and regular anchor tags
    return normalizedContent.replace(
      /<a\s+([^>]*?href=["']([^"']+)["'][^>]*?)>(.*?)<\/a>/gi,
      (match, attributes, href, content) => {
        if (!href) {
          return match // Return original if no href
        }

        const isExternal =
          href.startsWith('http://') || href.startsWith('https://')

        // Build new attributes
        let newAttributes = attributes.trim()

        // Add target="_blank" for external links if not present
        if (isExternal && !/target\s*=/i.test(attributes)) {
          newAttributes += ' target="_blank"'
        }

        // Handle rel attribute for external links
        if (isExternal) {
          if (!/rel\s*=/i.test(attributes)) {
            newAttributes += ' rel="noopener noreferrer"'
          } else {
            // Append noopener noreferrer if not present
            newAttributes = newAttributes.replace(
              /(rel\s*=\s*["'])([^"']*)(["'])/i,
              (
                _relMatch: string,
                prefix: string,
                relValue: string,
                suffix: string
              ) => {
                let updatedRel = relValue
                if (!/noopener/i.test(relValue))
                  updatedRel += (updatedRel ? ' ' : '') + 'noopener'
                if (!/noreferrer/i.test(relValue))
                  updatedRel += (updatedRel ? ' ' : '') + 'noreferrer'
                return `${prefix}${updatedRel}${suffix}`
              }
            )
          }
        }

        // Ensure cursor pointer style
        if (!/style\s*=/i.test(attributes)) {
          newAttributes += ' style="cursor: pointer;"'
        } else if (!/cursor/i.test(attributes)) {
          newAttributes = attributes.replace(
            /(style\s*=\s*["'])([^"']*)(["'])/i,
            (
              _styleMatch: string,
              prefix: string,
              styleValue: string,
              suffix: string
            ) => {
              return `${prefix}${styleValue}; cursor: pointer;${suffix}`
            }
          )
        }

        return `<a ${newAttributes}>${content}</a>`
      }
    )
  }

  // Client-side: use DOMParser
  const parser = new DOMParser()
  const doc = parser.parseFromString(normalizedContent, 'text/html')
  const links = doc.querySelectorAll('a[href]')

  links.forEach(link => {
    const href = link.getAttribute('href')
    if (!href) return

    const isExternal = href.startsWith('http://') || href.startsWith('https://')

    // Add target="_blank" for external links
    if (isExternal && !link.hasAttribute('target')) {
      link.setAttribute('target', '_blank')
    }

    // Add rel="noopener noreferrer" for external links
    if (isExternal && !link.hasAttribute('rel')) {
      link.setAttribute('rel', 'noopener noreferrer')
    }

    // Ensure cursor pointer
    const currentStyle = link.getAttribute('style') || ''
    if (!currentStyle.includes('cursor')) {
      link.setAttribute('style', `${currentStyle}; cursor: pointer;`.trim())
    }
  })

  return doc.body.innerHTML
}

function normalizeBlogContent(content: string): string {
  if (!content) return ''

  const trimmed = content.trim()
  const hasBlockHtml = /<\/?(p|div|section|article|h[1-6]|ul|ol|li|blockquote|table|figure|img)\b/i.test(trimmed)

  if (hasBlockHtml) return trimmed

  return trimmed
    .replace(/<br\s*\/?>/gi, '\n')
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      const escaped = escapeHtml(line)
      const isHeading =
        index === 0 ||
        line.endsWith(':') ||
        /^week\s+\d+\s*:/i.test(line) ||
        /^(final thoughts|common mistakes to avoid|sample daily study schedule|before the exam)$/i.test(line)

      return isHeading ? `<h2>${escaped}</h2>` : `<p>${escaped}</p>`
    })
    .join('\n')
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
