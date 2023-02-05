import React from "react"
import { useNavigate } from "react-router-dom"

function AgencyCard({ agency_name, profile_picture, seller_listings, seller }) {
  const navigate = useNavigate()
  function sellerListingLength(seller_listings) {
    if (seller_listings.length === 0) {
      return (
        <button disabled className="text-gray-300">
          No Property Listed
        </button>
      )
    } else if (seller_listings.length === 1) {
      return (
        <button
          className="hover:text-yellow-500"
          onClick={() => navigate(`/agencies/${seller}`)}
        >
          1 Property
        </button>
      )
    } else {
      return (
        <button
          className="hover:text-yellow-500"
          onClick={() => navigate(`/agencies/${seller}`)}
        >
          {seller_listings.length} Property
        </button>
      )
    }
  }

  return (
    <div className="w-[31rem] shadow-lg rounded-lg mt-5">
      <img
        src={
          profile_picture
            ? profile_picture
            : "http://127.0.0.1:8000/media/user.png"
        }
        alt="agency-pic"
        className="bg-black w-full h-60 object-cover rounded-t-md "
      />
      <div className=" bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 flex flex-col items-start px-3 py-3 text-white rounded-b-lg">
        <h1 className="font-semibold text-lg hover:underline cursor-pointer">
          {agency_name}
        </h1>
        {sellerListingLength(seller_listings)}
      </div>
    </div>
  )
}

export default AgencyCard
