"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import {
  FaTimes,
  FaBars,
  FaSearch,
  FaUser,
  FaShoppingBag,
} from "react-icons/fa";

import CartModal from "./CartModal"; // Add the CartModal component

export default function Navbar() {
  const { cart } = useCart();
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const toggleCartModal = () => setIsCartOpen(!isCartOpen); //

  return (
    <>
      {/* Navbar */}
      <nav className="navbar h-16 flex items-center px-4 bg-white fixed top-0 left-0 right-0 z-40">
        <div className="flex justify-center align-middle w-full px-2 sm:px-8 ">
          {/* Hamburger Button */}
          <div className="flex-1 flex text-left">
            <button
              className="text-black focus:outline-none"
              onClick={toggleSidebar}
            >
              {isOpen ? (
                <FaTimes className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              ) : (
                <FaBars className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              )}
            </button>
          </div>

          <div className="flex-1 text-center text-black flex items-center justify-center italic">
            <Link
              href="/"
              className="text-2xl sm:text-4xl text-black font-bold"
            >
              Stylzzy
            </Link>
          </div>

          <div className="flex-1 flex justify-end text-black gap-4 items-center">
            <div className="hidden md:flex items-center bg-white border border-black px-3 py-2 rounded">
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent text-black placeholder-gray-700 focus:outline-none"
              />
              <button className="ml-2 text-gray-400 hover:text-white">
                <FaSearch className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4" />
              </button>
            </div>

            <Link href="/account" className="text-2xl flex items-center">
              <FaUser className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </Link>

            {/* Cart Button with Modal */}
            <button
              onClick={toggleCartModal}
              className="flex text-2xl items-center"
            >
              <FaShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              {itemCount > 0 && (
                <span className="ml-2 bg-red-500 rounded-full text-xs px-2">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Background Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-16 left-0 h-[calc(100%-4rem)] overflow-hidden transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0 w-full md:w-1/4" : "-translate-x-full w-0"
        } bg-black`}
      >
        <div className="p-6">
          <ul className="space-y-4 font-light">
            <li className="text-white text-base">
              <div className="font-bold my-3 border-b">SHOP ALL</div>
              <ul className="flex flex-col gap-3">
                <li className="text-white text-base font-extralight">
                  <Link href="/contact" onClick={closeSidebar}>
                    OVERSIZED T-SHIRTS
                  </Link>
                </li>
                <li className="text-white text-base font-extralight">
                  <Link href="/contact" onClick={closeSidebar}>
                    SLIM FIT T-SHIRTS
                  </Link>
                </li>
              </ul>
            </li>

            <li className="text-white text-base">
              <div className="font-bold my-3 mt-6 border-b">RESOURCES</div>
              <ul className="flex flex-col gap-2">
                <li className="text-white text-base font-extralight ">
                  <Link href="/contact" onClick={closeSidebar}>
                    About
                  </Link>
                </li>
                <li className="text-white text-base font-extralight">
                  <Link href="/contact" onClick={closeSidebar}>
                    Contact Us
                  </Link>
                </li>

                <li className="text-white text-base font-extralight">
                  <Link href="/policy" onClick={closeSidebar}>
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

          {/* Search Box - Visible on mobile */}
          <div className="block md:hidden mt-6">
            <div className="flex items-center bg-white border border-black px-3 py-2 rounded">
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent text-black placeholder-gray-700 focus:outline-none w-full"
              />
              <button className="ml-2 text-gray-400 hover:text-white">
                <FaSearch className="w-4 h-4 sm:w-3 sm:h-3 md:w-4 md:h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Cart Modal */}
      {isCartOpen && (
        <CartModal className="m-5 bg-black" closeModal={toggleCartModal} />
      )}
    </>
  );
}
