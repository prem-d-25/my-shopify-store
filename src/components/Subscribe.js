"use client";
import { useState } from "react";

const Subscribe = () => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e) => setInputValue(e.target.value);
  return (
    <div className="flex justify-center px-3 sm:px-20 w-full">
      <div
        // className={`flex items-center border border-gray-300 rounded-lg overflow-hidden w-full
        //     ${
        //       isFocused
        //         ? "ring-2 ring-gray-500"
        //         : "focus-within:ring-2 focus-gray:ring-gray-400"
        //     }`}
        className="flex-grow flex flex-row w-fit border border-black rounded-lg overflow-hidden"
      >
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          placeholder="Enter your mail here"
          onBlur={() => setIsFocused(false)}
          className="flex-grow px-4 py-3 text-sm focus:outline-none"
        />
        <button className="px-5 w-fit bg-gray-700 text-white py-3 hover:bg-gray-800 transition duration-300">
          GO
        </button>
      </div>
    </div>
  );
};

export default Subscribe;
