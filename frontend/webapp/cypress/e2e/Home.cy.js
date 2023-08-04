describe('Home Component', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('http://localhost:3001/'); // assuming your home route is '/'

    // Mocking the login state and user data
    window.sessionStorage.setItem('userDetails', JSON.stringify({
      fullName: 'Test User',
      isAdmin: true,
    }));
    cy.window().then((win) => {
      win.useAuth = () => ({ isLoggedIn: true });
    });
  });

  it('renders the welcome message', () => {
    cy.contains('Welcome Dear, Mohammed Ismail');
    cy.contains('Hope You Are Doing Great!');
  });

  it('redirects to the correct page when Schedule an Exam button is clicked', () => {
    cy.contains('Schedule Now').click();
    cy.url().should('include', '/schedule-exam');
  });

  it('redirects to the correct page when View Exam Logs button is clicked', () => {
    cy.contains('View Exam Logs').click();
    cy.url().should('include', '/exam-logs');
  });

  it('redirects to the correct page when View Ongoing Exams button is clicked', () => {
    cy.contains('View Ongoing Exams').click();
    cy.url().should('include', '/ongoing-exams');
  });

  it('redirects to the correct page when Manage Users button is clicked', () => {
    cy.contains('Manage Users').click();
    cy.url().should('include', '/manage-users');
  });
});
