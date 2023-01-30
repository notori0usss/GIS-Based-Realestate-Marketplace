import React from "react"
import { featured } from "../../data/feature"
function FeatureCard({ allListings }) {
  console.log(allListings)
  const listingInfo = allListings.reduce((rType, property) => {
    const { A = 0, O = 0, H = 0 } = rType
    if (property.listing_type === "Office") {
      return { ...rType, O: O + 1 }
    } else if (property.listing_type === "Apartment") {
      return { ...rType, A: A + 1 }
    } else if (property.listing_type === "House") {
      return { ...rType, H: H + 1 }
    }
  }, {})
  console.log(listingInfo)
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-y-10 lg:gap-x-10">
      <div className="flex flex-col items-center justify-center gap-1 bg-white w-[15rem] h-[13rem] rounded-md shadow-xl">
        <img src="../feature/h4.png" alt="das" className="w-16 h-16" />
        <h1 className="text-lg font-semibold mt-4">Office</h1>
        <p className="text-gray-500">{listingInfo.O} Property</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-1 bg-white w-[15rem] h-[13rem] rounded-md shadow-xl">
        <img src="../feature/h3.png" alt="das" className="w-16 h-16" />
        <h1 className="text-lg font-semibold mt-4">Apartment</h1>
        <p className="text-gray-500">{listingInfo.A} Property</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-1 bg-white w-[15rem] h-[13rem] rounded-md shadow-xl">
        <img src="../feature/h2.png" alt="das" className="w-16 h-16" />
        <h1 className="text-lg font-semibold mt-4">House</h1>
        <p className="text-gray-500">{listingInfo.H} Property</p>
      </div>
    </div>
  )
}

export default FeatureCard
