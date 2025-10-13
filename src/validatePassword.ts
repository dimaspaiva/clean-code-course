const VALID_PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

export function validatePassword(password: string) {
  if (!password) {
    return false
  }
  return !!password.match(VALID_PASSWORD_REGEX)
}
