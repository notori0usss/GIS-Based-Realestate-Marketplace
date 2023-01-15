import React from "react"
import TypeWriterEffect from "react-typewriter-effect"
function Hero() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[80vh] bg-hero]">
      <h1 className="text-7xl font-bold flex items-center justify-center gap-x-3 flex-row">
        <TypeWriterEffect
          startDelay={100}
          cursorColor="black"
          multiText={["Sell", "Buy", "Rent"]}
          multiTextDelay={1000}
          typeSpeed={50}
          hideCursorAfterText="true"
        />{" "}
        Your Next Property
      </h1>
      <p>Find new & featured property located in your local city.</p>
    </div>
  )
}

export default Hero
