// describe('Navigation', () => {
//   it('should visit root', () => {
//     cy.visit('/');
//   });
//   it('should navigate to Tuesday', () => {
//     cy.visit('/');
//     cy.get('li').contains('Tuesday').click();
//     cy.get('li')
//       .contains("li", 'Tuesday')
//       .should('have.css', 'background-color', 'rgb(242, 242, 242)');
//   });
// });

//refactored - incorrect doesnt pass

// describe('Navigation', () => {
//   it('should visit root and navigate to Tuesday with correct background color', () => {
//     cy.visit('/');
//     cy.get('li')
//       .contains('Tuesday')
//       .click()
//       .should('have.css', 'background-color', 'rgb(242, 242, 242)');
//   });
// });

//refactored correctly
describe('Navigation', () => {
  it('should visit root', () => {
    cy.visit('/');
  });
  it('should navigate to Tuesday', () => {
    cy.visit('/');

    cy.contains('[data-testid=day]', 'Tuesday')
      .click()
      .should('have.class', 'day-list__item--selected');
  });
});
