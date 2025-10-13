import express, { Request, Response } from 'express'
import pgp from 'pg-promise'
import { validateCpf } from './validateCpf'

async function main () {
  const connection = pgp()('postgres://postgres:123456@localhost:5432/app')
  const app = express()
  app.use(express.json())
  app.post('/signup', async (req: Request, res: Response) => {
    if (req.body.name.split(' ').length !== 2) {
      return res.status(400).json({ message: 'Invalid user name' })
    }
    if (!req.body.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      return res.status(400).json({ message: 'Invalid user e-mail' })
    }
    if (!validateCpf(req.body.document)) {
      return res.status(400).json({ message: 'Invalid user document (CPF)' })
    }
    if (!req.body.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)) {
      return res.status(400).json({ message: 'Invalid user document (CPF)' })
    }

    const accountId = crypto.randomUUID();
    await connection.query(
      'insert into ccca.account (account_id, name, email, document, password) values ($1, $2, $3, $4, $5)',
      [accountId, req.body.name, req.body.email, req.body.document, req.body.password]
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
