describe('<Cart /> redirect to cart screen with empty cart message', () => {
  beforeEach(() => {
    cy.fixture('loginWithOrderedProduct').as('login');
    cy.fixture('products').as('products');
    cy.fixture('userOrderEmpty').as('userOrder');
  });

  it('should show the empty cart message if there`s no products in the cart', function() {
    cy.mockGraphQL([this.login, this.products, this.userOrder]);

    cy.login();

    cy.get('button[data-testid="cart-btn"]').click();

    const loadingIcon = 'svg[data-testid="loading-cart-icon"]';
    cy.get(loadingIcon).should('not.be.visible');

    cy.get('div').contains(/your cart is empty/i);
  });
});

describe('<Cart /> increment product', () => {
  beforeEach(() => {
    cy.fixture('loginWithOrderedProduct').as('login');
    cy.fixture('countUserOrderedProducts').as('countUserOrderedProducts');
    cy.fixture('productsOneItem').as('productsOneItem');
    cy.fixture('userOrderOneItem').as('userOrder');
    cy.fixture('incrementOrderedProduct').as('incrementOrderedProduct');
  });

  it('should increment the order price when a product is incremented', function() {
    const quantityInput = 'input[data-testid="quantity-input"]';

    cy.mockGraphQL([
      this.login,
      this.productsOneItem,
      this.countUserOrderedProducts,
      this.userOrder,
      this.incrementOrderedProduct,
    ]);

    cy.login();

    cy.visit('/cart');

    cy.contains('$ 2.00');

    cy.get(quantityInput).should('have.value', '2');

    cy.get('button[data-testid="quantity-increment"]').click();

    cy.contains('$ 3.00');
    cy.get(quantityInput).should('have.value', '3');
  });
});

describe('<Cart /> decrement product', () => {
  beforeEach(() => {
    cy.fixture('loginWithOrderedProduct').as('login');
    cy.fixture('countUserOrderedProducts').as('countUserOrderedProducts');
    cy.fixture('productsOneItem').as('productsOneItem');
    cy.fixture('userOrderOneItem').as('userOrder');
    cy.fixture('decrementOrderedProduct').as('decrementOrderedProduct');
  });

  it.only('should increment the order price when a product is incremented', function() {
    const quantityInput = 'input[data-testid="quantity-input"]';

    cy.mockGraphQL([
      this.login,
      this.productsOneItem,
      this.countUserOrderedProducts,
      this.userOrder,
      this.decrementOrderedProduct,
    ]);

    cy.login();

    cy.visit('/cart');

    cy.contains('$ 2.00');

    cy.get(quantityInput).should('have.value', '2');

    cy.get('button[data-testid="quantity-increment"]').click();

    cy.contains('$ 1.00');
    cy.get(quantityInput).should('have.value', '1');
  });
});
