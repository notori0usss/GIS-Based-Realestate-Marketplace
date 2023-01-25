import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { FcGoogle } from "react-icons/fc"
import LoginImg from "../assets/login/1.jpg"

function Signup() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col items-center w-full h-screen justify-center space-y-10 bg-gray-700 px-28 text-white">
        <h1 className="text-3xl font-pacifico">Create Account</h1>
        <p>
          Already have an account yet?
          <Link
            to="/login"
            className="text-yellow-500 hover:text-yellow-300 hover:underline"
          >
            Login
          </Link>
        </p>
        <button className="px-3 py-3 bg-white shadow-lg rounded-lg flex items-center gap-x-2 w-2/3 text-gray-500 justify-center">
          <FcGoogle />
          Login with Google
        </button>
        <div className="flex justify-between items-center gap-x-4 w-2/3">
          <hr className="w-full border-yellow-500" />
          or
          <hr className="w-full border-yellow-500" />
        </div>

        <div className="flex flex-col w-full items-center justify-center gap-y-4">
          <div className="w-2/3 flex gap-x-2">
            <input
              type="text"
              placeholder="First Name"
              className="px-3 py-3 w-1/2 rounded-lg text-black"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="px-3 py-3 w-1/2 rounded-lg text-black"
            />
          </div>
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

          <button className="px-3 py-3 bg-yellow-500 w-2/3 rounded-lg">
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

export default Signup
