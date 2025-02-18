// src/queries/checkout.js
import { gql } from '@apollo/client';

export const CREATE_CHECKOUT = gql`
  mutation CreateCheckout($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        webUrl
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;
