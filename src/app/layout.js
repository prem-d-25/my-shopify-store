// src/app/layout.js
"use client"; // Required for client-side components

import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apolloClient";
import "@/styles/globals.css";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { Tomorrow } from "next/font/google";

// font
const font = Tomorrow({
  subsets: ["latin"], // Choose subsets or variants
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"], // Include all font weights from 100 to 800
  variable: "--font-inter", // Optional: Add variable name for CSS use
});


//
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>My Shopify Store</title>
        <meta
          name="description"
          content="A headless Shopify storefront built with Next.js"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={font.className}>
        <ApolloProvider client={client}>
          <CartProvider>
            <Navbar />
            <main className="pt-14">{children}</main>
            <Footer />
          </CartProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
