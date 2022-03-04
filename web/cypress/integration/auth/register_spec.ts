describe('Register', () => {
  // Working
  it('should register and go to login page', () => {
    cy.visit('/register');
    cy.get('[role="firstNameInput"]').type('jest');
    cy.get('[role="lastNameInput"]').type('jest');
    cy.get('[role="emailInput"]').type('jest@gmail.com');
    cy.get('[role="usernameInput"]').type('jest');
    cy.get('[role="passwordInput"]').type('jest');
    cy.get('[role="confirmPasswordInput"]').type('jest');
    cy.get('[role="submit"]').click();
    cy.url().should('include', '/login');
  });

  it('should render field error for unmatching password', () => {
    cy.visit('/register');
    cy.get('[role="passwordInput"]').type('jests');
    cy.get('[role="confirmPasswordInput"]').type('jest');
    cy.get('[role="submit"]').click();
    cy.get('[data-test-id="confirmPasswordInputError"]').should('have.text', 'Passwords do not match');
  });

  it('should render field error for short username', () => {
    cy.visit('/register');
    cy.get('[role="firstNameInput"]').type('jt');
    cy.get('[role="lastNameInput"]').type('jest');
    cy.get('[role="emailInput"]').type('jestw@gmail.com');
    cy.get('[role="usernameInput"]').type('j');
    cy.get('[role="passwordInput"]').type('jest');
    cy.get('[role="confirmPasswordInput"]').type('jest');
    cy.get('[role="submit"]').click();
    cy.get('[data-test-id="usernameInputError"]').should('have.text', 'must be longer than or equal to 4 characters');
  });

  it('should redirect to login page', () => {
    cy.visit('/register');
    cy.get('[role="login-redirect"]').click();
    cy.url().should('include', '/login');
  });
});
