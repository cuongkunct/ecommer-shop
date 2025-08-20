import React, { useState } from "react";
import Title from "../components/Title";

function Login() {
  const [mod, setMod] = useState("Login");
  return (
    <form className="flex flex-col items-center w-[90%] max-w-96 m-auto mt-14 gap-4 text-gray-800">
      <div className="flex text-3xl font-bold mb-5 items-center gap-4">
        <p className="font-mono">{mod === "Login" ? "LOGIN" : "SIGN UP"}</p>
        <hr className="bg-gray-700 h-1 w-12" />
      </div>
      {mod !== "Login" && (
        <input
          className="border border-gray-500 w-full p-2"
          type="email"
          placeholder="Email"
        />
      )}

      <input
        className="border border-gray-500 w-full p-2"
        type="text"
        placeholder="Username"
      />
      <input
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

      <button className="bg-black text-white w-full py-2">
        {mod === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
}

export default Login;
