import { test, expect } from '@playwright/test';

test('Should create an account', async ({ page }) => {
  await page.goto('http://localhost:5173');
  const input = {
    name: "John Doe",
    email: "john.doe@email.com",
    document: "97456321558",
    password: "safePass123@"
  }
  await page.locator('.input-name').fill(input.name)
  await page.locator('.input-email').fill(input.email)
  await page.locator('.input-document').fill(input.document)
  await page.locator('.input-password').fill(input.password)
  await page.locator('.button-signup').click()

  await expect(page.locator('.span-message')).toHaveText('success')
});


test('Should fail to create an account', async ({ page }) => {
  await page.goto('http://localhost:5173');
  const input = {
    name: "John",
    email: "john.doe@email.com",
    document: "97456321558",
    password: "safePass123@"
  }
  await page.locator('.input-name').fill(input.name)
  await page.locator('.input-email').fill(input.email)
  await page.locator('.input-document').fill(input.document)
  await page.locator('.input-password').fill(input.password)
  await page.locator('.button-signup').click()

  await expect(page.locator('.span-message')).toHaveText('Invalid user name')
});
