"use client";
// src/components/ProductCard.js
import Link from "next/link";
import { useState } from "react";

export default function Card({ node }) {
  const [isHovered, setIsHovered] = useState(false);

  const firstImage = node.images.edges[0]?.node.src;
  const secondImage = node.images.edges[1]?.node.src;

  return (
    <div
      className="card-container overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${node.handle}`}>
        {/* Wrapper to control 3:4 aspect ratio */}
        <div
          className="relative w-full overflow-hidden"
          style={{ paddingTop: "120.33%" }} /* 3:4 aspect ratio */
        >
          <img
            src={isHovered && secondImage ? secondImage : firstImage} // Change image on hover
            alt={node.images.edges[0]?.node.altText || node.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform
            duration-500 ease-in-out group-hover:scale-110"
          />
        </div>
        <div className="px-1">
          <h2 className="text-sm font-bold sm:text-lg text-black mt-4 leading-tight sm:leading-normal">
            {node.title}
          </h2>
          <div className="text-gray-600">
            <span className="line-through mr-2 text-sm font-normal sm:text-base leading-tight sm:leading-normal">
              ₹{node.compareAtPrice || 999.0}
            </span>
            <span className="font-bold text-gray-900 text-sm sm:text-base leading-tight sm:leading-normal">
              ₹{node.price || 899.0}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
