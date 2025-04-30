export function validateBill() {
    cy.calculateItemTotal().then((expectedItemTotal) => {
      // Validate item total
      cy.get('.summary_subtotal_label').invoke('text').then((text) => {
        const itemTotal = parseFloat(text.replace('Item total: $', ''));
        expect(itemTotal).to.be.closeTo(expectedItemTotal, 0.01);
      });
  
      // Validate tax and total
      cy.get('.summary_tax_label').invoke('text').then((taxText) => {
        const tax = parseFloat(taxText.replace('Tax: $', ''));
  
        cy.get('.summary_total_label').invoke('text').then((totalText) => {
          const total = parseFloat(totalText.replace('Total: $', ''));
          const expectedTotal = expectedItemTotal + tax;
  
          expect(total).to.be.closeTo(expectedTotal, 0.01);
        });
      });
    });
  }
  