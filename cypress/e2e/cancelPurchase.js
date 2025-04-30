import { LoginPage } from '../pages/LoginPage.js';
import { ProductsPage } from '../pages/ProductsPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';

describe('Cancel Purchase & Validate Bill', () => {
  const loginPage = new LoginPage();
  const inventoryPage = new ProductsPage();
  const cartPage = new CartPage();
  const checkoutPage = new CheckoutPage();
  const overviewPage = new CheckoutOverviewPage();

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
    loginPage.fillUsername('standard_user');
    loginPage.fillPassword('secret_sauce');
    loginPage.clickLogin();

    // Add multiple items
    inventoryPage.addToCart('Sauce Labs Backpack');
    inventoryPage.addToCart('Sauce Labs Bike Light');
    inventoryPage.goToCart();

    cartPage.proceedToCheckout();

    checkoutPage.fillFirstName('John');
    checkoutPage.fillLastName('Doe');
    checkoutPage.fillPostalCode('12345');
    checkoutPage.clickContinue();
  });

  it('should validate billing and cancel purchase', () => {
    let expectedItemTotal = 0;

    // Sum all individual item prices
    overviewPage.getItemPrices().each(($el) => {
      const priceText = $el.text().replace('$', '');
      expectedItemTotal += parseFloat(priceText);
    });

    // Validate item total
    overviewPage.getItemTotal().invoke('text').then((text) => {
      const itemTotal = parseFloat(text.replace('Item total: $', ''));
      expect(itemTotal).to.be.closeTo(expectedItemTotal, 0.01);
    });

    // Validate final total = item total + tax
    overviewPage.getTax().invoke('text').then((taxText) => {
      const tax = parseFloat(taxText.replace('Tax: $', ''));

      overviewPage.getTotal().invoke('text').then((totalText) => {
        const total = parseFloat(totalText.replace('Total: $', ''));
        const expectedTotal = expectedItemTotal + tax;

        expect(total).to.be.closeTo(expectedTotal, 0.01);
      });
    });

    // Cancel purchase
    overviewPage.clickCancel();

    // Should be back to cart or inventory page
    cy.url().should('include', 'inventory');
  });
});
