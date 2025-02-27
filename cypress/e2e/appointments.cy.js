describe('Appointments', () => {
  it('should book an interview', () => {
    //reset database
    cy.request('GET', '/api/debug/reset');
    //visit root of web server
    cy.visit('/');
    //confirm DOM contains the text monday
    cy.contains('Monday');
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
});
