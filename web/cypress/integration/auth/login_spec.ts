describe('Login', () => {
  it('should login and go to index page', () => {
    cy.visit('/login');
    cy.get('[role="usernameOrEmailInput"]').type('jest');
    cy.get('[role="passwordInput"]').type('jest');
    cy.get('[role="submit"]').click();
    cy.url().should('eq', 'http://localhost:3000/');
  });

  it('should load register page', () => {
    cy.visit('/login');
    cy.get('[role="register-redirect"]').click();
    cy.url().should('include', '/register');
  });

  it('should fail to login and render message if account is not confirmed');
});
