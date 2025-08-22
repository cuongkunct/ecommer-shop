import React from "react";
import NavBar from "../component/NavBar";
import { Link, Outlet } from "react-router-dom";
import ItemList from "../component/ItemList";

function Dashboard({ setToken }) {
  return (
    <>
      <NavBar setToken={setToken} />
      <div className="flex w-full">
        <div className=" min-h-screen flex flex-col gap-8 border-r border-gray-500 mt-4">
          <Link
            className="bg-gray-300 rounded-tl-full rounded-bl-full p-2 text-center"
            to="/admin/dashboard/add"
          >
            + Add product
          </Link>
          <Link
            className="bg-gray-300 rounded-tl-full rounded-bl-full p-2 text-center"
            to="/admin/dashboard/list"
          >
            Item List
          </Link>
        </div>
        {/* Nội dung chính */}
        <div className="flex-1 p-6">
          <Outlet /> {/* Chỗ này hiển thị ItemList */}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
