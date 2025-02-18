// // src/app/cart/page.js
// "use client";

// import { useCart } from "../../context/CartContext";
// import Link from "next/link";

// export default function CartPage() {
//   const { cart, removeFromCart, clearCart, updateQuantity  } = useCart();

//   const total = cart.reduce(
//     (acc, item) => acc + parseFloat(item.price) * item.quantity,
//     0
//   );
//   console.log(cart)
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
//       {cart.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <div>
//           <ul>
//             {cart.map((item) => (
//               <li key={item.id} className="flex items-center mb-4">
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="w-24 h-24 object-cover mr-4"
//                 />
//                 <div className="flex-1">
//                   <h2 className="text-xl font-semibold">{item.title}</h2>
//                   <p>
//                     {item.variantTitle} - {item.price} {item.currency}
//                   </p>
//                   <p>Quantity: {item.quantity}</p>
//                 </div>
//                 {/* <button
//                   onClick={() => removeFromCart(item.id)}
//                   className="text-red-600 hover:underline"
//                 >
//                   Remove
//                 </button> */}
//                 <div className="flex items-center space-x-4">
//                   <input
//                     type="number"
//                     min="1"
//                     value={item.quantity}
//                     onChange={(e) => updateQuantity(item.id, e.target.value)}
//                     className="w-16 border border-gray-300 p-2 rounded"
//                   />
//                   <button
//                     onClick={() => removeFromCart(item.id)}
//                     className="text-red-600 hover:underline"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//           <div className="mt-6">
//             <h2 className="text-2xl font-bold">Total: {total.toFixed(2)}</h2>
//             <div className="mt-4">
//               <Link
//                 href="/checkout"
//                 className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//               >
//                 Proceed to Checkout
//               </Link>
//               <button
//                 onClick={clearCart}
//                 className="ml-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//               >
//                 Clear Cart
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// ========================================
// ========================================
// ========================================


// src/app/cart/page.js
"use client";

import { useCart } from "../../context/CartContext";
import Link from "next/link";
import Image from 'next/image';

export default function CartPage() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();

  const total = cart.reduce(
    (acc, item) => acc + parseFloat(item.price) * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="flex items-center mb-4">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={96} // 24 * 4
                  height={96} // 24 * 4
                  className="w-24 h-24 object-cover mr-4"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <p>
                    {item.variantTitle} - {item.price} {item.currency}
                  </p>
                  <div className="flex items-center mt-2">
                    <label htmlFor={`quantity-${item.id}`} className="mr-2">
                      Quantity:
                    </label>
                    <input
                      id={`quantity-${item.id}`}
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, e.target.value)
                      }
                      className="w-16 border border-gray-300 p-2 rounded"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <h2 className="text-2xl font-bold">Total: {total.toFixed(2)}</h2>
            <div className="mt-4">
              <Link
                href="/checkout"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Proceed to Checkout
              </Link>
              <button
                onClick={clearCart}
                className="ml-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
