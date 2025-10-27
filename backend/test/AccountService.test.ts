import axios from "axios"
import { getAccount, signup } from "../src/accountService"

axios.defaults.validateStatus = () => true

describe('Signup', () => {
  it('should create an account', async () => {
    const input = {
      name: "John Doe",
      email: "john.doe@email.com",
      document: "97456321558",
      password: "safePass123@"
    }

    const outputSignup = await signup(input)
    expect(outputSignup.accountId).toBeDefined();

    const outputGetAccount = await getAccount(outputSignup.accountId)

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

    await expect(signup(input)).rejects.toThrow('Invalid user name')
  })

  it('should throw when trying to create an account and email is invalid', async () => {
    const input = {
      name: "John Doe",
      email: "john.doe@email",
      document: "97456321558",
      password: "safePass123@"
    }

    await expect(signup(input)).rejects.toThrow('Invalid user e-mail')
  })

  it('should throw when trying to create an account and document is invalid', async () => {
    const input = {
      name: "John Doe",
      email: "john.doe@email.com",
      document: "12345678901",
      password: "safePass123@"
    }

    await expect(signup(input)).rejects.toThrow('Invalid user document (CPF)')
  })


  it('should throw when trying to create an account and password is invalid', async () => {
    const input = {
      name: "John Doe",
      email: "john.doe@email.com",
      document: "97456321558",
      password: "wrongPass"
    }

    await expect(signup(input)).rejects.toThrow('Invalid user password')
  })

  it('should throw when user does not exist', async () => {
    const accountId = crypto.randomUUID()

    await expect(getAccount(accountId)).rejects.toThrow('Account not found')
  })
})
