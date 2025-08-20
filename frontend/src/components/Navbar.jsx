import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

function Navbar() {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, navigate } = useContext(ShopContext);
  return (
    <>
      <div className=" flex items-center justify-between py-5 font-medium">
        <Link to="/">
          {" "}
          <img src={assets.logo} className="w-36" alt="Logo" />
        </Link>
        <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
          <NavLink to="/" className="flex flex-col items-center gap-1">
            <p>HOME</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink
            to="/collection"
            className="flex flex-col items-center gap-1"
          >
            <p>COLLECTION</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink to="/about" className="flex flex-col items-center gap-1">
            <p>ABOUT</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink to="/contact" className="flex flex-col items-center gap-1">
            <p>CONTACT</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        </ul>

        <div className="flex items-center gap-6">
          <img
            onClick={() => setShowSearch(true)}
            src={assets.search_icon}
            className="w-5 cursor-pointer"
            alt=""
          />
          <div className="group relative">
            <img
              onClick={() => navigate("/login")}
              src={assets.profile_icon}
              className="w-5 cursor-pointer"
              alt=""
            />
            <div className="hidden group-hover:block absolute right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-gray-100 text-gray-600 rounded-xl">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p className="cursor-pointer hover:text-black">Order</p>
                <p className="cursor-pointer hover:text-black">Logout</p>
              </div>
            </div>
          </div>
          <Link to="/cart" className="relative">
            <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white rounded-full aspect-square text-[8px]">
              {getCartCount()}
            </p>
          </Link>
          <img
            onClick={() => setVisible(!visible)}
            src={assets.menu_icon}
            className="w-5 cursor-pointer lg:hidden"
            alt=""
          />
        </div>
      </div>
      {visible && (
        <div className="relative">
          <div className="absolute w-full bg-white flex flex-col shadow-lg ">
            <NavLink
              onClick={() => setVisible(false)}
              to="/"
              className="border-b-gray-500 border-2 py-2 px-10 hover:bg-black hover:text-white"
            >
              HOME
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              to="/collection"
              className="border-b-gray-500 border-2 py-2 px-10 hover:bg-black hover:text-white"
            >
              COLLECTION
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              to="/about"
              className="border-b-gray-500 border-2 py-2 px-10 hover:bg-black hover:text-white"
            >
              ABOUT
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              to="/contact"
              className="border-b-gray-500 border-2 py-2 px-10 hover:bg-black hover:text-white"
            >
              CONTACT
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
