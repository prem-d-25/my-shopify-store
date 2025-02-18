// src/queries/getCollectionProducts.js
import { gql } from '@apollo/client';

export const GET_COLLECTION_PRODUCTS = gql`
  query GetCollectionProducts($handle: String!, $first: Int!) {
    collectionByHandle(handle: $handle) {
      title
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            images(first: 2) {
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
          }
        }
      }
    }
  }
`;
