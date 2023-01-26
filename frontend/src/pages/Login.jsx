import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import LoginImg from "../assets/login/1.jpg"
function Login() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col items-center w-full h-screen justify-center space-y-10 bg-gray-700 px-28 text-white">
        <h1 className="text-3xl font-pacifico">
          Log into Digi<span className="text-yellow-500">Dalal</span>
        </h1>
        <p>
          Don't have an account yet?
          <Link
            to="/signup"
            className="text-yellow-500 hover:text-yellow-300 hover:underline ml-1"
          >
            Sign up Free
          </Link>
        </p>

        <div className="flex flex-col w-full items-center justify-center gap-y-4">
          <input
            type="text"
            placeholder="name@email.com"
            className="px-3 py-3 w-2/3 rounded-lg text-black"
          />
          <input
            type="password"
            placeholder="Password"
            className="px-3 py-3 w-2/3 rounded-lg text-black"
          />
          <Link to="/forgotpasswords" className="text-gray-300">
            Forgot Password
          </Link>
          <button className="px-3 py-3 bg-yellow-500 w-2/3 rounded-lg mt-2">
            Login
          </button>
        </div>
      </div>
      <img
        src={LoginImg}
        alt="house"
        className="w-full h-screen object-cover hidden lg:block"
      />
    </div>
  )
}

export default Login
