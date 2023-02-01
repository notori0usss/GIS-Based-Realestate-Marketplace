import React from "react"
import { useContext } from "react"
import StateContext from "../context/StateContext"
import { FaPhoneAlt, FaRing, FaSuitcase } from "react-icons/fa"
import { MdVerified } from "react-icons/md"

function UserProfile({ agency, number, profilePicture, isSubscribed }) {
  const GlobalState = useContext(StateContext)

  return (
    <div className="flex flex-col items-center border-4 py-10 gap-2">
      <img
        src={profilePicture}
        alt=""
        className="w-32 h-32 object-cover rounded-full"
      />
      {GlobalState.userUsername ? (
        <div className="text-xl font-semibold">
          Welcome{" "}
          <span className="text-yellow-500 font-semibold">
            {GlobalState.userUsername}{" "}
            {isSubscribed ? (
              <MdVerified className="text-blue-500 text-sm inline" />
            ) : (
              ""
            )}
          </span>{" "}
          to your profile!
        </div>
      ) : (
        ""
      )}

      <div className="flex items-center gap-2">
        <FaSuitcase className="text-gray-600" />: {agency}{" "}
      </div>
      <div className="flex items-center gap-2">
        <FaPhoneAlt className="text-gray-600" />: {number}
      </div>
    </div>
  )
}

export default UserProfile
