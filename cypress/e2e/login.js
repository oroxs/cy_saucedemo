// cypress/e2e/login.cy.js

import { LoginPage } from '../pages/loginPages.js';

describe('SauceDemo Login Tests', () => {
  const loginPage = new LoginPage();

  beforeEach(() => {
    loginPage.visit();
  });

  it('should login successfully with valid credentials', () => {
    loginPage.fillUsername('standard_user');
    loginPage.fillPassword('secret_sauce');
    loginPage.clickLogin();
    loginPage.assertLoggedIn();
  });

  it('should show error with invalid credentials', () => {
    loginPage.fillUsername('locked_out_user');
    loginPage.fillPassword('wrong_password');
    loginPage.clickLogin();
    loginPage.assertLoginError();
  });
});
