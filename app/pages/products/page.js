import React from "react";
import Header from "../../components/header";

export default function OrderPage() {
  const products = {
    fullcakes: [
      {
        _id: "652c627ef862bc8c735ff010",
        name: "6 inches 2 layers",
        category: "Full Cakes",
        price: 200,
        __v: 0,
      },
      {
        _id: "652c778b8b20a9e9c1de9db3",
        name: "6 inches 3 layers",
        category: "Full Cakes",
        price: 255,
        __v: 0,
      },
      {
        _id: "652c77a28b20a9e9c1de9db5",
        name: "8 inches 2 layers",
        category: "Full Cakes",
        price: 255,
        __v: 0,
      },
      {
        _id: "652c77bd8b20a9e9c1de9db7",
        name: "8 inches 3 layers",
        category: "Full Cakes",
        price: 305,
        __v: 0,
      },
      {
        _id: "652c77cb8b20a9e9c1de9db9",
        name: "10 inches 2 layers",
        category: "Full Cakes",
        price: 355,
        __v: 0,
      },
      {
        _id: "652c77e48b20a9e9c1de9dbb",
        name: "12 inches 2 layers",
        category: "Full Cakes",
        price: 405,
        __v: 0,
      },
      {
        _id: "652c78018b20a9e9c1de9dbd",
        name: "Double Number Cake",
        category: "Full Cakes",
        price: 325,
        __v: 0,
      },
    ],
    bananacakes: [
      {
        _id: "652c787d354349fb5629a7cb",
        name: "Classic Banana Cake",
        category: "Banana Cakes",
        price: 50,
        __v: 0,
      },
      {
        _id: "652c78cf354349fb5629a7cf",
        name: "Raisin Banana Cake",
        category: "Banana Cakes",
        price: 50,
        __v: 0,
      },
    ],
    cupcakes: [
      {
        _id: "652c7a12354349fb5629a7d1",
        name: "Chocolate Cupcake",
        category: "Cupcakes",
        price: 3.5,
        __v: 0
    },
    {
        _id: "652c7a2f354349fb5629a7d3",
        name: "Vanilla Cupcake",
        category: "Cupcakes",
        price: 3.5,
        __v: 0
    },
    {
        _id: "652c7a44354349fb5629a7d5",
        name: "Strawberry Cupcake",
        category: "Cupcakes",
        price: 4.0,
        __v: 0
    },
    ],
  };

  return (
    <main className=" bg-white h-full min-h-screen font-serif">

      <Header />

      <div className="flex flex-row bg-[#FBA1B7] justify-center text-center py-1 text-white font-light font-sans">
        {`Welcome to Smoochies Bakes. This our easy order/grab and go portal. For
        customized orders, kindly WhatsApp 0554181995/0247069070.`}
      </div>

      {/* select products (full cakes) */}
      <div className="flex flex-col content-center justify-center text-center w-screen bg-contain h-fit gap-10 py-12">
        <div className="text-3xl">Full Cakes</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5 lg:px-8 font-thin">
          {products.fullcakes.map((item, name) => (
            <div key={name} className="flex flex-col gap-3 justify-self-center text-center">
              <div className="bg-[url('/order_page/pastries.jpg')] bg-cover bg-no-repeat rounded-lg w-52 h-48 transition-all hover:scale-105"></div>
              <div className="">{item.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* select products (banana cakes)*/}
      <div className="bg-[#FBA1B7] flex flex-col content-center justify-center text-center w-screen bg-contain h-fit gap-10 py-16">
        <div className="text-3xl">Banana Cakes</div>
        <div className="grid grid-cols-2 lg:gap-5 lg:px-8 font-thin">
          {products.bananacakes.map((item, name) => (
            <div key={name} className="flex flex-col gap-3 content-center items-center align-middle justify-self-center text-center">
              <div className={`bg-[url('/order_page/pastries.jpg')] bg-cover bg-no-repeat rounded-lg w-72 h-60 transition-all hover:scale-105`}></div>
              <div className="">{item.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* select products (cupcakes)*/}
      <div className="flex flex-col content-center justify-center text-center w-screen bg-contain h-fit gap-10 py-16">
        <div className="text-3xl">Cupcakes</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:gap-5 lg:px-8 font-thin">
          {products.cupcakes.map((item, name) => (
            <div key={name} className="flex flex-col gap-3 content-center items-center align-middle justify-self-center text-center">
              <div className="bg-[url('/order_page/pastries.jpg')] bg-cover bg-no-repeat rounded-lg w-52 h-48 transition-all hover:scale-105"></div>
              <div className="">{item.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[url(/patterns/pattern02.jpg)] bg-contain text-center content-center justify-center items-center align-middle text-white h-80">
        FOOTER HERE WAI
      </div>
    </main>
  );
}
