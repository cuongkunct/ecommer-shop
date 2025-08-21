import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Import các trang (pages) của user
import Home from "./user/pages/Home";
import About from "./user/pages/About";
import Collection from "./user/pages/Collection";
import Contact from "./user/pages/Contact";
import Product from "./user/pages/Product";
import Login from "./user/pages/Login";
import PlaceOrder from "./user/pages/PlaceOrder";
import Orders from "./user/pages/Orders";
import Carts from "./user/pages/Carts";

// Import các component chung của user
import Navbar from "./user/components/Navbar";
import SearchBar from "./user/components/SearchBar";
import Footer from "./user/components/Footer";

// Import các trang của admin
import LoginAdmin from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";

// Lấy URL backend từ biến môi trường (.env)
export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const location = useLocation(); // Lấy thông tin URL hiện tại

  // State lưu token (JWT) - kiểm tra trong localStorage trước
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  // Kiểm tra nếu path hiện tại bắt đầu bằng "/admin"
  const isAdminPage = location.pathname.startsWith("/admin");

  // Mỗi khi token thay đổi thì lưu lại vào localStorage
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  // Route bảo vệ cho admin
  const PrivateRoute = ({ element }) => {
    // Nếu có token → hiển thị trang admin
    // Nếu chưa có token → quay về trang LoginAdmin
    return token !== "" ? element : <LoginAdmin setToken={setToken} />;
  };

  return (
    <>
      {/* Nếu KHÔNG phải trang admin */}
      {!isAdminPage ? (
        <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
          <ToastContainer /> {/* Hiển thị thông báo */}
          <Navbar /> {/* Thanh điều hướng */}
          <SearchBar /> {/* Thanh tìm kiếm */}
          {/* Các route cho user */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:productId" element={<Product />} />{" "}
            <Route path="/login" element={<Login />} />
            <Route path="/place-order" element={<PlaceOrder />} />{" "}
            <Route path="/orders" element={<Orders />} />
            <Route path="/cart" element={<Carts />} />
          </Routes>
          <Footer /> {/* Footer */}
        </div>
      ) : (
        // Nếu LÀ trang admin
        <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
          <Routes>
            {/* Trang login admin */}
            <Route path="/admin" element={<LoginAdmin setToken={setToken} />} />

            {/* Trang dashboard admin - cần có token */}
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
