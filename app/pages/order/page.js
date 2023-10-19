import React from "react";
import Header from "../../components/header";
import LocationPicker from "@/app/components/locationPicker";

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
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 pt-10 gap-5 px-8 font-thin">
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

      <div className="flex flex-col content-center justify-center text-center bg-[url(/patterns/pattern01.jpeg)] w-screen bg-contain h-44 my-10">
        <div className="text-4xl">Get Same Day Pickup or Delivery</div>
        <div className="lg:text-lg underline">Order Now</div>
      </div>

      {/* select products */}
      <div className="flex flex-col">
        <div className="flex-row text-5xl text-center">
            SELECT PRODUCTS TO ADD TO CART
        </div>
        <LocationPicker />
      </div>



    </main>
  );
}
