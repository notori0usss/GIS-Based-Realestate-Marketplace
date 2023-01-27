import React, { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { navItems } from "../data/navbar"
import StateContext from "../context/StateContext"
import { useState } from "react"
import Axios from "axios"
import Avatar, { genConfig } from "react-nice-avatar"

import DispatchContext from "../context/DispatchContext"
function Navbar() {
  const GlobalState = useContext(StateContext)
  const GlobalDispatch = useContext(DispatchContext)
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const config = genConfig()
  async function handleLogout() {
    try {
      const response = await Axios.post(
        "http://127.0.0.1:8000/api-auth-djoser/token/logout/",
        GlobalState.userToken,
        {
          headers: { Authorization: "Token ".concat(GlobalState.userToken) },
        }
      )
      console.log(response)
      GlobalDispatch({ type: "logout" })
      navigate("/")
    } catch (error) {
      console.error(error)
    }
  }
  console.log(GlobalState.userIsLogged)
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
      {GlobalState.userIsLogged ? (
        <div className="relative">
          <button
            id="dropdownUserAvatarButton"
            className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Avatar className="w-10 h-10 rounded-full" {...config} />
          </button>

          {isOpen && (
            <div
              id="dropdownAvatar"
              className="z-10 absolute translate-x-[-120px] bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
            >
              <div className="px-4 py-3 text-sm text-yellow-300 hover:text-yellow-300 text-center">
                {GlobalState.userUsername}
              </div>
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownUserAvatarButton"
              >
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Profile
                  </a>
                </li>
              </ul>
              <div className="py-2" onClick={handleLogout}>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Sign out
                </a>
              </div>
            </div>
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
