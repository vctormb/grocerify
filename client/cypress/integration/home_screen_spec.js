describe('<Home />', function() {
  it('should render the list of products', function() {
    const loadingIcon = 'svg[data-testid="loading-products-icon"]';

    cy.server();

    cy.route('POST', 'graphql', 'fixture:products.json').as('getProducts');

    cy.visit('/');

    cy.get(loadingIcon).should('be.visible');

    cy.wait(['@getProducts']);

    cy.get('button[data-testid="add-to-cart-btn"]').should('have.length', 3);
    cy.get(loadingIcon).should('not.be.visible');
  });
});
