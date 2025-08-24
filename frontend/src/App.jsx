import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
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
import Profile from "./user/pages/Profile";

// Import các component chung của user
import Navbar from "./user/components/Navbar";
import SearchBar from "./user/components/SearchBar";
import Footer from "./user/components/Footer";

// Import các trang của admin
import LoginAdmin from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";
import ItemList from "./admin/component/ItemList";
import OrderList from "./admin/component/OrderList";
import AddItem from "./admin/component/AddItem";
// Lấy URL backend từ biến môi trường (.env)
export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const location = useLocation(); // Lấy thông tin URL hiện tại
  const navigate = useNavigate();
  // State lưu token (JWT) - kiểm tra trong localStorage trước
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  const [userToken, setUserToken] = useState(
    localStorage.getItem("userToken") ? localStorage.getItem("userToken") : ""
  );
  // Kiểm tra nếu path hiện tại bắt đầu bằng "/admin"
  const isAdminPage = location.pathname.startsWith("/admin");

  // Mỗi khi token thay đổi thì lưu lại vào localStorage
  useEffect(() => {
    console.log("token: ", token);
    localStorage.setItem("token", token);
    // Nếu có token và đang ở trang login admin → tự động chuyển sang dashboard
    if (token !== "" && location.pathname === "/admin") {
      navigate("/admin/dashboard");
    }
  }, [token, location.pathname, navigate]);

  useEffect(() => {
    console.log("userToken: ", userToken);
    localStorage.setItem("userToken", userToken);
    // Nếu có token và đang ở trang login admin → tự động chuyển sang dashboard
    if (userToken !== "" && location.pathname === "/login") {
      navigate("/");
    }
  }, [userToken, navigate, location.pathname]);

  // Route bảo vệ cho admin
  const PrivateRoute = ({ element }) => {
    // Nếu có token → hiển thị trang admin
    // Nếu chưa có token → quay về trang LoginAdmin
    return token !== "" ? element : <LoginAdmin setToken={setToken} />;
  };

  return (
    <>
      {!isAdminPage ? (
        <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
          <ToastContainer />
          <Navbar setUserToken={setUserToken} />
          <SearchBar />
          <Routes>
            {/* User routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route
              path="/login"
              element={<Login setUserToken={setUserToken} />}
            />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/cart" element={<Carts />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Footer />
        </div>
      ) : (
        <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
          <ToastContainer />
          <Routes>
            <Route path="/admin" element={<LoginAdmin setToken={setToken} />} />

            {/* Route cha Dashboard */}
            <Route
              path="/admin/dashboard"
              element={
                <PrivateRoute element={<Dashboard setToken={setToken} />} />
              }
            >
              {/* Route con bên trong Dashboard */}
              <Route path="add" element={<AddItem token={token} />} />
              <Route path="list" element={<ItemList token={token} />} />
            </Route>
          </Routes>
        </div>
      )}
    </>
  );
};

export default App;
