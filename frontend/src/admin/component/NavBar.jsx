import React from "react";
import { assets } from "../../user/assets/assets";
import { useNavigate } from "react-router-dom";

function NavBar({ setToken }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token"); // xóa token khỏi localStorage
    setToken(""); // reset state token
    navigate("/admin"); // chuyển hướng về trang login admin
  };

  return (
    <div className="flex justify-between mt-4 p-2 border-b border-gray-400">
      <img className="w-36" src={assets.logo} alt="" />
      <button
        onClick={handleLogout}
        className="bg-black text-white px-4 py-2 rounded-full"
      >
        LOGOUT
      </button>
    </div>
  );
}

export default NavBar;
