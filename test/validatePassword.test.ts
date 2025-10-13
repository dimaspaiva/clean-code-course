import { validatePassword } from "../src/validatePassword"

describe('ValidatePassword', () => {
  it.each([
    'Random12',
    'R4nD0mPass',
    'R4n12345'
  ])('should return true when is a valid password [%s]', (password: string) => {
    expect(validatePassword(password)).toBe(true)
  })

  it.each([
    null,
    undefined,
    '12345678',
    'randompass',
    'Randompass',
    'randomp4ss',
    'RANDOMPASS',
    'RANDOMP4SS',
    'R4ndom',
    'Randompa'
  ])('should return false when is a invalid password', (password: any) => {
    expect(validatePassword(password)).toBe(false)
  })
})
