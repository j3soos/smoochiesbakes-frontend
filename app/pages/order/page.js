import React from "react";
import Header from "../../components/header";



export default function OrderPage(){
    return (
        <main className=" bg-white h-full min-h-screen">
            <Header />

            <div className="bg-amber-800 text-center py-1">
                Select From Our Variety of Products!
            </div>

            <div className="grid grid-cols-3 md:grid-cols-6 pt-10 gap-5 px-8">

                <div className="justify-self-center text-center space-y-2">
                    <div className="bg-[url('/order_page/bananacake.jpg')] rounded-lg w-36 h-36">
                        
                    </div>
                    <div className="">
                        some text here
                    </div>
                </div>

                <div className="">
                    wagauan
                </div>
                <div className="">
                    wagauan
                </div>
                <div className="">
                    wagauan
                </div>
                <div className="">
                    wagauan
                </div>
                <div className="">
                    wagauan
                </div>
            </div>

        </main>
    )
}