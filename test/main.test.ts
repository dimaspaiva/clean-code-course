import axios from "axios"

axios.defaults.validateStatus = () => true

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

    const response = await axios.post("http://localhost:3000/signup", input)
    expect(response.status).toBe(400)
    expect(response.data.message).toEqual('Invalid user name')
  })

  it('should return 400 when trying to create an account and email is invalid', async () => {
    const input = {
      name: "John Doe",
      email: "john.doe@email",
      document: "97456321558",
      password: "safePass123@"
    }

    const response = await axios.post("http://localhost:3000/signup", input)
    expect(response.status).toBe(400)
    expect(response.data.message).toEqual('Invalid user e-mail')
  })

  it('should return 400 when trying to create an account and document is invalid', async () => {
    const input = {
      name: "John Doe",
      email: "john.doe@email.com",
      document: "12345678901",
      password: "safePass123@"
    }

    const response = await axios.post("http://localhost:3000/signup", input)
    expect(response.status).toBe(400)
    expect(response.data.message).toEqual('Invalid user document (CPF)')
  })


  it('should return 400 when trying to create an account and password is invalid', async () => {
    const input = {
      name: "John Doe",
      email: "john.doe@email.com",
      document: "97456321558",
      password: "wrongPass"
    }

    const response = await axios.post("http://localhost:3000/signup", input)
    expect(response.status).toBe(400)
    expect(response.data.message).toEqual('Invalid user password')
  })

  it('should return 404 when user does not exist', async () => {
    const accountId = crypto.randomUUID()

    const response = await axios.get(`http://localhost:3000/accounts/${accountId}`)
    expect(response.status).toBe(404)
  })
})
