import React from "react"
import FeatureCard from "./FeatureCard"
import Heading from "../Heading"

function Feature({ allListings }) {
  return (
    <div className="my-10 flex flex-col items-center ">
      <Heading
        title="Featured Property Types"
        subtitle="Find All Type of Property."
      />
      <FeatureCard allListings={allListings} />
    </div>
  )
}

export default Feature
