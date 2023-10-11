// import React, { useState } from "react";
import Header from "./components/header";
import Image from "next/image";

export default function Home() {
  const carouselImages = [
    "/landing_page/carousel01.jpeg",
    "/landing_page/carousel02.jpeg",
    "/landing_page/carousel03.jpeg",
  ];

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />
      <div className="flex flex-col w-full h-[60vh] fit relative">
        <div className="flex transition-transform ease-in-out duration-300 transform">
          <div className="w-full">
            <img
              src="/landing_page/carousel01.jpeg"
              alt=""
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
