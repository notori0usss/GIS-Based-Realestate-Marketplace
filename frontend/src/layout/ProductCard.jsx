import React from "react"
import Img1 from "../assets/listings/p-1.png"
import { BiMap } from "react-icons/bi"
import { MdBed, MdCarRental } from "react-icons/md"
import { FaCarSide, FaLocationArrow } from "react-icons/fa"
import { TbGridDots } from "react-icons/tb"
import NoData from "../assets/nodata.jpg"
function ProductCard({
  id,
  title,
  price,
  rooms,
  parking,
  area,
  listing_type,
  status,
  picture1,
}) {
  return (
    <div className="flex flex-col w-[20rem] h-auto shadow-lg" key={id}>
      <div className="relative">
        <img src={picture1} alt="" />
        <p className="absolute top-4 left-0 bg-green-300 text-green-700 rounded-r-lg px-2 py-1 font-bold text-[10px] shadow-sm">
          {status}
        </p>
      </div>

      <div className="flex items-center w-full p-4 justify-between">
        <div className="">
          <h1 className="font-semibold">{title}</h1>
          <div className="flex items-center text-sm text-yellow-600 gap-x-3 ">
            {rooms} <MdBed className="text-lg" /> | {parking}
            <FaCarSide className="text-lg" />
            | 108.5 sqft <TbGridDots className="text-lg" />
          </div>
        </div>
        <FaLocationArrow className="text-gray-500 text-xl hover:text-gray-800 cursor-pointer" />
      </div>
      <hr className="my-2" />
      <div className="flex items-center justify-between px-5 py-2">
        <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-bold spacing text-lg tracking-wider">
          {price}
        </button>
        <h5>{listing_type}</h5>
      </div>
    </div>
  )
}

export default ProductCard
