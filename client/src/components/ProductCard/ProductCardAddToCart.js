import React from 'react';
import PropTypes from 'prop-types';

// components
import Button from '../Button';
import { withLoginModal } from '../LoginModal';
import withAuth from '../withAuth';
// graphql
import { Mutation } from 'react-apollo';
import { mutations } from '../../graphql';

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
    if (this.props.product.userOrderedProduct) {
      this.setState({
        currentButton: 'remove',
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.product.userOrderedProduct !==
      this.props.product.userOrderedProduct
    ) {
      this.setState({
        currentButton: 'remove',
      });
    }
  }

  addToCart = createOrderedProduct => {
    if (!this.props.withAuth.isLoggedIn) {
      this.props.withLoginModal.showModal(true);
    } else {
      createOrderedProduct({
        variables: {
          productId: this.props.product.id,
        },
      });
    }
  };

  onCompletedAddToCart = data => {
    this.setState({
      currentButton: 'remove',
    });
  };

  removeFromCart = deleteOrderedProduct => {
    deleteOrderedProduct({
      variables: {
        productId: this.props.product.id,
      },
    });
  };

  onCompletedremoveFromCart = data => {
    this.setState({
      currentButton: 'add',
    });
  };

  renderButton() {
    if (this.state.currentButton === 'remove') {
      return (
        <Mutation
          mutation={mutations.DELETE_ORDERED_PRODUCT}
          onCompleted={this.onCompletedremoveFromCart}
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
        onCompleted={this.onCompletedAddToCart}
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

export default withAuth(withLoginModal(ProductCardAddToCart));
