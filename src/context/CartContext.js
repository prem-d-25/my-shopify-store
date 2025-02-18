// // src/context/CartContext.js
// 'use client';

// import { createContext, useContext, useState, useEffect } from 'react';

// const CartContext = createContext();

// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

//   // Persist cart to localStorage
//   useEffect(() => {
//     const storedCart = localStorage.getItem('cart');
//     if (storedCart) {
//       setCart(JSON.parse(storedCart));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cart));
//   }, [cart]);

//   const addToCart = (product, quantity = 1) => {
//     setCart((prev) => {
//       const existingItem = prev.find((item) => item.id === product.id);
//       if (existingItem) {
//         return prev.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + quantity }
//             : item
//         );
//       }
//       return [...prev, { ...product, quantity }];
//     });
//   };

//   const removeFromCart = (id) => {
//     setCart((prev) => prev.filter((item) => item.id !== id));
//   };

//   const updateQuantity = (id, quantity) => {
//     setCart((prev) =>
//       prev.map((item) =>
//         item.id === id ? { ...item, quantity: Number(quantity) } : item
//       )
//     );
//   };

//   const clearCart = () => {
//     setCart([]);
//   };

//   return (
//     <CartContext.Provider
//       value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };


// =========================================================
// =========================================================
// =========================================================



// src/context/CartContext.js
"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Load the cart from localStorage when the component mounts
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Helper function to create a unique identifier for each cart item
  const getItemKey = (item) => {
    return `${item.id}`; // Assuming 'id' is unique per variant
  };

  // Add an item to the cart
  const addToCart = (item, quantity = 1) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => getItemKey(cartItem) === getItemKey(item)
      );

      if (existingItemIndex !== -1) {
        // Item exists, increment quantity
        console.log(prevCart,cart)
        const updatedCart = [...prevCart];
        console.log(updatedCart[existingItemIndex].quantity)
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      } else {
        // Item doesn't exist, add to cart with initial quantity
        return [...prevCart, { ...item, quantity }];
      }
    });
  };

  // Remove one instance of an item from the cart
  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => getItemKey(cartItem) === id
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        if (updatedCart[existingItemIndex].quantity > 1) {
          // Decrement quantity
          updatedCart[existingItemIndex].quantity -= 1;
        } else {
          // Remove item from cart
          updatedCart.splice(existingItemIndex, 1);
        }
        return updatedCart;
      }
      return prevCart;
    });
  };

  // Update the quantity of an item in the cart
  const updateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        getItemKey(item) === id
          ? { ...item, quantity: parseInt(quantity, 10) }
          : item
      )
    );
  };

  // Clear the cart entirely
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to access the cart context
export function useCart() {
  return useContext(CartContext);
}
