import { CheckoutOverviewLocators } from '../locators/checkoutOverviewLocators';

export class CheckoutOverviewPage {
  getItemPrices() {
    return cy.get('.inventory_item_price'); // can adjust to XPath if needed
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
