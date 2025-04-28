// cypress/pages/checkoutPage.js

export class CheckoutPage {
    fillCheckoutInformation(firstName, lastName, postalCode) {
      cy.get('[data-test="firstName"]').type(firstName);
      cy.get('[data-test="lastName"]').type(lastName);
      cy.get('[data-test="postalCode"]').type(postalCode);
      cy.get('[data-test="continue"]').click();
    }
  
    finishCheckout() {
      cy.get('[data-test="finish"]').click();
    }
  
    assertCheckoutComplete() {
      cy.get('.complete-header').should('have.text', 'Thank you for your order!');
    }
  }
  