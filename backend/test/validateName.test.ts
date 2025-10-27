import { validateName } from "../src/validateName"

describe('ValidateName', () => {
  it.each([
    'Jhon Doe',
    'Clark Kent',
    'Ben Allen',
  ])('should return true when name has first and last name [%s]', (name: string) => {
    expect(validateName(name)).toBe(true)
  })

  it.each([
    '',
    'Jhon',
    1234,
    'Al3x',
    'Al3x Shadow',
    null,
    undefined
  ])('should return false when is a invalid name [%s]', (name: any) => {
    expect(validateName(name)).toBe(false)
  })
})
