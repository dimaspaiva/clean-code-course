import { getAccountById, saveAccount } from "../src/data"

describe('Data', () => {
  it('should persist account data', async () => {
    const account = {
      accountId: crypto.randomUUID(),
      name: 'a',
      email: 'b',
      document: 'c',
      password: 'd',
    }


    await saveAccount(account)
    const savedAccount = await getAccountById(account.accountId)
    expect(savedAccount.name).toBe(account.name)
    expect(savedAccount.email).toBe(account.email)
    expect(savedAccount.document).toBe(account.document)
    expect(savedAccount.password).toBe(account.password)
  })
})
