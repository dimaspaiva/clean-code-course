import axios from "axios"
import { AxiosError } from "axios"

describe('Signup', () => {
  it('should create an account', async () => {
    const input = {
      name: "John Doe",
      email: "john.doe@email.com",
      document: "97456321558",
      password: "safePass123@"
    }

    const responseSignup = await axios.post("http://localhost:3000/signup", input)
    const outputSignup = responseSignup.data

    expect(outputSignup.accountId).toBeDefined();

    const responseGetAccount = await axios.get(`http://localhost:3000/accounts/${outputSignup.accountId}`)
    const outputGetAccount = responseGetAccount.data

    expect(outputGetAccount.name).toBe(input.name)
    expect(outputGetAccount.email).toBe(input.email)
    expect(outputGetAccount.password).toBe(input.password)
    expect(outputGetAccount.document).toBe(input.document)
  })

  it('should return 400 when trying to create an account and name is incorrect', async () => {
    const input = {
      name: "John",
      email: "john.doe@email.com",
      document: "97456321558",
      password: "safePass123@"
    }

    await expect(axios.post("http://localhost:3000/signup", input)).rejects.toThrow('Request failed with status code 400')
  })

  it('should return 400 when trying to create an account and email is invalid', async () => {
    const input = {
      name: "John Doe",
      email: "john.doe@email",
      document: "97456321558",
      password: "safePass123@"
    }

    await expect(axios.post("http://localhost:3000/signup", input)).rejects.toThrow('Request failed with status code 400')
  })

  it('should return 400 when trying to create an account and document is invalid', async () => {
    const input = {
      name: "John Doe",
      email: "john.doe@email.com",
      document: "12345678901",
      password: "safePass123@"
    }

    await expect(axios.post("http://localhost:3000/signup", input)).rejects.toThrow('Request failed with status code 400')
  })


  it('should return 400 when trying to create an account and password is invalid', async () => {
    const input = {
      name: "John Doe",
      email: "john.doe@email.com",
      document: "12345678901",
      password: "safePass123@"
    }

    await expect(axios.post("http://localhost:3000/signup", input)).rejects.toThrow('Request failed with status code 400')
  })
})
