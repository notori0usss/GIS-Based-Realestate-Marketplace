import React, { useState, useEffect } from "react"
import Heading from "./Heading"
import LikeProductCard from "./LikeProductCard"

function Recommended({ allListings }) {
  return (
    <div
      style={{ clipPath: "polygon(0 5%, 100% 0%, 100% 93%, 0 90%)" }}
      className="flex items-center flex-col px-5 pt-16 bg-white pb-40"
    >
      <Heading
        title="Recommended for You"
        subtitle="Properties close to you are recommended."
      />

      <div className="grid grid-cols-3 gap-5">
        {allListings &&
          Array.from(allListings)
            .slice(0, 3)
            .map((item) => (
              <div className="h-30 w-30" key={item.id}>
                <LikeProductCard {...item} />
              </div>
            ))}
      </div>
    </div>
  )
}

export default Recommended
