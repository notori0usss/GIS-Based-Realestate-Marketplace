import React, { useContext } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { navItems } from "../data/navbar"
import StateContext from "../context/StateContext"
import { useState } from "react"
import Axios from "axios"
import Avatar, { genConfig } from "react-nice-avatar"
import { FaHeart } from "react-icons/fa"

import DispatchContext from "../context/DispatchContext"
import { useEffect } from "react"
import { MdVerified } from "react-icons/md"

function Navbar() {
  const GlobalState = useContext(StateContext)
  const GlobalDispatch = useContext(DispatchContext)
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [config, setConfig] = useState("")

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
      setIsOpen(false)
      navigate("/")
    } catch (error) {
      console.error(error)
    }
  }

  const [subscriptionStatus, setSubscriptionStatus] = useState(false)
  useEffect(() => {
    async function GetProfileInfo() {
      try {
        const response = await Axios.get(
          `http://127.0.0.1:8000/api/profiles/${GlobalState.userId}/`
        )

        setSubscriptionStatus(response.data.subscribed)
        GlobalDispatch({
          type: "getUserProfilePicture",
          profilePicture: response.data.profile_picture,
        })
        GlobalDispatch({
          type: "checkSubscribedInfo",
          subscribedInfo: response.data.subscribed,
        })
        GlobalDispatch({
          type: "getUserObject",
          userValue: response.data,
        })
      } catch (e) {
        console.log(e)
      }
    }
    GetProfileInfo()
  }, [GlobalState.userIsLogged, subscriptionStatus, GlobalState.subscribedInfo])

  return (
    <nav className="flex flex-row justify-between items-center px-10 py-5 bg-gray-700 text-white sticky top-0 z-20">
      <Link to="/" className="font-pacifico text-xl">
        Digi<span className="text-blue-500"> Dalal</span>
      </Link>
      <ul className="flex items-center gap-x-7 justify-center">
        {navItems.map((navItem, index) => (
          <li key={index}>
            <NavLink
              to={navItem.path}
              className={({ isActive }) => (isActive ? "text-blue-500" : "")}
            >
              {navItem.title}
            </NavLink>
          </li>
        ))}
      </ul>
      {GlobalState.userIsLogged ? (
        <div className="flex items-center">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-2 relative">
            <FaHeart
              className="w-8 h-8 text-blue-500"
              onClick={() => navigate("/likeditems")}
            />
          </div>
          <div className="relative">
            <button
              id="dropdownUserAvatarButton"
              className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              onClick={() => setIsOpen(!isOpen)}
            >
              {GlobalState.userProfilePicture === null ? (
                <Avatar className="w-10 h-10" {...config} />
              ) : (
                <img
                  src={GlobalState.userProfilePicture}
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}
            </button>

            {isOpen && (
              <div
                id="dropdownAvatar"
                className="z-10 absolute translate-x-[-120px] bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
              >
                <div className="px-4 py-3 text-sm text-blue-300 hover:text-blue-300 text-center">
                  {GlobalState.userUsername}
                  {subscriptionStatus && (
                    <MdVerified className="text-pale-500 text-sm inline ml-1" />
                  )}
                </div>
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownUserAvatarButton"
                >
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => {
                        navigate("/profile")
                        setIsOpen(false)
                      }}
                    >
                      Profile
                    </a>
                  </li>
                  {GlobalState.userEmail === "admin@digidalal.com" ||
                  GlobalState.userEmail === "dhunganaswaroop@gmail.com" ? (
                    <li>
                      <a
                        href="http://127.0.0.1:8000/admin/"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() => {
                          setIsOpen(false)
                        }}
                      >
                        Admin
                      </a>
                    </li>
                  ) : (
                    ""
                  )}
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
        </div>
      ) : (
        <button
          className="hover:text-white bg-blue-500 hover:bg-blue-400 text-gray-200 px-5 py-2 font-semibold rounded-lg"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      )}
    </nav>
  )
}

export default Navbar
