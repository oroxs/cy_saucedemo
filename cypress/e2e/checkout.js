// cypress/e2e/checkout.cy.js

import { LoginPage } from '../pages/loginPage.js';
import { ProductsPage } from '../pages/productsPage.js';
import { CartPage } from '../pages/cartPage.js';
import { CheckoutPage } from '../pages/checkoutPage.js';


describe('SauceDemo Checkout Flow', () => {
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
    loginPage.visit();
    loginPage.fillUsername(users.standardUser.username);
    loginPage.fillPassword(users.standardUser.password);
    loginPage.clickLogin();
  });

  it('should complete a checkout successfully', () => {
    productsPage.addToCart('Sauce Labs Backpack');
    productsPage.goToCart();

    cartPage.proceedToCheckout();

    checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
    checkoutPage.finishCheckout();
    checkoutPage.assertCheckoutComplete();
  });
});
