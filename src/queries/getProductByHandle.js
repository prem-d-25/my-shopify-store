// src/queries/getProductByHandle.js
import { gql } from '@apollo/client';

export const GET_PRODUCT_BY_HANDLE = gql`
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      descriptionHtml
      images(first: 5) {
        edges {
          node {
            src
            altText
          }
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            priceV2 {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;
