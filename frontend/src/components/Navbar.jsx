import React from "react"

function Navbar() {
  return (
    <div className="flex justify-between shadow-md w-full h-20 px-20 py-5 items-center">
      {/* logo */}
      <div className="text-3xl flex font-pacifico gap-x-1">
        Digi<span className="text-teal-700">Dalal</span>
      </div>
      {/* nav links */}
      <div className="w-full">
        <ul className="flex flex-row gap-10 justify-center">
          <li className="hover:text-teal-800">
            <a href="">Home</a>
          </li>
          <li>
            <a href="">Listings</a>
          </li>
          <li>
            <a href="">Location</a>
          </li>
        </ul>
      </div>
      {/* button */}
      <div className="flex gap-8 flex-row">
        <button className="w-20 h-10 bg-teal-600 rounded-md text-gray-200 ">
          Sign In
        </button>
        <button className="w-20 h-10 bg-teal-600 rounded-md text-gray-200 ">
          Sign Up
        </button>
      </div>
    </div>
  )
}

export default Navbar
