// describe('Appointments', () => {
//   it('should book an interview', () => {
//     //reset database
//     cy.request('GET', '/api/debug/reset');
//     //visit root of web server
//     cy.visit('/');
//     //confirm DOM contains the text monday
//     cy.contains('Monday');
//     //click add button second appointment
//     cy.get('[alt=Add]').first().click();
//     //enter name
//     cy.get('[data-testid=student-name-input]').type('Lydia Miller-Jones');
//     //choose interviewer
//     cy.get("[alt='Sylvia Palmer']").click();
//     //click the save button
//     cy.contains('Save').click();
//     //verification
//     cy.contains('.appointment__card--show', 'Lydia Miller-Jones');
//     cy.contains('.appointment__card--show', 'Sylvia Palmer');
//   });
// });

//refactored to separate common test commands from ones specific to the shoold book an appointment interview

describe('Appointments', () => {
  beforeEach(() => {
    //reset database
    cy.request('GET', '/api/debug/reset');
    //visit root of web server
    cy.visit('/');
    //confirm DOM contains the text monday
    cy.contains('Monday');
  });

  it('should book an interview', () => {
    //click add button second appointment
    cy.get('[alt=Add]').first().click();
    //enter name
    cy.get('[data-testid=student-name-input]').type('Lydia Miller-Jones');
    //choose interviewer
    cy.get("[alt='Sylvia Palmer']").click();
    //click the save button
    cy.contains('Save').click();
    //verification
    cy.contains('.appointment__card--show', 'Lydia Miller-Jones');
    cy.contains('.appointment__card--show', 'Sylvia Palmer');
  });

  it('should edit an interview', () => {
    //click edit button
    cy.get('[alt=Edit]').first().click({ force: true });
    //enter name
    cy.get('[data-testid=student-name-input]').type('Lydia Miller-Jones');
    //choose interviewer
    cy.get("[alt='Tori Malcolm']").click();
    //click the save button
    cy.contains('Save').click();
    //verification
    cy.contains('.appointment__card--show', 'Lydia Miller-Jones');
    cy.contains('.appointment__card--show', 'Tori Malcolm');
  });

  it('should cancel an interview', () => {
    //click cancel button
    cy.get('[alt=Delete]').first().click({ force: true });
    //click the confirm button
    cy.contains('Confirm').click();
    //deleting indicator
    cy.contains('Deleting').should('exist');
    cy.contains('Deleting').should('not.exist');
    cy.contains('.appointment__card--show', 'Archie Cohen').should('not.exist');
  });
});
