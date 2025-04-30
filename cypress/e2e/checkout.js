// cypress/e2e/checkout.cy.js

import { LoginPage } from '../pages/LoginPage.js';
import { ProductsPage } from '../pages/ProductsPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
// import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';


describe('SauceDemo Checkout Flow', () => {
  const loginPage = new LoginPage();
  const productsPage = new ProductsPage();
  const cartPage = new CartPage();
  const checkoutPage = new CheckoutPage();
  // const overviewPage = new CheckoutOverviewPage();

  let users;
  let products;

  
  before(() => {
    cy.fixture('users').then((data) => {
      users = data;
    });

    cy.fixture('products').then((data) => {
      products = data;
    });
  });

  beforeEach(() => {
    loginPage.visit();
    loginPage.fillUsername(users.standardUser.username);
    loginPage.fillPassword(users.standardUser.password);
    loginPage.clickLogin();
  });

  it('should complete a checkout successfully', () => {
    productsPage.addToCart(products.backpack);
    productsPage.goToCart();

    cartPage.proceedToCheckout();

    checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
    checkoutPage.finishCheckout();
    checkoutPage.assertCheckoutComplete();
  });

  it('should validate billing and cancel purchase', () => {
    let expectedItemTotal = 0;
    // Add multiple items
    productsPage.addToCart(products.backpack);
    productsPage.addToCart(products.bikeLight);
    productsPage.goToCart();

    cartPage.proceedToCheckout();

    checkoutPage.fillFirstName('John');
    checkoutPage.fillLastName('Doe');
    checkoutPage.fillPostalCode('12345');
    checkoutPage.clickContinue();

    // Sum all individual item prices
    checkoutPage.getItemPrices().each(($el) => {
      const priceText = $el.text().replace('$', '');
      expectedItemTotal += parseFloat(priceText);
    });

    // Validate item total
    checkoutPage.getItemTotal().invoke('text').then((text) => {
      const itemTotal = parseFloat(text.replace('Item total: $', ''));
      expect(itemTotal).to.be.closeTo(expectedItemTotal, 0.01);
    });

    // Validate final total = item total + tax
    checkoutPage.getTax().invoke('text').then((taxText) => {
      const tax = parseFloat(taxText.replace('Tax: $', ''));

      checkoutPage.getTotal().invoke('text').then((totalText) => {
        const total = parseFloat(totalText.replace('Total: $', ''));
        const expectedTotal = expectedItemTotal + tax;

        expect(total).to.be.closeTo(expectedTotal, 0.01);
      });
    });

    // Cancel purchase
    checkoutPage.clickCancel();

    // Should be back to cart or inventory page
    cy.url().should('include', 'inventory');
  });
});
