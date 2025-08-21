import React from "react";
import { assets } from "../assets/assets";

function Footer() {
  return (
    <div>
      <div className="flex flex-row mt-20 gap-8 items-center">
        <div className="flex flex-col w-1/2">
          <img className="w-40" src={assets.logo} alt="" />
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row w-1/2 justify-around">
          <div>
            <p className="font-bold text-lg mb-2">COMPANY</p>
            <ul className="flex flex-col gap-1  text-gray-500">
              <li>Home</li>
              <li>About us</li>
              <li>Delivery</li>
              <li>Privacy policy</li>
            </ul>
          </div>
          <div>
            <p className="font-bold text-lg mb-2">GET IN TOUCH</p>
            <ul className="flex flex-col gap-1 text-gray-500">
              <li>+1-000-000-0000</li>
              <li>greatstackdev@gmail.com</li>
              <li>Instagram</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center border-t-2 mt-8 py-2">
        <p>Copyright 2024@ greatstack.dev - All Right Reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
