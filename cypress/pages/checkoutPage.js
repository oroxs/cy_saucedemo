// cypress/pages/checkoutPage.js
import { CheckoutPageLocators } from '../locators/checkoutPageLocators.js';

export class CheckoutPage {
    fillCheckoutInformation(firstName, lastName, postalCode) {
      cy.get(CheckoutPageLocators.firstNameInput).type(firstName);
      cy.get(CheckoutPageLocators.lastNameInput).type(lastName);
      cy.get(CheckoutPageLocators.postalCodeInput).type(postalCode);
      cy.get(CheckoutPageLocators.continueButton).click();
    }
  
    fillFirstName(firstName) {
      cy.get(CheckoutPageLocators.firstNameInput).type(firstName);
    }
  
    fillLastName(lastName) {
      cy.get(CheckoutPageLocators.lastNameInput).type(lastName);
    }
  
    fillPostalCode(postalCode) {
      cy.get(CheckoutPageLocators.postalCodeInput).type(postalCode);
    }

    clickContinue() {
      cy.get(CheckoutPageLocators.continueButton).click();
    }

    getErrorMessage() {
      return cy.get(CheckoutPageLocators.errorMessage);
    }

    finishCheckout() {
      cy.get('[data-test="finish"]').click();
    }
  
    assertCheckoutComplete() {
      cy.get('.complete-header').should('have.text', 'Thank you for your order!');
    }

    getItemPrices() {
      return cy.get('.inventory_item_price'); 
    }
  
    getItemTotal() {
      return cy.get('.summary_subtotal_label');
    }
  
    getTax() {
      return cy.get('.summary_tax_label');
    }
  
    getTotal() {
      return cy.get('.summary_total_label');
    }
  
    clickCancel() {
      cy.get('[data-test="cancel"]').click();
    }
  }
  
