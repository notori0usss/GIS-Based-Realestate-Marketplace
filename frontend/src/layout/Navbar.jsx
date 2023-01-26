import React, { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { navItems } from "../data/navbar"
import StateContext from "../context/StateContext"
import UserDropdown from "../components/UserDropdown"
import { useState } from "react"
import DispatchContext from "../context/DispatchContext"
function Navbar() {
  const GlobalState = useContext(StateContext)
  const GlobalDispatch = useContext(DispatchContext)
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="flex flex-row justify-between items-center px-10 py-5 bg-gray-700 text-white">
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
      {GlobalState.userUsername !== "" ? (
        <div className="relative">
          <button
            id="dropdownUserAvatarButton"
            className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="bg-white w-10 h-10 rounded-full"></div>
          </button>

          {isOpen && (
            <UserDropdown
              GlobalState={GlobalState}
              GlobalDispatch={GlobalDispatch}
            />
          )}
        </div>
      ) : (
        <button
          className="hover:text-white bg-yellow-500 hover:bg-yellow-400 text-gray-200 px-5 py-2 font-semibold rounded-lg"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      )}
    </nav>
  )
}

export default Navbar
