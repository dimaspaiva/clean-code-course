import pgp from 'pg-promise'

export interface AccountDAO {
  saveAccount (account: any): Promise<void>
  getAccountById (accountId: string): Promise<any>
}

export class AccountDAODatabase implements AccountDAO {
  async saveAccount(account: any): Promise<void> {
    const connection = pgp()('postgres://postgres:123456@localhost:5432/app')
    await connection.query(
      'insert into ccca.account (account_id, name, email, document, password) values ($1, $2, $3, $4, $5)',
      [account.accountId, account.name, account.email, account.document, account.password]
    )
    await connection.$pool.end();
  }

  async getAccountById(accountId: string): Promise<any> {
    const connection = pgp()('postgres://postgres:123456@localhost:5432/app')
    const [accountData] = await connection.query("select * from ccca.account where account_id = $1", [accountId])
    await connection.$pool.end();
    return accountData
  }
}

export class AccountDAOMemory implements AccountDAO {
  accounts: any[] = []

  async saveAccount(account: any): Promise<void> {
    this.accounts.push(account)
  }

  async getAccountById(accountId: string): Promise<any> {
    return this.accounts.find((account) => account.accountId === accountId)
  }
}
