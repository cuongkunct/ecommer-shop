import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

function ProductItem({ session, id, image, name, price }) {
  const { currency } = useContext(ShopContext);

  //Scroll to element when clicking the related product at product details page
  const scrollToSection = () => {
    session.current.scrollIntoView({
      behavior: "smooth", // cuộn mượt
      block: "start", // cuộn tới đầu phần tử
    });
  };

  return (
    <Link className="text-gray-1000 cursor-pointer" to={`/product/${id}`}>
      <div className="group relative overflow-hidden">
        <img
          onClick={() => scrollToSection()}
          className="hover:scale-150 transition ease-linear"
          src={image[0]}
          alt=""
        />

        <p className="pt-5 pb-1 text-sm font-medium">{name}</p>
        <p className="text-sm font-medium">
          {currency} {price}
        </p>
        <div className="absolute inset-y-0 right-0  p-2  opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <img className="w-10" src={assets.heart} alt="" />
        </div>
      </div>
    </Link>
  );
}

export default ProductItem;
