import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

// components
import Button from '../Button';
import { withLoginModal } from '../LoginModal';
import withApp from '../withApp';
// graphql
import { Mutation } from 'react-apollo';
import { queries, mutations } from '../../graphql';

/**
 * these two components were separated to avoid the blank svg bug
 */
const AddToCartBtn = props => (
  <Button {...props} icon="shopping-cart" appearance="ghostSuccess">
    ADD TO CART
  </Button>
);

const RemoveBtn = props => (
  <Button {...props} icon="trash-2" appearance="ghost">
    REMOVE
  </Button>
);

class ProductCardAddToCart extends React.Component {
  state = {
    currentButton: 'add',
  };

  componentDidMount() {
    this._isMounted = true;

    if (this.props.product.userOrderedProduct) {
      this.setState({
        currentButton: 'remove',
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.product.userOrderedProduct !==
        this.props.product.userOrderedProduct &&
      !this.props.product.userOrderedProduct
    ) {
      this.setState({
        currentButton: 'add',
      });
    }

    if (
      prevProps.product.userOrderedProduct !==
        this.props.product.userOrderedProduct &&
      this.props.product.userOrderedProduct
    ) {
      this.setState({
        currentButton: 'remove',
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  addToCart = createOrderedProduct => {
    if (!this.props.withApp.isLoggedIn) {
      this.props.withLoginModal.showModal(true);
    } else {
      this.props.withApp.setIsBlocking(true);

      createOrderedProduct({
        variables: {
          productId: this.props.product.id,
        },
      });
    }
  };

  onUpdateAddToCart = cache => {
    const { countUserOrderedProducts } = cache.readQuery({
      query: queries.COUNT_USER_ORDERED_PRODUCTS,
    });

    cache.writeQuery({
      query: queries.COUNT_USER_ORDERED_PRODUCTS,
      data: {
        countUserOrderedProducts: countUserOrderedProducts + 1,
      },
    });

    this.props.withApp.setIsBlocking(false);

    if (!this._isMounted) return;

    this.setState({
      currentButton: 'remove',
    });
  };

  removeFromCart = deleteOrderedProduct => {
    this.props.withApp.setIsBlocking(true);

    deleteOrderedProduct({
      variables: {
        productId: this.props.product.id,
      },
    });
  };

  onUpdateRemoveFromCart = cache => {
    const { countUserOrderedProducts } = cache.readQuery({
      query: queries.COUNT_USER_ORDERED_PRODUCTS,
    });

    cache.writeQuery({
      query: queries.COUNT_USER_ORDERED_PRODUCTS,
      data: {
        countUserOrderedProducts: countUserOrderedProducts - 1,
      },
    });

    this.props.withApp.setIsBlocking(false);

    if (!this._isMounted) return;

    this.setState({
      currentButton: 'add',
    });
  };

  renderButton() {
    if (this.state.currentButton === 'remove') {
      return (
        <Mutation
          mutation={mutations.DELETE_ORDERED_PRODUCT}
          update={this.onUpdateRemoveFromCart}
        >
          {(deleteOrderedProduct, { loading }) => (
            <RemoveBtn
              onClick={() => this.removeFromCart(deleteOrderedProduct)}
              isLoading={loading}
              disabled={loading}
            />
          )}
        </Mutation>
      );
    }

    return (
      <Mutation
        mutation={mutations.CREATE_ORDERED_PRODUCT}
        update={this.onUpdateAddToCart}
      >
        {(createOrderedProduct, { loading }) => (
          <AddToCartBtn
            onClick={() => this.addToCart(createOrderedProduct)}
            isLoading={loading}
            disabled={loading}
          />
        )}
      </Mutation>
    );
  }

  render() {
    return this.renderButton();
  }
}

ProductCardAddToCart.propTypes = {
  product: PropTypes.object.isRequired,
};

const enhance = compose(
  withApp,
  withLoginModal
);

export default enhance(ProductCardAddToCart);
