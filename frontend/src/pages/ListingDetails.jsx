import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useImmerReducer } from "use-immer"
import Axios from "axios"
import Loading from "../layout/Loading"
import { MdBed, FaCarSide, TbGridDots } from "react-icons/all"
import { Fade, Zoom } from "react-slideshow-image"

import "react-slideshow-image/dist/styles.css"
import NearbyProperty from "../components/NearbyProperty"
function ListingDetails() {
  const navigate = useNavigate()
  const params = useParams()
  const initialState = {
    lisitingInfo: "",
    dataIsLoading: true,
  }
  function ReducerFunction(draft, action) {
    switch (action.type) {
      case "catchListingInfo":
        draft.listingInfo = action.listingObject
        break
      case "loadingDone":
        draft.dataIsLoading = false
        break
    }
  }

  useEffect(() => {
    async function GetListingInfo() {
      try {
        const response = await Axios.get(
          `http://127.0.0.1:8000/api/listings/${params.id}/`
        )

        dispatch({ type: "loadingDone" })
        dispatch({ type: "catchListingInfo", listingObject: response.data })
      } catch (e) {
        console.log(e)
      }
    }
    GetListingInfo()
  }, [])
  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState)
  //form submit

  if (state.dataIsLoading === true) {
    return <Loading />
  }
  console.log(state.listingInfo)
  const images = [
    state.listingInfo.picture1,
    state.listingInfo.picture2,
    state.listingInfo.picture3,
    state.listingInfo.picture4,
    state.listingInfo.picture5,
  ].filter((picture) => picture !== null)
  return (
    <div className="grid grid-cols-4 gap-4 px-2 py-2 bg-white">
      <div className="bg-[#f7fdfe] border-2 col-span-3">
        <nav className="rounded-md w-full">
          <ol className="list-reset flex py-4 px-4">
            <li>
              <button
                onClick={() => {
                  navigate("/listings")
                }}
                className="text-yellow-600 hover:text-yellow-700"
              >
                Listing
              </button>
            </li>
            <li>
              <span className="text-gray-500 mx-2">/</span>
            </li>
            <li className="text-gray-500">Property{params.id}</li>
          </ol>
        </nav>
        <div className="slide-container overflow-hidden px-20">
          {images.length === 1 ? (
            <Fade autoplay={false} arrows={false}>
              {images.map((image, index) => (
                <img
                  key={index}
                  style={{
                    width: "100%",
                    height: "70vh",
                    objectFit: "cover",
                    margin: "auto",
                  }}
                  src={image}
                />
              ))}
            </Fade>
          ) : (
            <Fade>
              {images.map((image, index) => (
                <img
                  key={index}
                  style={{
                    width: "100%",
                    height: "70vh",
                    objectFit: "cover",
                    margin: "auto",
                  }}
                  src={image}
                />
              ))}
            </Fade>
          )}
        </div>

        <div className="px-20 py-10">
          <div className="flex flex-row justify-between items-center py-2">
            <div className="flex gap-3 font-semibold items-end">
              <h1 className="text-4xl">{state.listingInfo.title}</h1>
              <h2 className="text-2xl text-gray-500">
                {state.listingInfo.listing_type} /
                {state.listingInfo.property_status}
              </h2>
            </div>
            <h2 className="text-2xl font-semibold">
              Price:{" "}
              <span className="text-4xl ml-4">{state.listingInfo.price}</span>
            </h2>
          </div>
          <div className="text-gray-500 font-semibold flex">
            {state.listingInfo.municipality
              ? state.listingInfo.municipality
              : "--"}
            , {state.listingInfo.area}
          </div>
          <div className="mt-10 flex gap-20 items-center">
            <div>
              <div className="font-semibold text-xl">Rooms</div>
              <div className="flex items-center gap-3">
                <MdBed className="text-2xl text-gray-500" />{" "}
                <span className="text-lg text-gray-500">
                  {state.listingInfo.rooms}
                </span>
              </div>
            </div>
            <div>
              <div className="font-semibold text-xl">Parking</div>
              <div className="flex items-center gap-3">
                <FaCarSide className="text-2xl text-gray-500" />{" "}
                <span className="text-lg text-gray-500">
                  {" "}
                  {state.listingInfo.parking ? state.listingInfo.parking : 0}
                </span>
              </div>
            </div>
            <div>
              <div className="font-semibold text-xl">Area</div>
              <div className="flex items-center gap-3">
                <TbGridDots className="text-2xl text-gray-500" />{" "}
                <span className="text-lg text-gray-500">
                  {state.listingInfo.property_area}.sqft
                </span>
              </div>
            </div>
          </div>
          <div className="mt-16 w-2/3">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p>{state.listingInfo.description}</p>
          </div>
          <div className="mt-16 w-2/3">
            <h2 className="text-2xl font-semibold">Facilities</h2>
            <div className="flex gap-10 my-3">
              <div className="bg-teal-300 px-3 py-2 text-lg font-semibold rounded-xl">
                Pool
              </div>
              <div className="bg-yellow-300 px-3 py-2 text-lg font-semibold rounded-xl">
                Furnished
              </div>
              <div className="bg-gray-700 px-3 py-2 text-lg font-semibold rounded-xl text-white">
                Elevator
              </div>
              <div className="bg-red-500 px-3 py-2 text-lg font-semibold rounded-xl text-white">
                CCTV
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-4 flex-1">
          <div className="bg-[#f7fdfe] border-2 w-full rounded-lg px-4 py-4">
            {/* Profile */}
            <div className="py-4 w-full ">
              <div className="flex gap-2 items-center">
                <img
                  className="w-20 h-20 rounded-full bg-black"
                  src=""
                  alt=""
                />
                <div>
                  <h2>Swaroop Agency</h2>
                  <p>Date Joined</p>
                </div>
              </div>
              <button className="px-5 py-5 text-center w-full text-yellow-500 underline font-bold ">
                View Profile
              </button>
              <div className="text-gray-500">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet
                eligendi tenetur facilis accusamus harum labore aut natus
                quaerat deleniti? Accusantium.
              </div>
              <div className="flex items-center mt-5 gap-3">
                <h2 className="font-semibold">Contact with Host: </h2>
                <button className="px-4 py-1 font-semibold text-yellow-500 bg-white border-2 border-yellow-500 hover:bg-yellow-500 hover:text-white transition-all duration-200 rounded-3xl">
                  Chat
                </button>
                <button className="px-4 py-1 font-semibold text-yellow-500 bg-white border-2 border-yellow-500 hover:bg-yellow-500 hover:text-white transition-all duration-200 rounded-3xl">
                  Email
                </button>
              </div>
            </div>
          </div>
          <div className="w-full bg-[#f7fdfe] border-2 rounded-lg px-3 py-5">
            <h1 className="text-xl font-semibold">Properties Nearby</h1>
            <NearbyProperty />
            <NearbyProperty />
            <NearbyProperty />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListingDetails
