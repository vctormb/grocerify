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

  addToCart = createOrderedProduct => {
    if (!this.props.withAuth.isLoggedIn) {
      this.props.withLoginModal.showModal(true);
    } else {
      createOrderedProduct({
        variables: {
          productId: this.props.productId,
        },
      });
    }
  };

  onCompletedAddToCart = data => {
    this.setState({
      currentButton: 'remove',
    });
  };

  removeFromCart = () => {
    this.setState({
      currentButton: 'add',
    });
  };

  renderButton() {
    if (this.state.currentButton === 'remove') {
      return (
        <RemoveBtn
          onClick={this.removeFromCart}
          isLoading={this.state.isLoading}
        />
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
  productId: PropTypes.string.isRequired,
};

export default withAuth(withLoginModal(ProductCardAddToCart));
