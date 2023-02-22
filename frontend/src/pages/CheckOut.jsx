import React, { useState, useEffect } from "react"
import BgImg from "../assets/bgimg.png"
import { useNavigate } from "react-router-dom"
import { IoMdArrowRoundBack } from "react-icons/io"
export default function CheckOut() {
  const navigate = useNavigate()
  return (
    <div className="xl:mx-auto xl:container px-6">
      <nav className="rounded-md w-full">
        <ol className="list-reset flex py-4">
          <li>
            <button
              onClick={() => {
                navigate("/")
              }}
              className="text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-2"
            >
              <IoMdArrowRoundBack /> Back
            </button>
          </li>
        </ol>
      </nav>
      <div className="lg:flex items-center justify-between">
        <div className=" lg:w-1/2 w-full">
          <p className="text-base leading-4 text-gray-600">Choose your plan</p>
          <h1
            role="heading"
            className="md:text-5xl text-3xl font-bold leading-10 mt-3 text-gray-800"
          >
            Our pricing plan
          </h1>
          <p
            role="contentinfo"
            className="text-base leading-5 mt-5 text-gray-600"
          >
            We’re working on a suit of tools to make managing complex systems
            easier, for everyone for free. we can’t wait to hear what you think
          </p>
        </div>
        <div
          className="xl:w-1/2 lg:w-7/12 relative w-full lg:mt-0 mt-12 md:px-8"
          role="list"
        >
          <img
            src={BgImg}
            className="absolute w-full -ml-12 mt-24 hue-rotate-30"
            alt="background circle images"
          />
          <div
            role="listitem"
            className="bg-white cursor-pointer shadow rounded-lg p-8 relative z-30 mt-12 "
          >
            <div
              className="md:flex items-center justify-between"
              onClick={() => navigate("/addProperty")}
            >
              <h2 className="text-2xl font-semibold leading-6 text-gray-800">
                Starter
              </h2>
              <p className="text-2xl font-semibold md:mt-0 mt-4 leading-6 text-gray-800">
                FREE
              </p>
            </div>
            <p className="md:w-80 text-base leading-6 mt-4 text-gray-600">
              Full access to all features except add listing.
            </p>
          </div>
          <div
            role="listitem"
            className="bg-white cursor-pointer shadow rounded-lg mt-4 flex relative z-30"
          >
            <div className="w-2.5 h-auto bg-blue-500 rounded-tl-md rounded-bl-md" />
            <div className="w-full p-8">
              <div className="md:flex items-center justify-between relative">
                <form
                  action="http://127.0.0.1:8000/api/stripe/create-checkout-session"
                  method="POST"
                >
                  <button type="submit">
                    <h2 className="text-2xl font-semibold leading-6 text-gray-800">
                      Premium
                    </h2>
                    <div className="absolute right-0 top-0">
                      <p className="text-xl md:mt-0 mt-4 font-semibold leading-6  bg-blue-500 rounded-lg p-3 text-white ">
                        RS. 5000
                      </p>
                    </div>
                  </button>
                </form>
              </div>
              <p className="md:w-80 text-base leading-6 mt-4 text-gray-600">
                Unlimited posting of your Realestate Properties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
