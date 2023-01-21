import React from "react"
import Navbar from "../layout/Navbar"
import Hero from "../components/Hero"
import Feature from "../components/feature/Feature"
import Recommended from "../components/Recommended"

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Feature />
      <Recommended />
    </>
  )
}

export default Home
