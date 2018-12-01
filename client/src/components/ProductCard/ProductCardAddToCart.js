import React from 'react';

// components
import Button from '../Button';
import { withLoginModal } from '../LoginModal';
import withAuth from '../withAuth';

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

  addToCart = () => {
    if (!this.props.withAuth.isLoggedIn) {
      this.setState(
        {
          currentButton: 'remove',
        },
        () => this.props.withLoginModal.showModal(true)
      );
    } else {
      // todo
    }
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

    return <AddToCartBtn onClick={this.addToCart} />;
  }

  render() {
    return this.renderButton();
  }
}

export default withAuth(withLoginModal(ProductCardAddToCart));
