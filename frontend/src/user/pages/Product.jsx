import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

function Product() {
  //Get Params of http://localhost:5173/product/aaaab >> aaaab from App router path="/product/:productId"
  const { productId } = useParams();

  const { products, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const { currency } = useContext(ShopContext);

  // use useRef to Scroll to Element
  const sectionRef = useRef(null);

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id == productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };
  const scrollToSection = () => {
    sectionRef.current.scrollIntoView({
      behavior: "smooth", // cuộn mượt
      block: "start", // cuộn tới đầu phần tử
    });
  };
  useEffect(() => {
    fetchProductData();
  }, [productId]);

  return productData ? (
    <div
      ref={sectionRef}
      className="border-t-2 transition-opacity ease-in-out duration-500 opacity-100"
    >
      {/* Product Data */}
      <div className="mt-8 flex gap-5 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-hidden overflow-x-auto sm:overflow-y-scroll justify-between">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt=""
              />
            ))}
          </div>
          <div className="w-full">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>
        {/* Product Information */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="items-center flex gap-1 mt-2">
            <img className="w-3" src={assets.star_icon} alt="" />
            <img className="w-3" src={assets.star_icon} alt="" />
            <img className="w-3" src={assets.star_icon} alt="" />
            <img className="w-3" src={assets.star_icon} alt="" />
            <img className="w-3" src={assets.star_dull_icon} alt="" />
            <p className="pl-2">(122)</p>
          </div>
          <p className=" mt-5 text-3xl font-medium">
            {currency} {productData.price}
          </p>
          <p className="mt-5 font-medium">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border border-gray-300 p-3 ${
                    item === size ? "bg-black text-white" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
            <button
              onClick={() => addToCart(productData._id, size)}
              className="bg-black text-white p-3 m-3 active:bg-gray-400 "
            >
              ADD TO CART
            </button>

            <div
              class="text-sm text-gray-500 mt-5 flex flex-col gap-1"
              bis_skin_checked="1"
            >
              <p>100% Original product.</p>
              <p>Cash on delivery is available on this product.</p>
              <p>Easy return and exchange policy within 7 days.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-20" bis_skin_checked="1">
        <div class="flex" bis_skin_checked="1">
          <b class="border px-5 py-3 text-sm">Description</b>
          <p class="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div
          class="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500"
          bis_skin_checked="1"
        >
          <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence. E-commerce
            websites have gained immense popularity due to their convenience,
            accessibility, and the global reach they offer.
          </p>
          <p>
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors). Each product usually has its own
            dedicated page with relevant information.
          </p>
        </div>
      </div>
      {/* Related product */}
      <div className="mt-24">
        <div className="text-center text-3xl">
          <Title text1={"RELATED"} text2={"PRODUCTS"} />
        </div>
        {/* Related product list */}
        <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mt-2">
          {products
            //Filter related product using categories and limit 5 items
            .filter((item) => item.category === productData.category)
            .slice(0, 5)
            .map((prd, index) => (
              <ProductItem
                session={sectionRef}
                key={index}
                name={prd.name}
                id={prd._id}
                price={prd.price}
                image={prd.image}
              />
            ))}
          {/*  */}
        </div>
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
}

export default Product;
