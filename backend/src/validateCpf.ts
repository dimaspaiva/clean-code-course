const CPF_LENGTH = 11
const CPF_BODY_LENGTH = 9

export function validateCpf (cpf: string) {
  if (!cpf) return false
  const cleanCpf = cleanCpfString(cpf)
  if (cleanCpf.length !== CPF_LENGTH) return false
  if (isSameNumberSequence(cleanCpf)) return false

  const firstDigit = calculateDigit(cleanCpf, 10)
  const secondDigit = calculateDigit(cleanCpf, 11)
  const nDigVerific = cleanCpf.slice(CPF_BODY_LENGTH)

  return nDigVerific === `${firstDigit}${secondDigit}`;
}

function cleanCpfString (cpf: string) {
  return cpf.replace(/\D/g, '')
}

function isSameNumberSequence (cpf: string) {
  const [firstDigit] = cpf

  return [...cpf].every(digit => digit === firstDigit)
}

function calculateDigit (cpf: string, factor: number) {
  let sum = 0;
  for (const digit of cpf) {
    if (factor > 1) sum += parseInt(digit) * factor--;
  }
  const rest = sum % CPF_LENGTH;

  return (rest < 2) ? 0 : CPF_LENGTH - rest
}
