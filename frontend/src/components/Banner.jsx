import React from "react"
import BannerImg from "../assets/bannerimg.png"
function Banner() {
  return (
    <div
      className="flex justify-center items-center bg-white px-20 py-20"
      style={{ clipPath: " polygon(0 12%, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="grid grid-cols-6 w-full bg-gray-700 rounded-lg    ">
        <div className="col-span-4">
          <h2 className="font-bold text-3xl text-white ml-10 mt-8">
            A Digital Space for you Properties
          </h2>

          <p className="font-light text-white text-sm ml-10 mt-5">
            Build robust applications using a comprehensive portfolio of
            compute, storage, database, and networking products.
          </p>

          <button className="text-white font-semibold ml-10 mt-5 mb-8 group ">
            View Properties
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline-block h-6 w-6 group-hover:translate-x-2 transition delay-100 transition-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>

        <div className="col-span-2 relative">
          <img
            src="https://www.digitalocean.com/_next/static/media/cloudJourneyImage.954519ea.svg"
            className="absolute bottom-0 right-0"
          />
        </div>
      </div>
    </div>
  )
}

export default Banner
