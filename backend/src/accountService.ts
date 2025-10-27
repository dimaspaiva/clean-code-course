import { validateCpf } from './validateCpf'
import { validateName } from './validateName'
import { validatePassword } from './validatePassword'
import { validateEmail } from './validateEmail'
import { getAccountById, saveAccount } from './data'

export async function signup (input: any) {
  const { document, email, name, password } = input
  if (!validateName(name)) {
    throw new Error('Invalid user name')
  }
  if (!validateEmail(email)) {
    throw new Error('Invalid user e-mail')
  }
  if (!validateCpf(document)) {
    throw new Error('Invalid user document (CPF)')
  }
  if (!validatePassword(password)) {
    throw new Error('Invalid user password')
  }

  const account = {
    accountId: crypto.randomUUID(),
    name,
    email,
    document,
    password,
  }
  await saveAccount(account)
  return { accountId: account.accountId }
}

export async function getAccount(accountId?: string) {
  const accountData = await getAccountById(accountId)
  if (!accountData) {
    throw new Error('Account not found')
  }
  return accountData
}

