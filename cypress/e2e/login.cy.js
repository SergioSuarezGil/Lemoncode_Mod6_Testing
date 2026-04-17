describe('Login Scene', () => {
  it('should render login form', () => {
    // Arrange & Act
    cy.visit('/login');

    // Assert
    cy.get('input[name="user"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('button[type="submit"]').should('exist');
  });

  it('should show validation error if fields are empty', () => {
    // Arrange
    cy.visit('/login');

    // Act
    cy.get('button[type="submit"]').click();

    // Assert
    cy.contains('Debe informar el campo').should('exist');
  });

  it('should show error with invalid credentials', () => {
    // Arrange

    cy.visit('/login');
    // Act
    cy.get('input[name="user"]').type('wrong');
    cy.get('input[name="password"]').type('wrong');
    cy.get('button[type="submit"]').click();

    // Assert
    cy.contains('Usuario y/o password no válidos').should('exist');
  });

  it('should login with valid credentials and navigate', () => {
    // Arrange
    cy.visit('/login');

    // Act
    cy.get('input[name="user"]').type('admin');
    cy.get('input[name="password"]').type('test');
    cy.get('button[type="submit"]').click();

    // Assert
    cy.url().should('include', '/submodule-list');
  });
});
