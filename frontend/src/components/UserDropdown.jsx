import { Axios } from "axios"
import React from "react"
import { useNavigate } from "react-router-dom"

function UserDropdown({ GlobalState, GlobalDispatch }) {
  const navigate = useNavigate()
  async function handleLogout() {
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
  }
  return (
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
  )
}

export default UserDropdown
