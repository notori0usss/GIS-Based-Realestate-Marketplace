import React, { useState, useEffect } from "react"
import Img1 from "../assets/listings/p-1.png"
import { BiMap } from "react-icons/bi"
import { MdBed, MdCarRental } from "react-icons/md"
import { FaCarSide, FaLocationArrow } from "react-icons/fa"
import { TbGridDots } from "react-icons/tb"
import NoData from "../assets/nodata.jpg"
import Avatar, { genConfig } from "react-nice-avatar"
import { useContext } from "react"
import StateContext from "../context/StateContext"
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
    date_posted,
    seller_username,
    seller_profile_picture,
  },
  ref
) {
  const ZOOM_LEVEL = 18
  const showPropertyLocation = () => {
    ref.current.flyTo([latitude, longitude], ZOOM_LEVEL, { animate: true })
  }
  const avatar = genConfig(seller_username)
  const GlobalState = useContext(StateContext)
  const [timeElapsed, setTimeElapsed] = useState(0)
  useEffect(() => {
    const datePosted = new Date(date_posted)
    const currentTime = new Date()
    const difference = currentTime - datePosted
    const timeElapsed = Math.floor(difference / (1000 * 60 * 60 * 24))
    setTimeElapsed(timeElapsed)
  }, [])
  return (
    <div className="flex flex-col w-full h-full shadow-lg" key={id}>
      <div className="relative">
        <img className="w-full h-[15rem] object-cover" src={picture1} alt="" />
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
          <h1 className="font-semibold text-gray-700 text-lg">{title}</h1>
          <div className="flex items-center text-md text-yellow-600 gap-x-3 ">
            {rooms} <MdBed className="text-lg" /> |{" "}
            {parking === 0 ? 0 : parking}
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
          <button className="bg-yellow-500 text-white px-5 py-3 rounded-lg font-bold spacing text-md w-2/3 tracking-wider">
            Rs.{price}/<span className="text-xs">{rental_frequency}</span>
          </button>
        ) : (
          <button className="bg-yellow-500 text-white px-5 py-3 rounded-lg font-bold spacing text-md w-2/3 tracking-wider">
            Rs.{price}
          </button>
        )}
        {seller_profile_picture === "" ? (
          <Avatar className="w-10 h-10 rounded-full" {...avatar} />
        ) : (
          <img
            src={`http://127.0.0.1:8000${seller_profile_picture}/`}
            className="w-10 h-10 rounded-full object-cover"
          />
        )}
      </div>
      <hr />
      <div className="flex items-center justify-between mx-2">
        <h5 className="text-center font-semibold text-gray-600 my-2">
          Posted by {seller_username}
        </h5>
        {timeElapsed === 0 ? (
          <span className="text-gray-500 text-sm"> Today</span>
        ) : (
          <span className="text-gray-500 text-sm">
            {" "}
            {timeElapsed} days ago.
          </span>
        )}
      </div>
    </div>
  )
}

export default React.forwardRef(ProductCard)
