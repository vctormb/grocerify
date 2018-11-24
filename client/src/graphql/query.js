import gql from 'graphql-tag';

const PRODUCTS = gql`
  {
    products {
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
