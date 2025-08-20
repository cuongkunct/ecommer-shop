import React from "react";
import { assets } from "../assets/assets";

function Hero() {
  return (
    <div className="flex flex-col lg:flex-row border border-gray-500">
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center py-10 lg:py-0">
        <div className="flex items-center">
          <p className="w-12 h-0 border border-gray-500"></p>
          <p className="font-mono">OUR BESTSELLERS</p>
        </div>
        <h1 className="font-mono font-bold text-2xl">Latest Arrivals</h1>
        <div className="flex items-center">
          <p className="font-mono">SHOP NOW</p>
          <p className="w-12 h-0 border border-gray-500"></p>
        </div>
      </div>

      <img src={assets.hero_img} className="w-full lg:w-1/2" alt="" />
    </div>
  );
}

export default Hero;
