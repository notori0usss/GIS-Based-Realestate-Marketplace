import React from "react"
import Img1 from "../assets/listings/p-1.png"
import { BiMap } from "react-icons/bi"
import { MdBed, MdCarRental } from "react-icons/md"
import { FaCarSide, FaLocationArrow } from "react-icons/fa"
import { TbGridDots } from "react-icons/tb"
import NoData from "../assets/nodata.jpg"
function ProductCard(
  {
    id,
    title,
    price,
    rooms,
    parking,
    area,
    listing_type,
    status,
    picture1,
    property_status,
    rental_frequency,
    property_area,
    latitude,
    longitude,
  },
  ref
) {
  const ZOOM_LEVEL = 16
  const showPropertyLocation = () => {
    ref.current.flyTo([latitude, longitude], ZOOM_LEVEL, { animate: true })
  }
  return (
    <div className="flex flex-col w-auto h-auto shadow-lg" key={id}>
      <div className="relative">
        <img src={picture1} alt="" />
        {property_status === "Sale" ? (
          <p className="absolute top-4 left-0 bg-green-300 text-green-700 rounded-r-lg px-2 py-1 font-bold text-sm shadow-sm">
            For {property_status}
          </p>
        ) : (
          <p className="absolute top-4 left-0 bg-yellow-300 text-yellow-700 rounded-r-lg px-2 py-1 font-bold text-sm shadow-sm">
            For {property_status}
          </p>
        )}
      </div>

      <div className="flex items-center w-full p-4 justify-between">
        <div className="">
          <h1 className="font-semibold text-gray-700">{title}</h1>
          <div className="flex items-center text-md text-yellow-600 gap-x-3 ">
            {rooms} <MdBed className="text-lg" /> | {parking}
            <FaCarSide className="text-lg" /> | {property_area} sqft{" "}
            <TbGridDots className="text-lg" />
          </div>
        </div>
        <FaLocationArrow
          onClick={showPropertyLocation}
          className="text-gray-500 text-xl hover:text-gray-800 cursor-pointer"
        />
      </div>
      <hr className="my-2" />
      <div className="flex items-center justify-between px-5 py-2">
        {property_status === "Rent" ? (
          <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-bold spacing text-md w-1/2 tracking-wider">
            {price}/<span className="text-xs">{rental_frequency}</span>
          </button>
        ) : (
          <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-bold spacing text-md w-1/2 tracking-wider">
            {price}
          </button>
        )}
        <h5>{listing_type}</h5>
      </div>
    </div>
  )
}

export default React.forwardRef(ProductCard)
