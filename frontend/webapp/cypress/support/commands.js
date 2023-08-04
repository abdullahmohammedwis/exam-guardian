// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', () => {
    const userDetails = {
      fullName: 'Mohammed Ismail',
      email: 'admin@lsbu.com',
      password: '1234567',
      isAdmin: true,
    };
  
    window.sessionStorage.setItem('userDetails', JSON.stringify(userDetails));
    cy.setCookie('jwt', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY0YzIzOTg4MDMwMjAxMjhhNzcwYzdmNiIsImZ1bGxOYW1lIjoiTW9oYW1tZWQgSXNtYWlsIiwiZW1haWwiOiJhZG1pbkBsc2J1LmNvbSIsInBhc3N3b3JkIjoiMTIzNDU2NyIsImlzQWRtaW4iOnRydWUsIl9fdiI6MH0sImlhdCI6MTY5MTE4NzY1MCwiZXhwIjoxNjkxMTkxMjUwfQ.v2041yBqHOXk4lawmq7xkmizLPheQZhUdh8-1NMShdE');
  });
  