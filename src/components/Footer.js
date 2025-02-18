"use client";

import React from "react";
import Subscribe from "./Subscribe";

// src/components/Footer.js
export default function Footer() {
  const footerLinks = [
    "Refund policy",
    "Privacy policy",
    "Terms of service",
    "Shipping policy",
    "Contact information",
  ];

  return (
    <>
      <footer className="bg-white text-black pt-10 border-t w-full">
        <Subscribe />
        <div className="h-8"></div>

        <div className="container mx-auto text-sm font-light sm:text-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-screen-md lg:max-w-none">
            <FooterSection
              title="EVERYTHING"
              items={[
                "Oversized T-shirt",
                "Slim Fit T-shirt",
              ]}
            />
            <FooterSection
              title="MANUAL"
              items={["Contact Us", "Account Page"]}
            />
            <FooterSection
              title="TERMS"
              items={[
                "Privacy Policy",
                "Terms of Service",
              ]}
            />
            <FooterSection
              title="AFTERHOURS"
              items={["Instagram", "Facebook", "Snapchat", "Pinterest"]}
            />
          </div>
        </div>

        <div className="h-8"></div>

        <div className="bg-gray-800 text-white w-full text-center p-2">
          <div className="flex flex-col sm:flex-row text-xs justify-center uppercase">
            © 2024, STYLZZY
            <ul className="flex flex-col sm:flex-row ml-3 gap-x-3 gap-y-1 mt-2 sm:mt-0">
              {footerLinks.map((link, index) => (
                <li key={index} className="hover:underline">
                  · {link} ·
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}

function FooterSection({ title, items }) {
  return (
    <div className="flex justify-center">
      <div className="p-4 w-full max-w-xs">
        <h2 className="font-bold mb-2 text-xl sm:text-2xl">{title}</h2>
        <ul className="space-y-2 text-left font-light">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
