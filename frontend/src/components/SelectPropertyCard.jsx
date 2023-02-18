import React from "react"
import { BiMap } from "react-icons/bi"
function SelectPropertyCard({
  picture1,
  title,
  description,
  municipality,
  area,
}) {
  return (
    <div className="flex flex-col items-start justify-center mx-2">
      <div className="relative">
        <img
          className="object-cover overflow-hidden w-60 h-48 rounded-lg"
          src={picture1}
          alt=""
        />
        <p className="absolute top-3 left-0 z-10 bg-white text-xs font-normal rounded-md px-2 flex items-center">
          <BiMap /> {municipality ? municipality : "-"},{area}
        </p>
      </div>
      <p className="text-sm">{title}</p>
      <p className="text-sm text-gray-500 font-normal">
        {description.slice(0, 15)}...
      </p>
    </div>
  )
}

export default SelectPropertyCard
