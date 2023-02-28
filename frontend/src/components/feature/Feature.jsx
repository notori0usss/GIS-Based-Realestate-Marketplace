import React, { useRef } from "react"
import FeatureCard from "./FeatureCard"
import Heading from "../Heading"
import { motion as m } from "framer-motion"
import { useInView } from "framer-motion"
function Feature({ allListings }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  return (
    <m.div
      ref={ref}
      style={{
        transform: isInView ? "none" : "scale(0.8)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
      }}
      className="my-10 flex flex-col items-center "
    >
      <Heading
        title="Featured Property Types"
        subtitle="Find All Type of Property."
      />
      <FeatureCard allListings={allListings} />
    </m.div>
  )
}

export default Feature
