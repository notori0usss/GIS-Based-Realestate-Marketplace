import React from "react"
import { MdBed, FaCarSide, TbGridDots } from "react-icons/all"
function NearbyProperty() {
  return (
    <div className="flex flex-row gap-3 py-3">
      <img
        className="w-1/3 object-cover h-[13vh] rounded-xl"
        src="https://photos.zillowstatic.com/fp/b3d316dfd50536c1edfdd78041f513b7-p_e.jpg"
        alt=""
      />
      <div className="flex flex-col justify-center ml-2">
        <h1 className="text-xl font-semibold">Rs. 123123123</h1>
        <p className="text-gray-500 font-semibold">Location</p>
        <div className="flex gap-3 items-center mt-3">
          <div className="flex items-center gap-3">
            <MdBed className="text-xl text-gray-500" />{" "}
            <span className="text-sm text-gray-500">5</span>
          </div>
          <div className="flex items-center gap-3">
            <FaCarSide className="text-xl text-gray-500" />{" "}
            <span className="text-sm text-gray-500">5</span>
          </div>
          <div className="flex items-center gap-3">
            <TbGridDots className="text-xl text-gray-500" />{" "}
            <span className="text-sm text-gray-500">5234.sqft</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NearbyProperty
