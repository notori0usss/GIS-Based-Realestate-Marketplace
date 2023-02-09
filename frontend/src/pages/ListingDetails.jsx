import React, { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useImmerReducer } from "use-immer"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import Axios from "axios"
import Loading from "../layout/Loading"
import {
  MdBed,
  FaCarSide,
  TbGridDots,
  FaPhone,
  FaPhoneAlt,
} from "react-icons/all"
import { Fade, Zoom } from "react-slideshow-image"

import "react-slideshow-image/dist/styles.css"
import NearbyProperty from "../components/NearbyProperty"
import StateContext from "../context/StateContext"
function ListingDetails() {
  const navigate = useNavigate()
  const params = useParams()
  const userId = localStorage.getItem("theUserId")
  console.log(userId)
  const initialState = {
    listingInfo: "",
    allListingInfo: "",
    dataIsLoading: true,
    userInfo: "",
  }
  function ReducerFunction(draft, action) {
    switch (action.type) {
      case "catchAllListingInfo":
        draft.allListingInfo = action.allListingObject
        break
      case "catchListingInfo":
        draft.listingInfo = action.listingObject
        break
      case "loadingDone":
        draft.dataIsLoading = false
        break
      case "catchUserInfo":
        draft.userInfo = action.userObject
        break
    }
  }
  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState)
  useEffect(() => {
    async function GetListingInfo() {
      try {
        const response = await Axios.get(
          `http://127.0.0.1:8000/api/listings/${params.id}/`
        )
        console.log(response.data)
        dispatch({ type: "loadingDone" })
        dispatch({ type: "catchListingInfo", listingObject: response.data })
      } catch (e) {
        console.log(e)
      }
    }
    GetListingInfo()
  }, [params.id, state.listingInfo.picture1])

  useEffect(() => {
    async function GetAllListingInfo() {
      try {
        const response = await Axios.get("http://127.0.0.1:8000/api/listings/")
        dispatch({
          type: "catchAllListingInfo",
          allListingObject: response.data,
        })
      } catch (e) {
        console.log(e)
      }
    }
    GetAllListingInfo()
  }, [])

  useEffect(() => {
    async function GetUserInfo() {
      if (state.listingInfo.seller) {
        try {
          const response = await Axios.get(
            `http://127.0.0.1:8000/api/profiles/${state.listingInfo.seller}/`
          )
          dispatch({ type: "catchUserInfo", userObject: response.data })
        } catch (e) {
          console.log(e)
        }
      }
    }

    GetUserInfo()
  }, [state.listingInfo.seller])

  if (state.dataIsLoading === true) {
    return <Loading />
  }
  const images = [
    state.listingInfo.picture1,
    state.listingInfo.picture2,
    state.listingInfo.picture3,
    state.listingInfo.picture4,
    state.listingInfo.picture5,
  ].filter((picture) => picture !== null)

  return (
    <>
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
              <div>
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
              </div>
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
                {!state.listingInfo.pool &&
                  !state.listingInfo.furnished &&
                  !state.listingInfo.elevator &&
                  !state.listingInfo.cctv && (
                    <div className="bg-red-300 px-3 py-2 text-lg font-semibold rounded-xl">
                      Opps! No description available.
                    </div>
                  )}
                {state.listingInfo.pool && (
                  <div className="bg-teal-300 px-3 py-2 text-lg font-semibold rounded-xl">
                    Pool
                  </div>
                )}
                {state.listingInfo.furnished && (
                  <div className="bg-yellow-300 px-3 py-2 text-lg font-semibold rounded-xl">
                    Furnished
                  </div>
                )}
                {state.listingInfo.elevator && (
                  <div className="bg-gray-700 px-3 py-2 text-lg font-semibold rounded-xl text-white">
                    Elevator
                  </div>
                )}
                {state.listingInfo.cctv && (
                  <div className="bg-red-500 px-3 py-2 text-lg font-semibold rounded-xl text-white">
                    CCTV
                  </div>
                )}
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
                    className="w-20 h-20 rounded-full bg-black object-cover"
                    src={state.userInfo?.profile_picture}
                    alt=""
                  />
                  <div>
                    <h2 className="text-lg font-semibold">
                      {state.userInfo.agency_name}
                    </h2>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaPhoneAlt className="text-sm" />
                      {state.userInfo.phone_number}
                    </div>
                  </div>
                </div>
                <button
                  className="px-5 py-5 text-center w-full text-blue-500 underline font-bold "
                  onClick={() => navigate(`/agencies/${state.userInfo.seller}`)}
                >
                  View Profile
                </button>

                <div className="text-gray-500">{state.userInfo.bio}</div>
                {Number(userId) === Number(state.userInfo.seller) ? (
                  <div className="flex items-center mt-5 gap-3">
                    <h2 className="font-semibold">Make Changes: </h2>
                    <button className="px-4 py-1 font-semibold text-teal-500 bg-white border-2 border-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-200 rounded-3xl">
                      Edit
                    </button>
                    <button className="px-4 py-1 font-semibold text-red-500 bg-white border-2 border-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 rounded-3xl">
                      Delete
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center mt-5 gap-3">
                    <h2 className="font-semibold">Contact Host: </h2>
                    <button className="px-4 py-1 font-semibold text-blue-500 bg-white border-2 border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-200 rounded-3xl">
                      Chat
                    </button>
                    <button className="px-4 py-1 font-semibold text-blue-500 bg-white border-2 border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-200 rounded-3xl">
                      Email
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full bg-[#f7fdfe] border-2 rounded-lg px-3 py-5">
              <h1 className="text-xl font-semibold">Properties Nearby</h1>
              {Array.from(state.allListingInfo)
                .slice(0, 3)
                .map((item) => (
                  <NearbyProperty {...item} key={item.id} />
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="h-[80vh] grid grid-cols-4 rounded-lg p-12 bg-[#f7fdfe]">
        <div>Pois</div>
        <div className="col-span-3">
          <MapContainer
            center={[state.listingInfo.latitude, state.listingInfo.longitude]}
            zoom={15}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[
                state.listingInfo.latitude,
                state.listingInfo.longitude,
              ]}
            >
              <Popup>{state.listingInfo.title}</Popup>
            </Marker>
            {state.listingInfo.listing_pois_within_10km.map((poi) => (
              <Marker
                key={poi.id}
                position={[
                  poi.location.coordinates[0],
                  poi.location.coordinates[1],
                ]}
              >
                <Popup>{poi.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </>
  )
}

export default ListingDetails
