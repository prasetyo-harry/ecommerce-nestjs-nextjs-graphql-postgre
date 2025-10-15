import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      title
      price
      stock
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $title: String!
    $description: String!
    $price: Float!
    $stock: Float!
  ) {
    createProduct(title: $title, description: $description, price: $price, stock: $stock) {
      id
      title
      price
      stock
    }
  }
`;
