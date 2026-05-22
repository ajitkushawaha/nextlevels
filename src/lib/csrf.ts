export const CSRF_COOKIE_NAME = 'csrfToken'
export const CSRF_HEADER = 'x-csrf-token'

export function generateCsrfToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

export function validateCsrfTokens(
  headerToken?: string,
  cookieToken?: string
): boolean {
  if (!headerToken || !cookieToken) return false
  if (headerToken.length !== cookieToken.length) return false

  let result = 0
  for (let i = 0; i < headerToken.length; i++) {
    result |= headerToken.charCodeAt(i) ^ cookieToken.charCodeAt(i)
  }
  return result === 0
}
