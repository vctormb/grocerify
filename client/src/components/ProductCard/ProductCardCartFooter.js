import React from 'react';
import PropTypes from 'prop-types';

// graphql
import { Mutation } from 'react-apollo';
import { queries, mutations } from '../../graphql';
// components
import Button from '../Button';
import QuantityField from '../QuantityField';
import withApp from '../withApp';

class ProductCardCartFooter extends React.Component {
  deleteOrderedProduct = (deleteOrderedProduct, productId) => {
    this.props.withApp.setIsBlocking(true);

    deleteOrderedProduct({
      variables: {
        productId,
      },
    });
  };

  onUpdateDeletedProduct = (cache, { data: { deleteOrderedProduct } }) => {
    const { userOrder } = cache.readQuery({
      query: queries.USER_ORDER,
    });

    const { countUserOrderedProducts } = cache.readQuery({
      query: queries.COUNT_USER_ORDERED_PRODUCTS,
    });

    cache.writeQuery({
      query: queries.USER_ORDER,
      data: {
        userOrder: {
          ...userOrder,
          order: {
            ...userOrder.order,
            orderedProducts: userOrder.order.orderedProducts.filter(
              x => x.id !== deleteOrderedProduct.orderedProduct.id
            ),
          },
          totalPrice: deleteOrderedProduct.totalPrice,
        },
      },
    });

    cache.writeQuery({
      query: queries.COUNT_USER_ORDERED_PRODUCTS,
      data: {
        countUserOrderedProducts: countUserOrderedProducts - 1,
      },
    });

    this.props.withApp.setIsBlocking(false);
  };

  updateOrderedProduct = (updateOrderedProduct, quantity) => {
    this.props.withApp.setIsBlocking(true);

    updateOrderedProduct({
      variables: {
        orderedProductId: this.props.orderedProductId,
        quantity,
      },
    });
  };

  onCompleteUpdateProduct = (cache, { data: { updateOrderedProduct } }) => {
    const { userOrder } = cache.readQuery({
      query: queries.USER_ORDER,
    });

    cache.writeQuery({
      query: queries.USER_ORDER,
      data: {
        userOrder: {
          ...userOrder,
          totalPrice: updateOrderedProduct.totalPrice,
        },
      },
    });

    this.props.withApp.setIsBlocking(false);
  };

  render() {
    return (
      <React.Fragment>
        <Mutation
          mutation={mutations.DELETE_ORDERED_PRODUCT}
          update={this.onUpdateDeletedProduct}
        >
          {(deleteOrderedProduct, { loading }) => (
            <Button
              size="xs"
              appearance="textSuccess"
              disabled={loading}
              onClick={() =>
                this.deleteOrderedProduct(
                  deleteOrderedProduct,
                  this.props.productId
                )
              }
            >
              REMOVE
            </Button>
          )}
        </Mutation>

        <Mutation
          mutation={mutations.UPDATE_ORDERED_PRODUCT}
          update={this.onCompleteUpdateProduct}
        >
          {(updateOrderedProduct, { loading }) => (
            <QuantityField
              onChange={e => this.updateOrderedProduct(updateOrderedProduct, e)}
              count={this.props.quantity}
              disabled={loading}
            />
          )}
        </Mutation>
      </React.Fragment>
    );
  }
}

ProductCardCartFooter.propTypes = {
  orderedProductId: PropTypes.string.isRequired,
  productId: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default withApp(ProductCardCartFooter);
