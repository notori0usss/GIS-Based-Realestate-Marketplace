import React, { useState, useEffect } from "react"
import Heading from "./Heading"
import ProductCard from "../layout/ProductCard"

function Recommended({ allListings }) {
  return (
    <div className="flex items-center flex-col px-5 ">
      <Heading
        title="Recommended for You"
        subtitle="Properties close to you are recommended."
      />

      <div className="flex items-center justify-center gap-5 w-full">
        {allListings &&
          allListings.map((item) => (
            <ProductCard
              className="w-10 max-w-2 max-h-4"
              key={item.id}
              {...item}
            />
          ))}
      </div>
    </div>
  )
}

export default Recommended
