import { CheckoutPage } from '../pages/CheckoutPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage, ProductsPage } from '../pages/ProductsPage.js';
import { CartPage } from '../pages/CartPage.js';

describe('Negative Case - Checkout without filling form', () => {
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
    productsPage.goToCart();
    cartPage.proceedToCheckout();
  });

  it('should show error when all fields are empty', () => {
    checkoutPage.clickContinue();
    checkoutPage.getErrorMessage().should('contain.text', 'First Name is required');
  });

  it('should show error when First Name is missing', () => {
    checkoutPage.fillLastName('Smith');
    checkoutPage.fillPostalCode('12345');
    checkoutPage.clickContinue();
    checkoutPage.getErrorMessage().should('contain.text', 'First Name is required');
  });

  it('should show error when Last Name is missing', () => {
    checkoutPage.fillFirstName('John');
    checkoutPage.fillPostalCode('12345');
    checkoutPage.clickContinue();
    checkoutPage.getErrorMessage().should('contain.text', 'Last Name is required');
  });

  it('should show error when Postal Code is missing', () => {
    checkoutPage.fillFirstName('John');
    checkoutPage.fillLastName('Smith');
    checkoutPage.clickContinue();
    checkoutPage.getErrorMessage().should('contain.text', 'Postal Code is required');
  });
});
