import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <div className="flex flex-col w-screen z-10">
      {/*Dark top bar */}
      <div className="bg-black h-fit text-center text-sm text-white font-extralight py-1">
        ORDER YOUR CAKES HERE
      </div>

      {/*Light top bar */}
      <div className="bg-[#FBA1B7] h-fit text-black py-6 px-2 font-normal text-base bg-opacity-20">
        <div className="flex flex-row items-center">
          <div className="basis-1/3">
            {/* <div className="flex flex-row">
              <div className="basis-1/2 text-center">
                <a href="/pages/order">ORDER ONLINE</a>
              </div>
              <div className="basis-1/2 text-center">
                <a href="/pages/order">PRODUCT LIST</a>
              </div>
            </div> */}
          </div>

          {/* Put logo here */}
          <div className="basis-1/3 text-3xl text-center content-center font-medium">
            <a href="/">
              SMOOCHIES BAKES
            </a>
          </div>

          <div className="basis-1/3">
            {/* <div className="flex flex-row">
              <div className="basis-1/2 text-center">
                <a href="/pages/order">ABOUT US</a>
              </div>
              <div className="basis-1/2 text-center">
                <a href="/pages/order">ADMIN LOGIN</a>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
