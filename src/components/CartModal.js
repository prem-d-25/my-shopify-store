// src/components/CartModal.js
import { useCart } from "../context/CartContext";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { CREATE_CHECKOUT } from "@/queries/checkout";
import { useMutation } from "@apollo/client";

export default function CartModal({ closeModal }) {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();

  // checkout code handling
  const router = useRouter();
  const [createCheckout, { data, loading, error }] =
    useMutation(CREATE_CHECKOUT);

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
  // checkout code handling

  const total = cart.reduce(
    (acc, item) => acc + parseFloat(item.price) * item.quantity,
    0
  );

  // Close modal when clicking outside
  const handleClickOutside = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      closeModal();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 modal-overlay flex flex-col place-content-center text-black"
      onClick={handleClickOutside}
    >
      {/* Sliding Drawer (Cart) */}
      <div className="bg-white w-full sm:w-full md:w-7/12 lg:w-1/3 p-6 pt-20 h-full fixed right-0 shadow-lg flex flex-col">
        <button
          className="absolute right-4 text-gray-500 hover:text-gray-700"
          onClick={closeModal}
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>

        {cart.length === 0 ? (
          <p className="text-black">Your cart is empty.</p>
        ) : (
          <>
            {/* Cart Items Section */}
            <ul className="flex-grow overflow-y-auto">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center mb-4 border-b border-gray-300 pb-4"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={96}
                    height={96}
                    className="w-24 h-24 object-cover mr-4"
                  />
                  <div className="flex-1 pr-3">
                    <h3 className="text-sm font-semibold">{item.title}</h3>
                    <p>{item.variantTitle}</p>
                    <span className="text-gray-700 font-medium">
                      {item.price} {item.currency}
                    </span>
                    <div className="flex items-center mt-2">
                      {/* <label htmlFor={`quantity-${item.id}`} className="mr-2">
                        Quantity:
                      </label> */}
                      <div className="flex items-center border border-gray rounded-r">
                        {/* Minus Button */}
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.max(item.quantity - 1, 1)
                            )
                          } // Ensure quantity doesn't go below 1
                          className="text-black rounded-l p-2"
                        >
                          -
                        </button>

                        {/* Quantity Input */}
                        <input
                          id={`quantity-${item.id}`}
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(item.id, Math.max(e.target.value, 1))
                          }
                          className="w-16 text-center p-2"
                          style={{
                            appearance: "none",
                            MozAppearance: "textfield",
                            WebkitAppearance: "none",
                          }}
                        />

                        {/* Plus Button */}
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className=" text-black rounded-r p-2"
                        >
                          +
                        </button>
                      </div>

                      <FontAwesomeIcon
                        className="ml-5 text-red-600 cursor-pointer"
                        icon={faTrash}
                        onClick={() => clearCart(item.id)}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Total and Buttons Section */}
            <div className="mt-auto border-t border-gray-200 pt-4">
              <h2 className="text-lg font-bold mb-2">
                Total:{" "}
                <span className="float-right text-gray-600">
                  {total.toFixed(2)}
                </span>
              </h2>
              <div className="flex justify-between">
                {/* <button
                  onClick={clearCart}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Clear Cart
                </button> */}
                {/* <button
                  onClick={}
                  className="bg-gray-800 text-white px-4 py-2 w-full rounded hover:bg-black"
                >
                  Proceed to Checkout
                </button> */}

                <button
                  onClick={handleCheckout}
                  className="glare-button bg-black text-white text-base font-bold uppercase px-2 py-4 w-full rounded-lg"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
