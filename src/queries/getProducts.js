// // src/queries/getProducts.js
// import { gql } from '@apollo/client';

// export const GET_PRODUCTS = gql`
//   query GetProducts($first: Int!) {
//     products(first: $first) {
//       edges {
//         node {
//           id
//           title
//           handle
//           images(first: 1) {
//             edges {
//               node {
//                 src
//                 altText
//               }
//             }
//           }
//           priceRange {
//             minVariantPrice {
//               amount
//               currencyCode
//             }
//           }
//         }
//       }
//     }
//   }
// `;


// src/queries/getProducts.js
import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts($first: Int!) {
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
`;
