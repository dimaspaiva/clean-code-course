import express, { Request, Response } from 'express'
import cors from 'cors'
import { getAccount, signup } from './accountService'

async function main () {
  const app = express()
  app.use(express.json())
  app.use(cors())

  app.post('/signup', async (req: Request, res: Response) => {
    try {
      const input = req.body
      const output = await signup(input)
      res.json(output)
    } catch (error: any) {
      res.status(422).json({
        message: error.message
      })
    }
  })

  app.get('/accounts/:accountId', async (req: Request, res: Response) => {
    try {
      const accountId = req.params.accountId
      const output = await getAccount(accountId)
      res.json(output)
    } catch (error: any) {
      console.error(error)
      res.status(404).json({ message: 'User not found'})
    }
  })

  app.listen(3000)
}

main()
