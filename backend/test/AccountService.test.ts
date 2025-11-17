import axios from "axios"
import AccountService from "../src/accountService"
import { AccountDAOMemory } from "../src/accountDAO"

axios.defaults.validateStatus = () => true

describe('Signup', () => {
  let accountService: AccountService
  let spyGetAccountById: any
  let spySaveAccountById: any

  beforeEach(() => {
    const accountDAO = new AccountDAOMemory()
    accountService = new AccountService(accountDAO)
    spySaveAccountById = jest.spyOn(accountDAO, 'saveAccount')
    spyGetAccountById = jest.spyOn(accountDAO, 'getAccountById')
    jest.clearAllMocks()
  })

  it('should create an account', async () => {
    const input = {
      name: "John Doe",
      email: "john.doe@email.com",
      document: "97456321558",
      password: "safePass123@"
    }

    const outputSignup = await accountService.signup(input)
    expect(outputSignup.accountId).toBeDefined();
    expect(spySaveAccountById).toHaveBeenCalledWith({...input, accountId: outputSignup.accountId})

    const outputGetAccount = await accountService.getAccount(outputSignup.accountId)

    expect(spyGetAccountById).toHaveBeenCalledWith(outputSignup.accountId)
    expect(outputGetAccount.name).toBe(input.name)
    expect(outputGetAccount.email).toBe(input.email)
    expect(outputGetAccount.password).toBe(input.password)
    expect(outputGetAccount.document).toBe(input.document)
  })

  it('should throw when trying to create an account and name is incorrect', async () => {
    const input = {
      name: "John",
      email: "john.doe@email.com",
      document: "97456321558",
      password: "safePass123@"
    }

    await expect(accountService.signup(input)).rejects.toThrow('Invalid user name')
    expect(spySaveAccountById).not.toHaveBeenCalled()
  })

  it('should throw when trying to create an account and email is invalid', async () => {
    const input = {
      name: "John Doe",
      email: "john.doe@email",
      document: "97456321558",
      password: "safePass123@"
    }

    await expect(accountService.signup(input)).rejects.toThrow('Invalid user e-mail')
    expect(spySaveAccountById).not.toHaveBeenCalled()
  })

  it('should throw when trying to create an account and document is invalid', async () => {
    const input = {
      name: "John Doe",
      email: "john.doe@email.com",
      document: "12345678901",
      password: "safePass123@"
    }

    await expect(accountService.signup(input)).rejects.toThrow('Invalid user document (CPF)')
    expect(spySaveAccountById).not.toHaveBeenCalled()
  })


  it('should throw when trying to create an account and password is invalid', async () => {
    const input = {
      name: "John Doe",
      email: "john.doe@email.com",
      document: "97456321558",
      password: "wrongPass"
    }

    await expect(accountService.signup(input)).rejects.toThrow('Invalid user password')
    expect(spySaveAccountById).not.toHaveBeenCalled()
  })

  it('should throw when user does not exist', async () => {
    const accountId = crypto.randomUUID()

    await expect(accountService.getAccount(accountId)).rejects.toThrow('Account not found')
    expect(spyGetAccountById).toHaveBeenCalledWith(accountId)
  })
})
