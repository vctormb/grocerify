describe('<Login /> do the signup', () => {
  beforeEach(() => {
    cy.fixture('signup').as('signup');
    cy.fixture('products').as('products');
    cy.fixture('countUserOrderedProducts').as('countUserOrderedProducts');
  });

  it('should fill the signup form and do the login properly', function() {
    cy.mockGraphQL([this.signup, this.products, this.countUserOrderedProducts]);

    cy.visit('/login');

    cy.get('button[data-testid="create-acc-btn"]').click();

    const emailText = 'user@email.com';
    const passwordText = '123123';

    cy.get('input[name="name"]')
      .type('User')
      .should('have.value', 'User');

    cy.get('input[name="email"]')
      .type(emailText)
      .should('have.value', emailText);

    cy.get('input[name="password"]')
      .type(passwordText)
      .should('have.value', passwordText);

    cy.get('button[data-testid="login-btn"]').click();
  });
});
