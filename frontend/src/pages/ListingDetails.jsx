import React, { useContext, useEffect, useLayoutEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useImmerReducer } from "use-immer"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import Axios from "axios"
import StateContext from "../context/StateContext"

import Loading from "../layout/Loading"
import {
  MdBed,
  FaCarSide,
  TbGridDots,
  FaPhone,
  FaPhoneAlt,
  FaShower,
  FaDirections,
} from "react-icons/all"
import { Fade, Zoom } from "react-slideshow-image"

import "react-slideshow-image/dist/styles.css"
import NearbyProperty from "../components/NearbyProperty"
import stadiumIconPng from "../assets/map-icons/stadium.png"
import universityIconPng from "../assets/map-icons/university.png"
import restaurantIconPng from "../assets/map-icons/restaurant.png"
import hospitalIconPng from "../assets/map-icons/hospital.png"
import airportIconPng from "../assets/map-icons/airport.png"
import saleIconPng from "../assets/map-icons/sale.png"

import { Icon, icon } from "leaflet"
import DeleteModel from "../layout/DeleteModel"
import Agent from "../assets/agent.png"
import UpdateModel from "../layout/UpdateModel"
import BookingModel from "../layout/BookingModel"
import Comments from "../components/Comments"
import LeafletRoutingMachine from "../components/LeafletRoutingMachine"
function ListingDetails() {
  const GlobalState = useContext(StateContext)

  const stadiumIcon = new Icon({
    iconUrl: stadiumIconPng,
    iconSize: [40, 40],
  })
  const universityIcon = new Icon({
    iconUrl: universityIconPng,
    iconSize: [40, 40],
  })
  const hospitalIcon = new Icon({
    iconUrl: hospitalIconPng,
    iconSize: [40, 40],
  })
  const restaurantIcon = new Icon({
    iconUrl: restaurantIconPng,
    iconSize: [40, 40],
  })
  const airportIcon = new Icon({
    iconUrl: airportIconPng,
    iconSize: [40, 40],
  })
  const saleIcon = new Icon({
    iconUrl: saleIconPng,
    iconSize: [40, 40],
  })

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
  const [poiLocation, setPoiLocation] = useState([
    state.listingInfo.latitude,
    state.listingInfo.longitude,
  ])

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
  }, [params.id, state.listingInfo.picture1, poiLocation])

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
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [params.id])

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

  const images = [
    state.listingInfo.picture1,
    state.listingInfo.picture2,
    state.listingInfo.picture3,
    state.listingInfo.bedroomPicture1,
    state.listingInfo.bedroomPicture2,
    state.listingInfo.bathPicture1,
    state.listingInfo.bathPicture2,
  ].filter((picture) => picture !== null)

  const onCommentSubmit = (singleComment) => {
    const newComment = {
      userId: GlobalState.userId,
      userName: GlobalState.userUsername,
      profilePicture: GlobalState.userProfilePicture,
      commentText: singleComment,
      time_posted: Date.now(),
      verified: GlobalState.isSubscribed,
      likes: 0,
    }
    // setComments([...comments, newComment])
    Axios.patch(`http://127.0.0.1:8000/api/listings/${params.id}/update/`, {
      comments: [...state.listingInfo.comments, newComment],
    })
      .then((response) => {
        // Update the state with the new comment
        console.log(response.data)
        dispatch({ type: "catchListingInfo", listingObject: response.data })
      })
      .catch((error) => console.error(error))
  }

  const deleteComment = (index) => {
    let comments = state.listingInfo.comments.filter((item, id) => id !== index)
    // setComments([...comments, newComment])
    Axios.patch(`http://127.0.0.1:8000/api/listings/${params.id}/update/`, {
      comments: comments,
    })
      .then((response) => {
        // Update the state with the new comment
        console.log(response.data)
        dispatch({ type: "catchListingInfo", listingObject: response.data })
      })
      .catch((error) => console.error(error))
  }

  if (state.dataIsLoading === true) {
    return <Loading />
  }
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
                  className="text-blue-600 hover:text-blue-700 hover:underline"
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
              <div className="relative">
                {images.map((image, index) => (
                  <>
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
                    <div className="absolute top-[50%] bg-white opacity-50 w-full text-center h-8 text-sm overflow-hidden">
                      @DigiDalal
                    </div>
                  </>
                ))}
              </div>
            ) : (
              <Fade>
                {images.map((image, index) => (
                  <>
                    <img
                      key={index}
                      style={{
                        width: "100%",
                        height: "70vh",
                        objectFit: "cover",
                        margin: "auto",
                        position: "relative",
                      }}
                      src={image}
                    />
                    <div className="absolute top-[50%] bg-white opacity-50 w-full text-center h-8 text-sm">
                      @DigiDalal
                    </div>
                  </>
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
                {state.listingInfo.property_status === "Rent" ? (
                  <>
                    <span className="text-4xl ml-4">
                      {state.listingInfo.price} /{" "}
                      <span className="text-2xl text-gray-700">
                        {state.listingInfo.rental_frequency}
                      </span>
                    </span>
                  </>
                ) : (
                  <span className="text-4xl ml-4">
                    {state.listingInfo.price}
                  </span>
                )}
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
                <div className="font-semibold text-xl">Bathrooms</div>
                <div className="flex items-center gap-3">
                  <FaShower className="text-2xl text-gray-500" />{" "}
                  <span className="text-lg text-gray-500">
                    {" "}
                    {state.listingInfo.bathroom
                      ? state.listingInfo.bathroom
                      : 0}
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
                {userId == state.userInfo.seller ? (
                  <div className="flex items-center mt-5 gap-3">
                    <h2 className="font-semibold">Make Changes: </h2>
                    <UpdateModel listingInfo={state.listingInfo} />
                    <DeleteModel />
                  </div>
                ) : (
                  <div className="flex items-center mt-5 gap-3">
                    <h2 className="font-semibold">Contact Host: </h2>
                    <button className="px-4 py-1 font-semibold text-blue-500 bg-white border-2 border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-200 rounded-3xl">
                      Chat
                    </button>
                    <BookingModel />
                  </div>
                )}
              </div>
            </div>
            <div className="w-full bg-[#f7fdfe] border-2 rounded-lg px-3 py-5">
              <h1 className="text-xl font-semibold">Properties Nearby</h1>
              {Array.from(state.listingInfo.listing_within_radius)
                .filter((item) => item.id !== state.listingInfo.id)
                .splice(0, 3)
                .map((item) => (
                  <NearbyProperty {...item} key={item.id} />
                ))}
            </div>
          </div>
          <div className="mt-4 bg-[#f7fdfe] border-2 w-full rounded-lg px-4 py-8 relative h-[50vh]">
            <img
              src={Agent}
              alt=""
              className="absolute w-1/2 right-0 object-cover h-2/3 bottom-0"
            />
            <div className="flex flex-col gap-5 items-start w-full h-full">
              <div className="text-2xl font-semibold">
                Confused What you Looking for?
              </div>
              <p className="text-gray-500">
                Don't Worry! Compare Properties here!
              </p>
              <button
                onClick={() => navigate(`/compare/${state.listingInfo.id}`)}
                className="justify-self-center mt-16 rounded-2xl px-6 py-2 bg-blue-500 text-white font-semibold hover:bg-blue-400"
              >
                Compare Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[80vh] grid grid-cols-4 rounded-lg p-12 bg-[#f7fdfe]">
        <div className="flex items-center flex-col gap-5">
          {state.listingInfo.listing_pois_within_radius !== "" ? (
            state.listingInfo?.listing_pois_within_radius.map((poi) => {
              function DegreeToRadian(coordinate) {
                return (coordinate * Math.PI) / 180
              }
              function CalculateDistance() {
                const latitude1 = DegreeToRadian(state.listingInfo.latitude)
                const longitude1 = DegreeToRadian(state.listingInfo.longitude)

                const latitude2 = DegreeToRadian(poi.location.coordinates[0])
                const longitude2 = DegreeToRadian(poi.location.coordinates[1])

                // The formula
                const latDiff = latitude2 - latitude1
                const lonDiff = longitude2 - longitude1
                const R = 6371000 / 1000

                const a =
                  Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
                  Math.cos(latitude1) *
                    Math.cos(latitude2) *
                    Math.sin(lonDiff / 2) *
                    Math.sin(lonDiff / 2)
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

                const d = R * c

                const dist =
                  Math.acos(
                    Math.sin(latitude1) * Math.sin(latitude2) +
                      Math.cos(latitude1) *
                        Math.cos(latitude2) *
                        Math.cos(lonDiff)
                  ) * R
                return dist.toFixed(2)
              }
              return (
                <div className="border-2 w-full px-2 py-4 flex items-center justify-between rounded-lg">
                  <div>
                    <div className="text-xl font-semibold">{poi.name}</div>
                    <div>
                      {poi.type} |{CalculateDistance()} Kilometers
                    </div>
                  </div>
                  <FaDirections
                    className="text-4xl text-blue-500 cursor-pointer hover:text-blue-600"
                    onClick={() =>
                      setPoiLocation([
                        poi.location.coordinates[0],
                        poi.location.coordinates[1],
                      ])
                    }
                  />
                </div>
              )
            })
          ) : (
            <div className="bg-red-300 px-3 py-2 text-lg font-semibold rounded-xl">
              Oops! No description available.
            </div>
          )}
        </div>
        <div className="col-span-3 z-0">
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
              icon={saleIcon}
            >
              <Popup>{state.listingInfo.title}</Popup>
            </Marker>
            {state.listingInfo.listing_pois_within_radius.map((poi) => {
              function PoiIcon() {
                if (poi.type === "Stadium") {
                  return stadiumIcon
                } else if (poi.type === "Hospital") {
                  return hospitalIcon
                } else if (poi.type === "University") {
                  return universityIcon
                } else if (poi.type === "Resturant") {
                  return restaurantIcon
                } else if (poi.type === "Airport") {
                  return airportIcon
                }
              }
              return (
                <Marker
                  key={poi.id}
                  className="z-10"
                  position={[
                    poi.location.coordinates[0],
                    poi.location.coordinates[1],
                  ]}
                  icon={PoiIcon()}
                >
                  <Popup>{poi.name}</Popup>
                </Marker>
              )
            })}
            <LeafletRoutingMachine
              propertyLocation={[
                state.listingInfo.latitude,
                state.listingInfo.longitude,
              ]}
              poiLocation={poiLocation}
            />
          </MapContainer>
        </div>
      </div>
      <div className="bg-[#f7fdfe]">
        <Comments
          listingInfo={state.listingInfo}
          onCommentSubmit={onCommentSubmit}
          deleteComment={deleteComment}
        />
      </div>
    </>
  )
}

export default ListingDetails
