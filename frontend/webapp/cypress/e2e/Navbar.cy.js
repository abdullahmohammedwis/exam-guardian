describe('CustomNavbar Component', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3001/'); // assuming your home route is '/'
      cy.login(); // assuming you have a login command that sets a fake JWT token
    });
  
    it('renders the navbar', () => {
      cy.get('nav').should('exist');
      cy.get('nav a').should('have.length', 4); // adjust this number based on the number of links in your navbar
    });
  
    it('navigates to the home page when the home link is clicked', () => {
      cy.get('nav a').contains('Home').click();
      cy.url().should('include', '/');
    });
  
    it('logs out when the logout button is clicked', () => {
      cy.get('nav button').contains('Logout').click();
  
      // Assuming you have a way to check if the user is logged out
      cy.getCookie('jwt').should('not.exist');
      cy.url().should('include', '/login');
    });
  });
  