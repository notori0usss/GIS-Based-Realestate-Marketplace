import React from "react"
import Img1 from "../assets/listings/p-1.png"
import { BiMap } from "react-icons/bi"
import { BsFillHeartFill } from "react-icons/bs"
import { MdBed, MdShower } from "react-icons/md"
import { TbGridDots } from "react-icons/tb"
function ProductCard() {
  return (
    <div className="flex flex-col w-[20rem] h-auto shadow-lg">
      <div className="relative">
        <img src={Img1} alt="" />
        <p className="absolute top-4 left-0 bg-green-300 text-green-700 rounded-r-lg px-2 py-1 font-bold text-[10px] shadow-sm">
          For Sale
        </p>
      </div>

      <div className="flex items-center w-full p-4 justify-between">
        <div className="">
          <h1 className="font-semibold">$250,000</h1>
          <div className="flex items-center text-sm text-yellow-600 gap-x-3 ">
            2 <MdBed className="text-lg" /> | 3 <MdShower className="text-lg" />
            | 108.5 sqft <TbGridDots className="text-lg" />
          </div>
        </div>
        <BsFillHeartFill className="text-gray-500 text-xl hover:text-gray-800 cursor-pointer" />
      </div>
      <hr className="my-2" />
      <div className="flex items-center justify-between px-5 py-2">
        <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-bold spacing text-lg tracking-wider">
          $2500
        </button>
        <h5>Apartment</h5>
      </div>
    </div>
  )
}

export default ProductCard
