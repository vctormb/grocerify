import React from 'react';

// components
import Button from '../Button';
import { withLoginModal } from '../LoginModal';
// utils
import { getToken } from '../../utils';

class ProductCardAddToCart extends React.Component {
  addToCart = () => {
    if (!getToken()) {
      this.props.withLoginModal.showModal(true);
    } else {
      // todo
    }
  };

  render() {
    return (
      <Button
        appearance="ghostSuccess"
        icon="shopping-cart"
        onClick={this.addToCart}
      >
        ADD TO CART
      </Button>
    );
  }
}

export default withLoginModal(ProductCardAddToCart);
