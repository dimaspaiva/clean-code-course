import axios from "axios"

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
})
