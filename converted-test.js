// page.js
class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.locator('//input[@id="username"]');
    this.password = page.locator('//input[@id="password"]');
    this.loginButton = page.locator('//input[@id="Login"]');
  }

  async doLogin(user, pass) {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginButton.click();
  }
}

module.exports = LoginPage;
```

```javascript
// test.js
const { test, expect } = require('@playwright/test');
const LoginPage = require('./page');

test.describe('Login Page Tests', () => {
  let page;
  let loginPage;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    await page.goto('https://login.salesforce.com/?locale=in');
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('Valid Login Test', async () => {
    await loginPage.doLogin('validusername', 'validpassword');
    await expect(page.locator('//h1')).toContainText('Home');
  });

  test('Invalid Login Test', async () => {
    await loginPage.doLogin('invalidusername', 'invalidpassword');
    await expect(page.locator('//div[@id="error"]')).toContainText('Invalid username or password');
  });
});