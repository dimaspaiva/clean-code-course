const NAME_SIZE = 2

export function validateName (name: string) {
  if (!name || typeof name !== 'string' || name.match(/\d/)) {
    return false
  }
  return name.split(' ').length === NAME_SIZE
}
