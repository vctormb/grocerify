describe('<Home /> list of products', () => {
  beforeEach(() => {
    cy.fixture('products').as('products');
  });

  it.only('should render the list of products', function() {
    cy.mockGraphQL([this.products]);

    cy.visit('/');

    const loadingIcon = 'svg[data-testid="loading-products-icon"]';

    cy.get('button[data-testid="add-to-cart-btn"]').should('have.length', 3);
    cy.get(loadingIcon).should('not.be.visible');
  });
});

describe('<Home /> showing login modal', () => {
  beforeEach(() => {
    cy.fixture('productsOneItem').as('productsOneItem');
  });

  it('should show the login modal when trying to add to cart without being logged in', function() {
    cy.mockGraphQL([this.productsOneItem]);

    cy.visit('/');

    cy.get('div').contains(/bananas/i);

    cy.get('button[data-testid="add-to-cart-btn"]').click();

    cy.get('h3').contains(/you need to login first/i);
  });
});

describe('<Home /> add to cart', () => {
  beforeEach(() => {
    cy.fixture('productsOneItem').as('productsOneItem');
    cy.fixture('login').as('login');
    cy.fixture('countUserOrderedProducts').as('countUserOrderedProducts');
    cy.fixture('createOrderedProduct').as('createOrderedProduct');
  });

  it('should add to cart when user loggs in', function() {
    cy.mockGraphQL([
      this.productsOneItem,
      this.login,
      this.countUserOrderedProducts,
      this.createOrderedProduct,
    ]);

    const addToCartBtn = 'button[data-testid="add-to-cart-btn"]';

    cy.visit('/');

    cy.get('div').contains(/bananas/i);

    cy.get(addToCartBtn).click();

    const emailText = 'user@email.com';
    const passwordText = '123123';

    cy.get('input[name="email"]')
      .type(emailText)
      .should('have.value', emailText);

    cy.get('input[name="password"]')
      .type(passwordText)
      .should('have.value', passwordText);

    cy.get('button[data-testid="login-btn"]').click();

    cy.get(addToCartBtn).click();

    cy.get('button[data-testid="remove-from-cart-btn"]').should('be.visible');
    cy.get('button[data-testid="cart-btn"]>div')
      .children('div[data-testid="badge"]')
      .contains('1');
  });
});
