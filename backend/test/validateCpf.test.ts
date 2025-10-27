import { validateCpf } from "../src/validateCpf"

describe('ValidateCpf', () => {
  it.each([
    "97456321558",
    "71428793860",
    "87748248800"
  ])('Should return true when is a valid CPF [%s]', (cpf: string) => {
    expect(validateCpf(cpf)).toBe(true)
  })

  it.each([
    null,
    undefined,
    '12345678901',
    '1234567890',
    '123456789012',
    '11111111111'
  ])('Should return false when is an invalid CPF [%s]', (cpf: any) => {
    expect(validateCpf(cpf)).toBe(false)
  })
})
