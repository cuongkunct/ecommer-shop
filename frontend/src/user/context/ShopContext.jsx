import { createContext, useEffect, useState } from "react";
import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

//Define useContext
const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItem, setCartItem] = useState({});
  const [products, setProducts] = useState([]);

  localStorage.setItem("cartItem", cartItem);

  const navigate = useNavigate();
  // Handle Add to Cart Function
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    let cartData = structuredClone(cartItem);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItem(cartData);
  };

  //Get cartCount
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalCount += cartItem[items][item];
          }
        } catch (err) {
          console.log("error: ", err);
        }
      }
    }
    return totalCount;
  };

  // Update quantity [Delete / Remove ProductItem in Cart Page]
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItem);
    cartData[itemId][size] = quantity;
    setCartItem(cartData);
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItem) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalAmount += itemInfo.price * cartItem[items][item];
          }
        } catch (err) {
          console.log("err getCartAmount: ", err);
        }
      }
    }
    return totalAmount;
  };

  useEffect(() => {
    console.log(cartItem);
  }, [cartItem]);
  const getProducts = async () => {
    try {
      const res = await axios.post(backendUrl + "/api/product/listProduct");
      console.log(res);
      if (res.data.status === "success") {
        setProducts(res.data.products);
      }
    } catch (error) {
      toast.error("Error when fetching products!");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ShopContext.Provider
      value={{
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItem,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
