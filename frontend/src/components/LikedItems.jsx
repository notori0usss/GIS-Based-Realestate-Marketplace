import React from "react"
import { FaHeart } from "react-icons/fa"
import LikeProductCard from "./LikeProductCard"
function LikedItems() {
  return (
    <div className="container mx-auto max-w-3xl py-4 px-4">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold">See Your Liked Properties</h2>
        <LikeProductCard />
      </div>
    </div>
  )
}

export default LikedItems
