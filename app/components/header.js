import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";



export default function Header() {
  return (
    <div className="flex flex-col sticky top-0">
      {/*Dark top bar    */}
      <div className="bg-black w-screen h-fit text-center text-sm text-white font-extralight py-1">
        ORDER YOUR CAKES HERE
      </div>

      {/*Light top bar */}
      <div className="bg-white w-screen h-fit text-black py-6 px-2 font-normal text-base">
        <div className="flex flex-row items-center">

          <div className="basis-1/3">
            <div className="flex flex-row">
              <div className="basis-1/2 text-center">
                <a href="/pages/order">ORDER ONLINE</a>
              </div>
              <div className="basis-1/2 text-center">
                <a href="/pages/order">GROCERY</a>
              </div>
            </div>
          </div>

          {/* Put logo here */}
          <div className="basis-1/3 text-center">
            <a href="/">
                <FontAwesomeIcon className="bg-gray-300 text-white rounded-full text-xl p-6" icon={faCheck} />
            </a>
          </div>

          <div className="basis-1/3">
            <div className="flex flex-row">
              <div className="basis-1/2 text-center">
                <a href="/pages/order">ABOUT US</a>
              </div>
              <div className="basis-1/2 text-center">
                <a href="/pages/order">GROUP OF ICONS</a>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
