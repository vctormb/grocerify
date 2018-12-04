import React from 'react';
import PropTypes from 'prop-types';

// graphql
import { Mutation } from 'react-apollo';
import { queries, mutations } from '../../graphql';
// components
import { Button, QuantityField } from '../../components';

class ProductCardCartFooter extends React.Component {
  deleteOrderedProduct = (deleteOrderedProduct, productId) => {
    deleteOrderedProduct({
      variables: {
        productId,
      },
    });
  };

  onCompletedDeletedProduct = (cache, { data: { deleteOrderedProduct } }) => {
    const { userOrder } = cache.readQuery({
      query: queries.USER_ORDER,
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
  };

  updateOrderedProduct = (updateOrderedProduct, quantity) => {
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
  };

  render() {
    return (
      <React.Fragment>
        <Mutation
          mutation={mutations.DELETE_ORDERED_PRODUCT}
          update={this.onCompletedDeletedProduct}
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

export default ProductCardCartFooter;
