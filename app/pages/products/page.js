import React from "react";
import Header from "../../components/header";

export default function OrderPage() {
  const products = [
    {
      name: "",
      variant: "",
      price: "",
      category: "",
    },
  ];

  return (
    <main className=" bg-white h-full min-h-screen font-serif ">
      <Header />

      <div className="bg-amber-800 text-center py-1 text-white">
        Select From Our Variety of Products!
      </div>

      {/* first grid of products */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 py-20 gap-5 px-8 font-thin">
        <div className="justify-self-center text-center space-y-2">
          <div className="bg-[url('/order_page/cheesecake.jpg')] bg-cover bg-no-repeat rounded-lg w-36 h-36 transition-all hover:scale-105"></div>
          <div className="">Cheese Cakes</div>
        </div>

        <div className="justify-self-center text-center space-y-2">
          <div className="bg-[url('/order_page/cupcakes.jpg')] bg-cover bg-no-repeat rounded-lg w-36 h-36 transition-all hover:scale-105"></div>
          <div className="">Cupcakes</div>
        </div>
        <div className="justify-self-center text-center space-y-2">
          <div className="bg-[url('/order_page/cookies.jpg')] bg-cover bg-no-repeat rounded-lg w-36 h-36 transition-all hover:scale-105"></div>
          <div className="">Cookies</div>
        </div>
        <div className="justify-self-center text-center space-y-2">
          <div className="bg-[url('/order_page/donuts.jpg')] bg-cover bg-no-repeat rounded-lg w-36 h-36 transition-all hover:scale-105"></div>
          <div className="">Donuts</div>
        </div>
        <div className="justify-self-center text-center space-y-2">
          <div className="bg-[url('/order_page/pastries.jpg')] bg-cover bg-no-repeat rounded-lg w-36 h-36 transition-all hover:scale-105"></div>
          <div className="">Pastries</div>
        </div>
        <div className="justify-self-center text-center space-y-2">
          <div className="bg-[url('/order_page/bananacake.jpg')] bg-cover bg-no-repeat rounded-lg w-36 h-36 transition-all hover:scale-105"></div>
          <div className="">Banana Cakes</div>
        </div>
      </div>

      {/* bg design thingy */}
      <div className="flex flex-col content-center justify-center text-center bg-[url(/patterns/pattern01.jpeg)] w-screen bg-contain h-56 mb-10">
        <div className="text-3xl">Get Same Day Pickup or Delivery</div>
        <div className="lg:text-lg font-thin underline">Order Now</div>
      </div>

      {/* select products (fullcakes)*/}
      <div className="flex flex-col pt-10">
        <div className="flex-row text-4xl text-center">
          WORLDS FAMOUS FULL CAKES
        </div>
        <div className="flex-row underline text-center font-bold font-mono pb-7">
          VIEW MORE
        </div>
        <div className="grid grid-cols-3 pt-2 px-10 justify-center">
          <div className="justify-self-center text-center space-y-2">
            <div className="bg-[url('/order_page/bananacake.jpg')] bg-cover bg-no-repeat rounded-lg w-56 h-52 transition-all hover:scale-105"></div>
            <div className="">Banana Cakes</div>
          </div>
          <div className="justify-self-center text-center space-y-2">
            <div className="bg-[url('/order_page/bananacake.jpg')] bg-cover bg-no-repeat rounded-lg w-56 h-52 transition-all hover:scale-105"></div>
            <div className="">Banana Cakes</div>
          </div>
          <div className="justify-self-center text-center space-y-2">
            <div className="bg-[url('/order_page/bananacake.jpg')] bg-cover bg-no-repeat rounded-lg w-56 h-52 transition-all hover:scale-105"></div>
            <div className="">Banana Cakes</div>
          </div>
        </div>
      </div>

      {/* select products (pastries)*/}
      <div className="flex flex-col mt-32 bg-opacity-70 bg-blue-800 py-20">
        <div className="flex-row text-4xl text-center">
          WORLDS FAMOUS FULL CAKES
        </div>
        <div className="flex-row underline text-center font-bold font-mono pb-7">
          VIEW MORE
        </div>
        <div className="grid grid-cols-2 pt-2 px-10">
          <div className="justify-self-center text-center space-y-2">
            <div className="bg-[url('/order_page/buns.jpg')] bg-cover bg-no-repeat rounded-lg w-56 h-52 transition-all hover:scale-105"></div>
            <div className="">Banana Cakes</div>
          </div>
          <div className="justify-self-center text-center space-y-2">
            <div className="bg-[url('/order_page/hotdogs.jpg')] bg-cover bg-no-repeat rounded-lg w-56 h-52 transition-all hover:scale-105"></div>
            <div className="">Banana Cakes</div>
          </div>
        </div>
      </div>

      {/* select products (cupcakes)*/}
      <div className="flex flex-col py-20">
        <div className="flex-row text-4xl text-center">
          WORLDS FAMOUS CUPCAKES
        </div>
        <div className="flex-row underline text-center font-bold font-mono pb-7">
          VIEW MORE
        </div>
        <div className="grid grid-cols-4 pt-2 px-10">
          <div className="justify-self-center text-center space-y-2">
            <div className="bg-[url('/order_page/vanillacupcakes.jpg')] bg-cover bg-no-repeat rounded-lg w-56 h-52 transition-all hover:scale-105"></div>
            <div className="">Banana Cakes</div>
          </div>
          <div className="justify-self-center text-center space-y-2">
            <div className="bg-[url('/order_page/chocolatecupcakes.jpg')] bg-cover bg-no-repeat rounded-lg w-56 h-52 transition-all hover:scale-105"></div>
            <div className="">Banana Cakes</div>
          </div>
          <div className="justify-self-center text-center space-y-2">
            <div className="bg-[url('/order_page/vanillacupcakes.jpg')] bg-cover bg-no-repeat rounded-lg w-56 h-52 transition-all hover:scale-105"></div>
            <div className="">Banana Cakes</div>
          </div>
          <div className="justify-self-center text-center space-y-2">
            <div className="bg-[url('/order_page/chocolatecupcakes.jpg')] bg-cover bg-no-repeat rounded-lg w-56 h-52 transition-all hover:scale-105"></div>
            <div className="">Banana Cakes</div>
          </div>
        </div>
      </div>

      <div className="bg-black text-center content-center justify-center items-center align-middle text-white h-80">
        FOOTER HERE WAI
      </div>

    </main>
  );
}
