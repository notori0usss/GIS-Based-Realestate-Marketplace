import React, { useState, useEffect, useRef, useContext } from "react"
import Heading from "./Heading"
import LikeProductCard from "./LikeProductCard"
import { motion as m } from "framer-motion"
import { useInView } from "framer-motion"
import StateContext from "../context/StateContext"
import RecommendedCard from "./RecommendedCard"
function Recommended({ allListings, userInfo }) {
  console.log(userInfo.listing_within_my_radius)
  const [sliceValue, setSliceValue] = useState(3)
  const [toggleSlice, setToggleSlice] = useState(false)
  const GlobalState = useContext(StateContext)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  return (
    <div
      style={{
        clipPath: "polygon(0 5%, 100% 0%, 100% 93%, 0 90%)",
      }}
      className="flex items-center justify-center flex-col px-5 pt-16 bg-white pb-40"
    >
      <Heading
        title="Recommended for You"
        subtitle="Properties close to you are recommended."
      />

      <m.div
        ref={ref}
        className="flex flex-wrap w-full justify-center gap-5"
        style={{
          transform: isInView ? "none" : "translateX(-100px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
        }}
      >
        {GlobalState.userIsLogged && userInfo.latitude && userInfo.longitude ? (
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex flex-wrap gap-10 justify-center">
              {userInfo.listing_within_my_radius &&
                userInfo.listing_within_my_radius
                  .filter((el) => el.seller != GlobalState.userId)
                  .slice(0, sliceValue)
                  .map((item) => (
                    <div className="h-30 w-30" key={item.id}>
                      <RecommendedCard {...item} userInfo={userInfo} />
                    </div>
                  ))}
            </div>
            {!toggleSlice ? (
              <button
                className="text-lg font-semibold text-blue-500 underline hover:text-blue-600"
                onClick={() => {
                  setSliceValue(6)
                  setToggleSlice(!toggleSlice)
                }}
              >
                Show More
              </button>
            ) : (
              <button
                className="text-lg font-semibold text-blue-500 underline hover:text-blue-600"
                onClick={() => {
                  setSliceValue(3)
                  setToggleSlice(!toggleSlice)
                }}
              >
                Show Less
              </button>
            )}
          </div>
        ) : (
          <>
            {allListings &&
              Array.from(allListings)
                .slice(0, 3)
                .map((item) => (
                  <div className="h-30 w-30" key={item.id}>
                    <LikeProductCard {...item} />
                  </div>
                ))}
          </>
        )}
      </m.div>
    </div>
  )
}

export default Recommended
