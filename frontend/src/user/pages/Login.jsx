import React, { useState } from "react";
import Title from "../components/Title";
import { backendUrl } from "../../App";
import axios from "axios";

function Login({ setUserToken }) {
  const [mod, setMod] = useState("Login");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [name, setName] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault(); // Ngăn reload
    try {
      if (mod === "Login") {
        const res = await axios.post(backendUrl + "/api/user/login", {
          email: userEmail,
          password: userPassword,
        });
        console.log(res);
        if (res.data.status === true) {
          setUserToken(res.data.token);
        }
      }
    } catch (error) {}
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col items-center w-[90%] max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="flex text-3xl font-bold mb-5 items-center gap-4">
        <p className="font-mono">{mod === "Login" ? "LOGIN" : "SIGN UP"}</p>
        <hr className="bg-gray-700 h-1 w-12" />
      </div>
      {mod !== "Login" && (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="border border-gray-500 w-full p-2"
          type="name"
          placeholder="Name"
        />
      )}

      <input
        onChange={(e) => setUserEmail(e.target.value)}
        value={userEmail}
        className="border border-gray-500 w-full p-2"
        type="email"
        placeholder="Email"
      />
      <input
        onChange={(e) => setUserPassword(e.target.value)}
        value={userPassword}
        className="border border-gray-500 w-full p-2"
        type="password"
        placeholder="Password"
      />

      <div className="w-full flex justify-between ">
        <p className="underline cursor-pointer">Forgot password?</p>
        <p
          onClick={() =>
            mod === "Login" ? setMod("Sign Up") : setMod("Login")
          }
          className="underline cursor-pointer"
        >
          {mod === "Login" ? "Create Account" : "Login Here"}
        </p>
      </div>

      <button type="submit" className="bg-black text-white w-full py-2">
        {mod === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
}

export default Login;
