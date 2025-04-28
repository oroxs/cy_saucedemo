// cypress/e2e/login.cy.js
import { LoginPage } from '../pages/loginPage.js';

describe('SauceDemo Login Tests', () => {
  const loginPage = new LoginPage();
  let users;

  before(() => {
    cy.fixture('users').then((data) => {
      users = data;
    });
  });

  beforeEach(() => {
    loginPage.visit();
  });

  it('should login successfully with valid credentials', () => {
    loginPage.fillUsername(users.standardUser.username);
    loginPage.fillPassword(users.standardUser.password);
    loginPage.clickLogin();
    loginPage.assertLoggedIn();
  });

  it('should show error with invalid credentials', () => {
    loginPage.fillUsername(users.lockedOutUser.username);
    loginPage.fillPassword(users.lockedOutUser.password);
    loginPage.clickLogin();
    loginPage.assertLoginError();
  });
});
