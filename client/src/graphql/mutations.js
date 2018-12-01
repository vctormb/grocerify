import gql from 'graphql-tag';

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        name
      }
    }
  }
`;

const CREATE_ORDERED_PRODUCT = gql`
  mutation CreateOrderedProduct($productId: ID!, $quantity: Int! = 1) {
    createOrderedProduct(productId: $productId, quantity: $quantity) {
      id
      totalPrice
      orderedProducts {
        id
        product {
          id
          imageUrl
          title
          price
        }
        quantity
      }
    }
  }
`;

const DELETE_ORDERED_PRODUCT = gql`
  mutation DeleteOrderedProduct($productId: ID!) {
    deleteOrderedProduct(productId: $productId) {
      id
    }
  }
`;

export default {
  LOGIN,
  CREATE_ORDERED_PRODUCT,
  DELETE_ORDERED_PRODUCT,
};
