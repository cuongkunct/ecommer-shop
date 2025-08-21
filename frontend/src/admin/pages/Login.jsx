import React, { useState } from "react";
import { backendUrl } from "../../App";
import axios from "axios";
const LoginAdmin = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(email);
  console.log(backendUrl + "/api/user/admin");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backendUrl}/api/user/admin`, {
        email,
        password,
      });

      if (response.data.status === "success") {
        setToken(response.data.token);
      }

      console.log(response.data.token); // thường log .data thay vì cả response
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center font-medium">
      <div className="min-w-[400px] flex flex-col gap-5 border border-gray-500 shadow-md rounded-md bg-gray-200 p-5">
        <p className="font-bold text-3xl">Admin Panel</p>
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-2">
          <label className="text-gray-600" htmlFor="email">
            Email Address
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-200 p-3 rounded-md"
            type="text"
            placeholder="Enter email..."
            required
          />

          <label className="text-gray-600" htmlFor="email">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-200 p-3 rounded-md"
            type="text"
            placeholder="Enter password..."
            required
          />
          <button
            className="bg-black text-white text-sm p-3 mt-4 rounded-md"
            type="submit"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;
