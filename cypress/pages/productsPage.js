// cypress/pages/productsPage.js

export class ProductsPage {
    addToCart(productName) {
      cy.contains('.inventory_item', productName)
        .find('button')
        .click();
    }
  
    goToCart() {
      cy.get('.shopping_cart_link').click();
    }
  }
  