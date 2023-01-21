import React from "react"
import Heading from "./Heading"
import ProductCard from "../layout/ProductCard"

function Recommended() {
  return (
    <div className="flex flex-col items-center justify-center mt-12 bg-white py-12">
      <Heading
        title="Recommended for You"
        subtitle="Properties You May Like."
      />
      <ProductCard />
    </div>
  )
}

export default Recommended
