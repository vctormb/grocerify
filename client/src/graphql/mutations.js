import gql from 'graphql-tag';

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        name
        order {
          orderedProducts {
            product {
              id
            }
          }
        }
      }
    }
  }
`;

const CREATE_ORDERED_PRODUCT = gql`
  mutation CreateOrderedProduct($productId: ID!, $quantity: Int! = 1) {
    createOrderedProduct(productId: $productId, quantity: $quantity) {
      id
    }
  }
`;

const UPDATE_ORDERED_PRODUCT = gql`
  mutation UpdateOrderedProduct($orderedProductId: ID!, $quantity: Int! = 1) {
    updateOrderedProduct(
      orderedProductId: $orderedProductId
      quantity: $quantity
    ) {
      orderedProduct {
        id
        quantity
      }
      totalPrice
    }
  }
`;

const DELETE_ORDERED_PRODUCT = gql`
  mutation DeleteOrderedProduct($productId: ID!) {
    deleteOrderedProduct(productId: $productId) {
      orderedProduct {
        id
      }
      totalPrice
    }
  }
`;

const RESET_ORDER = gql`
  mutation ResetOrder {
    resetOrder {
      count
    }
  }
`;

export default {
  LOGIN,
  CREATE_ORDERED_PRODUCT,
  UPDATE_ORDERED_PRODUCT,
  DELETE_ORDERED_PRODUCT,
  RESET_ORDER,
};
