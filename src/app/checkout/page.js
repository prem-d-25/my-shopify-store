// src/app/checkout/page.js
"use client";

import { useCart } from "../../context/CartContext";
import { useMutation } from "@apollo/client";
import { CREATE_CHECKOUT } from "../../queries/checkout";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const [createCheckout, { data, loading, error }] =
    useMutation(CREATE_CHECKOUT);

  // old logic
  // const handleCheckout = async () => {
  //   if (cart.length === 0) {
  //     alert('Your cart is empty.');
  //     return;
  //   }

  //   const lineItems = cart.map((item) => ({
  //     variantId: item.id,
  //     quantity: item.quantity,
  //   }));

  //   try {
  //     const response = await createCheckout({
  //       variables: {
  //         input: {
  //           lineItems,
  //         },
  //       },
  //     });

  //     const { checkout, checkoutUserErrors } = response.data.checkoutCreate;

  //     if (checkout) {
  //       clearCart();
  //       router.push(checkout.webUrl);
  //     } else {
  //       console.error(checkoutUserErrors);
  //       alert('Failed to create checkout. Please try again.');
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     alert('An error occurred. Please try again.');
  //   }
  // };

  // new logic for handleCheckout
  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const lineItems = cart.map((item) => ({
      variantId: item.id,
      quantity: parseInt(item.quantity, 10), // Ensure quantity is an integer
    }));

    try {
      const response = await createCheckout({
        variables: {
          input: {
            lineItems,
          },
        },
      });

      const { checkout, checkoutUserErrors } = response.data.checkoutCreate;

      if (checkout) {
        clearCart();
        router.push(checkout.webUrl);
      } else {
        console.error(checkoutUserErrors);
        alert("Failed to create checkout. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      {loading && <p>Processing your order...</p>}
      {error && <p className="text-red-600">Error: {error.message}</p>}
      <button
        onClick={handleCheckout}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        Proceed to Shopify Checkout
      </button>
    </div>
  );
}
