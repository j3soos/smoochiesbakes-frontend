// import React, { useState } from "react";
import Header from "./components/header";
import Link from "next/link";

export default function Home() {
  const carouselImages = [
    "/landing_page/carousel01.jpeg",
    "/landing_page/carousel02.jpeg",
    "/landing_page/carousel03.jpeg",
  ];

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />
      <div className="flex-col w-full h-[100vh] bg-cover bg-no-repeat bg-[url('/landing_page/carousel01.jpeg')]">
        <div className="flex flex-row h-full">
          <div className="flex basis-1/2 w-full items-center justify-center">
            <div className="flex-col w-[60vh] h-[55vh] bg-white p-4 py-14 rounded-lg bg-opacity-60 text-black space-y-6">
              <div className="flex flex-row justify-center text-3xl text-center font-serif">
                Chocolate Chip Cupcakes <br />
                Back For A Limited
                <br />
                Time!
              </div>
              <div className="flex flex-row font-light text-center font-serif pb-9">
                Indulge in the delightful return of our Chocolate Chip Cupcakes,
                available for a limited time. Treat yourself to the rich,
                chocolaty goodness you've been craving.
              </div>
              <div className="flex flex-row justify-center">
                <Link href="pages/order">
                  <button className="rounded-lg bg-black bg-opacity-30 py-3 px-5 font-bold border-2 border-black hover:text-amber-900 hover:bg-slate-300">
                    Order Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
