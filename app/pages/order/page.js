import React from "react";
import Header from "../../components/header";

export default function OrderPage() {
  return (
    <main className=" bg-white h-full min-h-screen">
      <Header />

      <div className="bg-amber-800 text-center py-1">
        Select From Our Variety of Products!
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 pt-10 gap-5 px-8 font-serif font-thin">
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
    </main>
  );
}
