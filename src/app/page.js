// src/app/page.js
"use client";

import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../queries/getProducts";
import Card from "@/components/Card"; // Importing your Card component
import MarqueeSlider from "@/components/MarqueeSlider";

export default function Home() {
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: { first: 5 },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="w-full bg-white pb-7">
      {console.log(data)}
      {/* Video Section */}
      <MarqueeSlider />

      <div className="w-full h-[calc(100vh-4rem)] bg-black">
        <video
          className="w-full h-full object-cover"
          autoplay
          muted
          loop
          style={{ backgroundColor: "black" }} // Placeholder until video is added
        ></video>
      </div>

      {/* Products Section */}
      <div className="pb-10">
        <h1 className="text-2xl font-extrabold p-3 px-4 text-black uppercase sm:px-32 sm:text-5xl">
          Products
        </h1>

        {/* Product Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 px-4 md:px-32">
          {data.products.edges.map(({ node }) => (
            <Card node={node} key={node.id} />
          ))}
        </div>
      </div>

      <br />

      <div className="pt-10">
        <h1 className="text-2xl font-extrabold p-3 px-4 text-black uppercase sm:px-32 sm:text-5xl">
          HOT PICKS
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 px-4 md:px-32">
          {data.products.edges.slice(0, 3).map(({ node }) => (
            <Card node={node} key={node.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
