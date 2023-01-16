import React from "react"
import Heading from "../../common/Heading"
import "./hero.css"
import TypeWriterEffect from "react-typewriter-effect"
const Hero = () => {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="heading">
            <h1 className="flex">
              <TypeWriterEffect
                startDelay={500}
                cursorColor="#3F3D56"
                multiText={["Find", "Buy", "Sell", "Get"]}
                multiTextDelay={1000}
                typeSpeed={50}
              />
              Your Next Home
            </h1>
            <p>Find new & featured property located in your local city.</p>
          </div>

          <form className="flex">
            <div className="box">
              <span>City/Street</span>
              <input type="text" placeholder="Location" />
            </div>
            <div className="box">
              <span>Property Type</span>
              <input type="text" placeholder="Property Type" />
            </div>
            <div className="box">
              <span>Price Range</span>
              <input type="text" placeholder="Price Range" />
            </div>
            <div className="box">
              <h4>Advance Filter</h4>
            </div>
            <button className="btn1">
              <i className="fa fa-search"></i>
            </button>
          </form>
        </div>
      </section>
    </>
  )
}

export default Hero
