"use client";

import { useQuery } from "@apollo/client";
import { GET_PRODUCT_BY_HANDLE } from "@/queries/getProductByHandle";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Card from "@/components/Card"; // Importing your Card component
import MarqueeSlider from "@/components/MarqueeSlider";
import { GET_COLLECTION_PRODUCTS } from "@/queries/getCollectionProducts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShirt,
  faBox,
  faSink,
  faBucket,
  faShare,
} from "@fortawesome/free-solid-svg-icons";

export default function ProductPage({ params }) {
  const { handle } = params;
  const { addToCart } = useCart();
  const collectionHandle = "still-on-your-mind";

  // Query for the product details
  const {
    loading: productLoading,
    error: productError,
    data: productData,
  } = useQuery(GET_PRODUCT_BY_HANDLE, {
    variables: { handle },
    skip: !handle,
  });

  // Query for "still on your mind" products
  const {
    loading: collectionLoading,
    error: collectionError,
    data: collectionData,
  } = useQuery(GET_COLLECTION_PRODUCTS, {
    variables: { handle: collectionHandle, first: 100 },
  });

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [showDescription, setShowDescription] = useState(false);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [showCareInstructions, setShowCareInstructions] = useState(false);
  const [mainImageIndex, setMainImageIndex] = useState(0);

  // Handle loading and error states for product query
  if (productLoading) return <p>Loading product...</p>;
  if (productError) return <p>Error loading product: {productError.message}</p>;

  // Handle loading and error states for collection query
  if (collectionLoading) return <p>Loading collection...</p>;
  if (collectionError)
    return <p>Error loading collection: {collectionError.message}</p>;

  const product = productData?.productByHandle;

  const handleAddToCart = () => {
    if (!selectedVariant) {
      alert("Please select a variant");
      return;
    }

    const variant = product.variants.edges.find(
      ({ node }) => node.id === selectedVariant.id // Adjusted to use selectedVariant.id
    );

    const item = {
      id: variant.node.id,
      title: product.title,
      variantTitle: variant.node.title,
      price: variant.node.priceV2.amount,
      currency: variant.node.priceV2.currencyCode,
      image: product.images.edges[0]?.node.src,
      handle: product.handle,
    };

    addToCart(item, 1);
  };

  return (
    <div className="bg-white">
      {/* {console.log(collectionData)} */}
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row">
          {/* Main Image Section */}
          {/* fordesktop screens */}
          <div className="relative w-full mb-4 md:w-1/2 hidden sm:block">
            <img
              src={product.images.edges[mainImageIndex]?.node.src}
              alt={
                product.images.edges[mainImageIndex]?.node.altText ||
                product.title
              }
              className="w-full h-auto mx-auto"
            />

            {/* Thumbnail Images with Horizontal Scroll */}
            <div className="flex space-x-4 overflow-x-auto no-scrollbar mt-4">
              {product.images.edges.map(({ node }, index) => (
                <div
                  key={node.src}
                  className={`flex-none w-1/5 cursor-pointer mx-1 ${
                    mainImageIndex === index ? "border-2 border-gray-700" : ""
                  }`}
                  onClick={() => setMainImageIndex(index)} // Change main image
                >
                  <img
                    src={node.src}
                    alt={node.altText || node.title}
                    className="w-full h-auto object-cover rounded"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* for mobile screens */}
          <div className="block md:hidden mt-4">
            <div className="flex overflow-x-auto snap-x snap-mandatory">
              {product.images.edges.map(({ node }, index) => (
                <div
                  key={node.src}
                  className="snap-center flex-none w-full cursor-pointer"
                  onClick={() => setMainImageIndex(index)} // Change main image
                >
                  <img
                    src={node.src}
                    alt={node.altText || product.title}
                    className="w-full h-auto object-cover rounded"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="md:w-1/2 md:pl-8 md:p-2 p-4 text-black">
            <div className="sticky top-0">
              <h1 className="text-lg sm:text-3xl font-bold mb-1 sm:mb-4">
                {product.title}
              </h1>
              <div className="flex items-center font-base mt-2 text-base sm:text-lg mb-1 sm:mb-4">
                <span className="font-semibold text-black-600">
                  ₹{product.priceRange.minVariantPrice.amount}
                </span>
                <span className="ml-2 text-gray-500">
                  {product.priceRange.minVariantPrice.currencyCode}
                </span>
              </div>

              <div className="mb-4">
                <p className="block mb-2 font-semibold text-sm sm:text-lg">
                  Select Size:
                </p>
                <div className="flex flex-wrap gap-2 text-sm sm:text-lg">
                  {product.variants.edges.map(({ node }) => (
                    <button
                      key={node.id}
                      onClick={() => setSelectedVariant(node)}
                      className={`border p-1 sm:p-2 sm:px-3 rounded-md transition-colors duration-200 min-w-[90px] 
                ${
                  selectedVariant === node
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }
                hover:bg-black hover:text-white`}
                    >
                      {node.title}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <button
                  onClick={handleAddToCart}
                  className="glare-button bg-black text-white text-sm font-bold uppercase px-2 py-4 sm:px-4 sm:py-5 w-full sm:w-3/5 rounded-lg transition duration-300 transform hover:bg-black hover:scale-102"
                >
                  Add to Cart
                </button>
              </div>

              {/* Description and Details Section */}
              <div className="mt-7 p-3 border border-t-0 border-x-0 border-gray-300 ">
                <div
                  className="flex items-center justify-between w-full cursor-pointer"
                  onClick={() => setShowDescription(!showDescription)}
                >
                  <span className="text-gray-800 text-md font-medium flex items-center">
                    <FontAwesomeIcon className="mr-3" icon={faShirt} />
                    DESCRIPTION
                  </span>
                  <button className="text-gray-300 text-2xl">
                    {showDescription ? "−" : "+"}
                  </button>
                </div>
                {showDescription && (
                  <p className="mt-4 text-gray-400">
                    {product.descriptionHtml}
                  </p>
                )}
              </div>

              <div className="p-3 border border-t-0 border-x-0 border-gray-300 ">
                <div
                  className="flex items-center justify-between w-full cursor-pointer"
                  onClick={() => setShowProductDetails(!showProductDetails)}
                >
                  <span className="text-gray-800 text-md font-medium flex items-center">
                    <FontAwesomeIcon className="mr-3" icon={faBox} />
                    PRODUCT DETAILS
                  </span>
                  <button className="text-gray-300 text-2xl">
                    {showProductDetails ? "−" : "+"}
                  </button>
                </div>
                {showProductDetails && (
                  <p className="mt-4 text-gray-400">{product.detailsHtml}</p>
                )}
              </div>

              <div className="p-3 border border-t-0 border-x-0 border-gray-300 ">
                <div
                  className="flex items-center justify-between w-full cursor-pointer"
                  onClick={() => setShowCareInstructions(!showCareInstructions)}
                >
                  <span className="text-gray-800 text-md font-medium flex items-center">
                    <FontAwesomeIcon className="mr-3" icon={faBucket} />
                    CARE INSTRUCTION
                  </span>
                  <button className="text-gray-300 text-2xl">
                    {showCareInstructions ? "−" : "+"}
                  </button>
                </div>
                {showCareInstructions && (
                  <p className="mt-4 text-gray-400">
                    {product.careInstructionsHtml}
                  </p>
                )}
              </div>

              {/* Share Section */}
              <div className="flex p-3">
                <span className="text-gray-800 text-sm font-small flex items-center">
                  <FontAwesomeIcon icon={faShare} className="mr-2" /> SHARE
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-12"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          <div className="w-full h-auto">
            <img
              src={product.images.edges[0].node.src}
              alt="Main Image"
              className="w-full h-full object-cover mx-auto"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {product.images.edges.slice(1, 5).map(({ node }) => (
              <div key={node.src} className="w-full aspect-w-1 aspect-h-1">
                <img
                  src={node.src}
                  alt={node.altText || "Product Image"}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="h-12"></div>
      </div>

      <MarqueeSlider />

      {/* <h1 className="text-4xl font-bold my-8 text-black text-center">
        STILL ON YOUR MIND
      </h1> */}

      {/* {console.log(collectionData)} */}

      {/* Display "still on your mind" products */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 pb-5 md:px-32">
        {collectionData?.collectionByHandle.products.edges.map(({ node }) => (
          <Card node={node} key={node.id} />
        ))}
      </div> */}

      <div className="pb-10">
        <h1 className="text-2xl font-extrabold p-8 px-4 text-black uppercase sm:px-32 sm:text-5xl">
          STILL ON YOUR MIND
        </h1>

        {/* Product Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 px-4 md:px-32">
          {collectionData?.collectionByHandle.products.edges.map(({ node }) => (
            <Card node={node} key={node.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
