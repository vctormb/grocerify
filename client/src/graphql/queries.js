import gql from 'graphql-tag';

const PRODUCTS = gql`
  query Products($first: Int, $skip: Int) {
    products(first: $first, skip: $skip) {
      id
      title
      imageUrl
      price
      userOrderedProduct {
        id
      }
    }
  }
`;

const USER_ORDER = gql`
  query UserOrder {
    userOrder {
      order {
        id
        orderedProducts {
          id
          quantity
          product {
            id
            title
            imageUrl
            price
          }
        }
      }
      totalPrice
    }
  }
`;

export default {
  PRODUCTS,
  USER_ORDER,
};
