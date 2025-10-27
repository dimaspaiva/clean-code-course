export function validateEmail (email: string) {
  if (!email || typeof email !== 'string') {
    return false
  }
  return !!email.match((/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/))
}
