// cypress/pages/loginPage.js

export class LoginPage {
    visit() {
      cy.visit('/');
    }
  
    fillUsername(username) {
      cy.get('#user-name').type(username);
    }
  
    fillPassword(password) {
      cy.get('#password').type(password);
    }
  
    clickLogin() {
      cy.get('#login-button').click();
    }
  
    assertLoggedIn() {
      cy.url().should('include', '/inventory.html');
    }
  
    assertLoginError() {
      cy.get('[data-test="error"]').should('be.visible');
    }
  }
  