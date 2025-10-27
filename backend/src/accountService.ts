import pgp from 'pg-promise'
import { validateCpf } from './validateCpf'
import { validateName } from './validateName'
import { validatePassword } from './validatePassword'
import { validateEmail } from './validateEmail'

  const connection = pgp()('postgres://postgres:123456@localhost:5432/app')

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

  const accountId = crypto.randomUUID();
  await connection.query(
    'insert into ccca.account (account_id, name, email, document, password) values ($1, $2, $3, $4, $5)',
    [accountId, name, email, document, password]
  )
  return { accountId }
}

export async function getAccount(accountId?: string) {
    const [accountData] = await connection.query("select * from ccca.account where account_id = $1", [accountId])
    if (!accountData) {
      throw new Error('Account not found')
    }
    return accountData
}

