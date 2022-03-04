describe('Index', () => {
  Cypress.Cookies.defaults({
    preserve: 'qid',
  });
  it('should render user firstName', () => {
    cy.visit('/login');
    cy.get('[role="usernameOrEmailInput"]').type('jest');
    cy.get('[role="passwordInput"]').type('jest');
    cy.get('[role="submit"]').click();
    cy.visit('/');
    cy.get('[role="welcome"]').should('have.text', 'Welcome, jest');
  });

  it('should render "user" if not logged in', () => {
    cy.visit('/');
    cy.get('[role="logout"]').click();
    cy.visit('/');
    cy.get('[role="welcome"]').should('have.text', 'Welcome, user');
  });
});
