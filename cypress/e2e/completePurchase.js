import { LoginPage } from '../pages/LoginPage';
import { InventoryPage, ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { validateBill } from '../support/helpers/validateBill';

describe('Complete Purchase and Verify Confirmation', () => {
  const loginPage = new LoginPage();
  const productsPage = new ProductsPage();
  const cartPage = new CartPage();
  const checkoutPage = new CheckoutPage();
  let users;

  
  before(() => {
    cy.fixture('users').then((data) => {
      users = data;
    });
  });

  beforeEach(() => {
    cy.visit('/');
    loginPage.fillUsername(users.standardUser.username);
    loginPage.fillPassword(users.standardUser.password);
    loginPage.clickLogin();

    productsPage.addToCart('Sauce Labs Backpack');
    productsPage.addToCart('Sauce Labs Bike Light');
    productsPage.goToCart();
    cartPage.proceedToCheckout();

    checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
  });

  it('should validate bill and complete purchase', () => {
    validateBill();

    cy.get('[data-test="finish"]').click();

    // ✅ Confirmation validation
    cy.get('.complete-header').should('have.text', 'Thank you for your order!');
    cy.get('.complete-text').should('contain.text', 'Your order has been dispatched');
  });
});
