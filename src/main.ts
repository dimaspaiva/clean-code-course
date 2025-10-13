import express, { Request, Response } from 'express'
import pgp from 'pg-promise'
import { validateCpf } from './validateCpf'
import { validateName } from './validateName'
import { validatePassword } from './validatePassword'
import { validateEmail } from './validateEmail'

async function main () {
  const connection = pgp()('postgres://postgres:123456@localhost:5432/app')
  const app = express()
  app.use(express.json())
  app.post('/signup', async (req: Request, res: Response) => {
    const { document, email, name, password } = req.body
    if (!validateName(name)) {
      return res.status(400).json({ message: 'Invalid user name' })
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid user e-mail' })
    }
    if (!validateCpf(document)) {
      return res.status(400).json({ message: 'Invalid user document (CPF)' })
    }
    if (!validatePassword(password)) {
      return res.status(400).json({ message: 'Invalid user password' })
    }

    const accountId = crypto.randomUUID();
    await connection.query(
      'insert into ccca.account (account_id, name, email, document, password) values ($1, $2, $3, $4, $5)',
      [accountId, name, email, document, password]
    )
    res.json({
      accountId
    })
  })
  app.get('/accounts/:accountId', async (req: Request, res: Response) => {
    const [accountData] = await connection.query("select * from ccca.account where account_id = $1", [req.params.accountId])
    res.json(accountData)
  })
  app.listen(3000)
}

main()
