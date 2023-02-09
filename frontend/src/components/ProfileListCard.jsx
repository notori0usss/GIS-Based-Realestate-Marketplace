import React from "react"
import { useNavigate } from "react-router-dom"

function ProfileListCard({
  title,
  description,
  price,
  picture1,
  id,
  property_status,
  rental_frequency,
}) {
  const navigate = useNavigate()
  return (
    <div
      className="shadow w-80 h-[35vh] rounded-lg hover:shadow-xl duration-200"
      key={id}
    >
      <img
        src={`http://127.0.0.1:8000${picture1}`}
        alt=""
        className="w-full h-40 object-cover cursor-pointer"
        onClick={() => navigate(`/listings/${id}`)}
      />
      <div className="px-3 py-2 gap-4 flex flex-col">
        <h1 className="text-lg font-semibold">{title}</h1>
        <p className="text-gray-400 ">{description.slice(0, 25)}..</p>
        {property_status === "Rent" ? (
          <button className="bg-blue-500 text-white px-3 py-2 rounded-lg font-bold spacing  w-2/3 tracking-wider">
            Rs.{price}/<span className="text-xs">{rental_frequency}</span>
          </button>
        ) : (
          <button className="bg-blue-500 text-white px-3 py-2 rounded-lg font-bold spacing  w-2/3 tracking-wider">
            Rs.{price}
          </button>
        )}
      </div>
    </div>
  )
}

export default ProfileListCard
