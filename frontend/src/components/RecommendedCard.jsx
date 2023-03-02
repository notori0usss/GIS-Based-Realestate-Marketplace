import React, { useState, useEffect } from "react"
import Img1 from "../assets/listings/p-1.png"
import { BiMap } from "react-icons/bi"
import { MdBed, MdCarRental } from "react-icons/md"
import { FaCarSide, FaHeart, FaLocationArrow } from "react-icons/fa"
import { TbGridDots } from "react-icons/tb"
import NoData from "../assets/nodata.jpg"
import Avatar, { genConfig } from "react-nice-avatar"
import { useContext } from "react"
import StateContext from "../context/StateContext"
import { useNavigate } from "react-router-dom"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
function RecommendedCard({
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
  seller,
  userInfo,
}) {
  console.log(userInfo)
  const navigate = useNavigate()
  const GlobalState = useContext(StateContext)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [liked, setLiked] = useState([])
  function likeHandler() {}
  useEffect(() => {
    const datePosted = new Date(date_posted)
    const currentTime = new Date()
    const difference = currentTime - datePosted
    const timeElapsed = Math.floor(difference / (1000 * 60 * 60 * 24))
    setTimeElapsed(timeElapsed)
  }, [])

  function DegreeToRadian(coordinate) {
    return (coordinate * Math.PI) / 180
  }
  function CalculateDistance() {
    const latitude1 = DegreeToRadian(latitude)
    const longitude1 = DegreeToRadian(longitude)

    const latitude2 = DegreeToRadian(userInfo.latitude)
    const longitude2 = DegreeToRadian(userInfo.longitude)

    // The formula
    const latDiff = latitude2 - latitude1
    const lonDiff = longitude2 - longitude1
    const R = 6371000 / 1000

    const a =
      Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
      Math.cos(latitude1) *
        Math.cos(latitude2) *
        Math.sin(lonDiff / 2) *
        Math.sin(lonDiff / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    const d = R * c

    const dist =
      Math.acos(
        Math.sin(latitude1) * Math.sin(latitude2) +
          Math.cos(latitude1) * Math.cos(latitude2) * Math.cos(lonDiff)
      ) * R
    return dist.toFixed(2)
  }

  return (
    <div
      className="flex flex-col w-full h-full shadow-lg hover:shadow-2xl transistion-all duration-150 rounded-md "
      key={id}
    >
      <div className="relative">
        <div>
          <img
            className="w-full h-[15rem] object-cover cursor-pointer relative"
            src={`http://127.0.0.1:8000${picture1}`}
            alt=""
            onClick={() => navigate(`/listings/${id}`)}
          />
          <div className="absolute top-[50%] bg-white opacity-50 w-full text-center h-4 text-xs">
            @DigiDalal
          </div>
        </div>

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
          <div className="flex items-center text-md text-blue-600 gap-x-3 ">
            {rooms} <MdBed className="text-lg" /> |{" "}
            {parking === 0 ? 0 : parking}
            <FaCarSide className="text-lg" /> | {property_area} sqft{" "}
            <TbGridDots className="text-lg" />
          </div>
        </div>
        <AiOutlineHeart
          className="w-8 h-8 text-blue-500"
          onClick={likeHandler}
        />
      </div>
      <hr className="my-2" />
      <div className="flex items-center justify-between px-5 py-2">
        {property_status === "Rent" ? (
          <button className="bg-blue-500 text-white px-3 py-3 rounded-lg font-bold spacing text-md w-2/3 tracking-wider">
            Rs.{price}/<span className="text-xs">{rental_frequency}</span>
          </button>
        ) : (
          <button className="bg-blue-500 text-white px-3 py-3 rounded-lg font-bold spacing text-md w-2/3 tracking-wider">
            Rs.{price}
          </button>
        )}
        <div className="text-lg font-semibold text-gray-500 w-full text-center">
          {CalculateDistance()} kms away.
        </div>
      </div>

      <hr />
    </div>
  )
}

export default RecommendedCard
