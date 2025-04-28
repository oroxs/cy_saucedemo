// cypress/pages/cartPage.js

export class CartPage {
    proceedToCheckout() {
      cy.get('[data-test="checkout"]').click();
    }
  }
  