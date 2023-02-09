import React from "react"

function RealtorCard({ name, photo, phone, description, email }) {
  return (
    <div className="w-72 bg-gray-100 flex items-center flex-col shadow-md rounded-md">
      <div
        className="bg-blue-500 w-full h-32 relative"
        style={{ clipPath: " polygon(0 0, 100% 0, 100% 80%, 0 70%)" }}
      ></div>
      <img
        src={photo}
        alt=""
        className="w-32 h-32 rounded-full border-4 object-cover absolute mt-10"
      />
      <div className="mt-12 flex items-center flex-col gap-1 px-2">
        <h1 className="text-lg font-semibold text-gray-700">{name}</h1>
        <div className="w-1/5 rounded-full bg-gray-600 h-1"></div>
        <p className="text-sm text-gray-500 mt-5 text-center">{description}</p>
        <button>Message</button>
      </div>
      <div
        className="h-10 bg-blue-500 w-full"
        style={{ clipPath: "polygon(0 30%, 100% 10%, 100% 100%, 0 100%)" }}
      ></div>
    </div>
  )
}

export default RealtorCard
