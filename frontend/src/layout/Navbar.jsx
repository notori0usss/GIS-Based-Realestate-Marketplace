import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { navItems } from "../data/navbar"
function Navbar() {
  const navigate = useNavigate()
  return (
    <nav className="flex flex-row justify-between items-center px-10 py-5 bg-black text-white">
      <Link to="/" className="font-pacifico text-xl">
        Digi<span className="text-yellow-500"> Dalal</span>
      </Link>
      <ul className="flex items-center gap-x-7 justify-center">
        {navItems.map((navItem, index) => (
          <li key={index}>
            <Link
              to={navItem.path}
              className="hover:text-yellow-500 active:text-yellow-500"
            >
              {navItem.title}
            </Link>
          </li>
        ))}
      </ul>
      <button
        className="hover:text-white bg-yellow-500 hover:bg-yellow-400 text-gray-200 px-5 py-2 font-semibold rounded-lg"
        onClick={() => navigate("/login")}
      >
        Login
      </button>
    </nav>
  )
}

export default Navbar
