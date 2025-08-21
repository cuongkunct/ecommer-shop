import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./user/pages/Home";
import About from "./user/pages/About";
import Collection from "./user/pages/Collection";
import Contact from "./user/pages/Contact";
import Product from "./user/pages/Product";
import Login from "./user/pages/Login";
import PlaceOrder from "./user/pages/PlaceOrder";
import Orders from "./user/pages/Orders";
import Carts from "./user/pages/Carts";
import Navbar from "./user/components/Navbar";
import SearchBar from "./user/components/SearchBar";
import Footer from "./user/components/Footer";
import { ToastContainer } from "react-toastify";
//Admin
import LoginAdmin from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";
export const backendUrl = import.meta.env.VITE_BACKEND_URL;
const App = () => {
  const location = useLocation();

  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  // Kiểm tra nếu path bắt đầu bằng "/admin"
  const isAdminPage = location.pathname.startsWith("/admin");

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  const PrivateRoute = ({ element }) => {
    return token !== "" ? element : <LoginAdmin setToken={setToken} />;
  };

  return (
    <>
      {!isAdminPage ? (
        <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
          <ToastContainer />

          <Navbar />
          <SearchBar />
          <Routes>
            {/* User routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/login" element={<Login />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/cart" element={<Carts />} />

            {/* Admin routes */}
          </Routes>
          <Footer />
        </div>
      ) : (
        <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
          <Routes>
            <Route path="/admin" element={<LoginAdmin setToken={setToken} />} />
            <Route
              path="/admin/dashboard"
              element={<PrivateRoute element={<Dashboard />} />}
            />
          </Routes>
        </div>
      )}
    </>
  );
};

export default App;
