import React, { useState, useEffect } from "react"
import Heading from "./Heading"
import ProductCard from "../layout/ProductCard"

function Recommended({ allListings }) {
  return (
    <div className="flex items-center flex-col px-5 py-5">
      <Heading
        title="Recommended for You"
        subtitle="Properties close to you are recommended."
      />

      <div className="grid grid-cols-3 gap-5">
        {allListings &&
          allListings.map((item) => (
            <div className="h-30 w-30" key={item.id}>
              <ProductCard {...item} />
            </div>
          ))}
      </div>
    </div>
  )
}

export default Recommended
