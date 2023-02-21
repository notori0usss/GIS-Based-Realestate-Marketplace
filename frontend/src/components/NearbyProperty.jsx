import React from "react"
import { MdBed, FaCarSide, TbGridDots } from "react-icons/all"
import { useNavigate } from "react-router-dom"
function NearbyProperty({
  id,
  price,
  area,
  picture1,
  parking,
  rooms,
  property_area,
  municipality,
  title,
}) {
  const navigate = useNavigate()
  return (
    <div className="flex flex-row gap-3 py-3">
      <img
        onClick={() => navigate(`/listings/${id}`)}
        className="w-1/3 object-cover h-[13vh] rounded-xl cursor-pointer"
        src={`http://127.0.0.1:8000${picture1}`}
        alt=""
      />
      <div className="flex flex-col justify-center ml-2">
        <h1 className="text-xl font-semibold">Rs. {price}</h1>

        <p className="text-gray-500 font-semibold">
          {area},{municipality ? municipality : "--"}
        </p>
        <div className="flex gap-3 items-center mt-3">
          <div className="flex items-center gap-3">
            <MdBed className="text-xl text-gray-500" />{" "}
            <span className="text-sm text-gray-500">{rooms}</span>
          </div>
          <div className="flex items-center gap-3">
            <FaCarSide className="text-xl text-gray-500" />{" "}
            <span className="text-sm text-gray-500">{parking}</span>
          </div>
          <div className="flex items-center gap-3">
            <TbGridDots className="text-xl text-gray-500" />{" "}
            <span className="text-sm text-gray-500">{property_area}.sqft</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NearbyProperty
