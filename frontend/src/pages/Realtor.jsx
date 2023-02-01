import React from "react"
import Heading from "../components/Heading"
import RealtorCard from "../components/RealtorCard"

function Realtor() {
  return (
    <div className="flex items-center justify-center flex-col mt-10">
      <Heading
        title={"Our Best Realtors"}
        subtitle={"Hire with Just one Text"}
      />
      <div className="flex gap-10">
        <RealtorCard />
        <RealtorCard />
        <RealtorCard />
        <RealtorCard />
      </div>
    </div>
  )
}

export default Realtor
