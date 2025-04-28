// cypress/pages/loginPage.js
import { LoginPageLocators } from '../locators/loginPageLocators.js';


export class LoginPage {
    visit() {
      cy.visit('/');
    }
  
    fillUsername(username) {
      cy.get(LoginPageLocators.usernameInput).type(username);
    }
  
    fillPassword(password) {
      cy.get(LoginPageLocators.passwordInput).type(password);
    }
  
    clickLogin() {
      cy.get(LoginPageLocators.loginButton).click();
    }
  
    assertLoggedIn() {
      cy.url().should('include', '/inventory.html');
    }
  
    assertLoginError() {
      cy.get('[data-test="error"]').should('be.visible');
    }
  }
  