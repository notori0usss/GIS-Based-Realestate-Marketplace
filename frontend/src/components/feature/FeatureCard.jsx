import React from "react"
import { featured } from "../../data/feature"
function FeatureCard() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-y-10 lg:gap-x-10">
      {featured.map((feature, index) => {
        return (
          <div
            key={index}
            className="flex flex-col items-center justify-center gap-1 bg-white w-[15rem] h-[13rem] rounded-md shadow-xl"
          >
            <img src={feature.cover} alt={feature.name} className="w-16 h-16" />
            <h1 className="text-lg font-semibold mt-4">{feature.name}</h1>
            <p className="text-gray-500">{feature.total} Property</p>
          </div>
        )
      })}
    </div>
  )
}

export default FeatureCard
