import React from "react"
import { useContext } from "react"
import StateContext from "../context/StateContext"
import {
  FaPhoneAlt,
  FaRing,
  FaSuitcase,
  MdVerified,
  TbReportMoney,
} from "react-icons/all"
import { useNavigate } from "react-router-dom"
import ProfileUpdate from "./ProfileUpdate"

function UserProfile({
  agency,
  number,
  profilePicture,
  isSubscribed,
  totalListing,
  sellerId,
}) {
  const GlobalState = useContext(StateContext)
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center border-4 py-10 gap-2">
      <img
        src={profilePicture}
        alt="profile-picture"
        className="w-32 h-32 object-cover rounded-full"
      />
      {GlobalState.userUsername ? (
        <div className="text-xl font-semibold">
          Welcome{" "}
          <span className="text-blue-500 font-semibold">
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
      <div
        className="flex items-center gap-2"
        onClick={() => navigate(`/agencies/${sellerId}`)}
      >
        <TbReportMoney className="text-gray-600 text-xl font-bold " />:{" "}
        {totalListing}
      </div>
      <button
        className="bg-blue-500 px-5 py-2 font-semibold text-white hover:bg-blue-400"
        onClick={() => navigate(`/profileupdate/${sellerId}`)}
      >
        Edit Profile
      </button>
    </div>
  )
}

export default UserProfile
