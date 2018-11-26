import gql from 'graphql-tag';

const PRODUCTS = gql`
  query Products($first: Int, $skip: Int) {
    products(first: $first, skip: $skip) {
      id
      title
      imageUrl
      price
    }
  }
`;

export default {
  PRODUCTS,
};
