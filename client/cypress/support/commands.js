// --------------------------------------
// Mock GraphQL requests with stubs.
// required until Cypress support fetch API.
// https://github.com/cypress-io/cypress-documentation/issues/122#issuecomment-409839089
// --------------------------------------
Cypress.Commands.add('mockGraphQL', stubs => {
  cy.on('window:before:load', win => {
    cy.stub(win, 'fetch', (...args) => {
      const [url, request] = args;
      const postBody = JSON.parse(request.body);
      let promise;

      if (url.indexOf('graphql') !== -1) {
        stubs.some(stub => {
          if (postBody.operationName === stub.operation) {
            promise = Promise.resolve({
              ok: true,
              text() {
                return Promise.resolve(JSON.stringify(stub.response));
              },
            });
            return true;
          }
          return false;
        });
      }

      if (promise) {
        return promise;
      }

      console.log('Could not find a stub for the operation.');
      return false;
    });
  });
});

Cypress.Commands.add('login', () => {
  cy.visit('/login');

  const emailText = 'user@email.com';
  const passwordText = '123123';

  cy.get('input[name="email"]')
    .type(emailText)
    .should('have.value', emailText);

  cy.get('input[name="password"]')
    .type(passwordText)
    .should('have.value', passwordText);

  cy.get('button[data-testid="login-btn"]').click();
});
