import React from "react"
import FeatureCard from "./FeatureCard"
import Heading from "../Heading"

function Feature() {
  return (
    <div className="my-20 flex flex-col items-center ">
      <Heading
        title="Featured Property Types"
        subtitle="Find All Type of Property."
      />
      <FeatureCard />
    </div>
  )
}

export default Feature
