import { validateEmail } from "../src/validateEmail"

describe('ValidadeEmail', () => {
  it.each([
    'john.doe@email.com',
    'j0hn@email.com',
    'j0hn.doe@gmail.uk'
  ])('should return true when email is valid [%s]', (email: string) => {
    expect(validateEmail(email)).toBe(true)
  })

  it.each([
    null,
    undefined,
    'john doe',
    'jhon doe@email.com',
    125241,
    'jhon@email',
    'jhon.com',
    '@email.com',
  ])('should return true when email is valid [%s]', (email: any) => {
    expect(validateEmail(email)).toBe(false)
  })
})
