describe('Login Component', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3001/login'); // assuming your login route is '/login'
    });
  
    it('renders the login form', () => {
      cy.get('form').should('exist');
      cy.get('input[type="email"]').should('exist');
      cy.get('input[type="password"]').should('exist');
      cy.get('button[type="submit"]').should('exist');
    });
  
    it('handles input and form submission', () => {
      const email = 'test@example.com';
      const password = 'password';
  
      cy.get('input[type="email"]').type(email);
      cy.get('input[type="password"]').type(password);
  
      cy.get('button[type="submit"]').click();
  
      // Assuming you have a way to intercept and stub the network request
      cy.intercept('POST', 'http://localhost:7000/auth/login', {
        statusCode: 200,
        body: { token: 'fake-jwt-token' },
      });
  
      // Check if the user is redirected to the home page after successful login
      cy.url().should('include', '/');
    });
  
    it('shows an error message when login fails', () => {
      const email = 'test@example.com';
      const password = 'wrong-password';
  
      cy.get('input[type="email"]').type(email);
      cy.get('input[type="password"]').type(password);
  
      cy.get('button[type="submit"]').click();
  
      // Assuming you have a way to intercept and stub the network request
      cy.intercept('POST', 'http://localhost:7000/auth/login', {
        statusCode: 401,
        body: { error: 'Authentication failed' },
      });
  
      // Check if the error message is displayed
      cy.get('.alert-container').should('contain', 'Authentication failed');
    });
  });
  