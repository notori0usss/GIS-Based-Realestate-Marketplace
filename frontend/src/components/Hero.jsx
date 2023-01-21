import React from "react"
import HeroImg from "../assets/services.jpg"
function Hero() {
  return (
    <div>
      <div className="bg-gradient-to-tr from-gray-700 to-gray-500 h-[80vh] w-full relative">
        <img
          src={HeroImg}
          alt="bg-hero"
          className="w-full h-full object-cover absolute mix-blend-overlay"
        />
        <div className="flex flex-col items-center justify-center w-full h-full gap-5">
          <h1 className="text-5xl lg:text-7xl font-bold uppercase text-white shadow-sm">
            Find Your Next Home
          </h1>

          <button className="bg-yellow-500 text-white font-bold px-5 py-3 shadow-sm uppercase rounded-lg">
            See all properties
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero
