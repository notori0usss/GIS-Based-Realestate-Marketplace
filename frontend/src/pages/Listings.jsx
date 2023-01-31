import useGeolocation from "../hooks/useGeolocation"
import React, { useContext, useState, useRef } from "react"
import Navbar from "../layout/Navbar"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { Icon } from "leaflet"

import Axios from "axios"

import houseIconPng from "../assets/map-icons/house.png"
import officeIconPng from "../assets/map-icons/office.png"
import apartmentIconPng from "../assets/map-icons/apartment.png"
import userIconPng from "../assets/map-icons/location.png"
import List1 from "../assets/listings/img1.jpg"
import ProductCard from "../layout/ProductCard"
// import myListings from "../data/dummyData"
import { useEffect } from "react"
import Loading from "../layout/Loading"
import { ImStack } from "react-icons/im"
import { RiUserLocationFill } from "react-icons/ri"
import StateContext from "../context/StateContext"

function Listings() {
  const location = useGeolocation()
  const mapRef = useRef(null)
  const markerRef = useRef(null)
  const GlobalState = useContext(StateContext)
  const houseIcon = new Icon({
    iconUrl: houseIconPng,
    iconSize: [40, 40],
  })
  const officeIcon = new Icon({
    iconUrl: officeIconPng,
    iconSize: [40, 40],
  })
  const apartmentIcon = new Icon({
    iconUrl: apartmentIconPng,
    iconSize: [40, 40],
  })
  const userIcon = new Icon({
    iconUrl: userIconPng,
    iconSize: [30, 30],
  })

  const ZOOM_LEVEL = 16
  const showMyLocation = () => {
    if (location.loaded && !location.error) {
      mapRef.current.flyTo(
        [location.coordinates.lat, location.coordinates.lng],
        ZOOM_LEVEL,
        { animate: true }
      )
    } else {
      alert(location.error.message)
    }
  }

  const [allListings, setAllListings] = useState([])
  const [dataLoading, setDataLoading] = useState(true)
  const [toggle, setToggle] = useState(false)
  const [mapLayer, setMapLayer] = useState(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
  )

  const handleToggle = () => {
    setToggle(!toggle)
    setMapLayer(
      toggle
        ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    )
  }
  useEffect(() => {
    const source = Axios.CancelToken.source()
    async function GetAllListings() {
      try {
        const listingResponse = await Axios.get(
          "http://127.0.0.1:8000/api/listings/",
          { cancelToken: source.token }
        )

        setDataLoading(false)
        setAllListings(listingResponse.data)
      } catch (error) {
        console.log(error)
      }
    }
    GetAllListings()

    return () => {
      source.cancel
    }
  }, [])
  if (dataLoading === true) {
    return <Loading />
  }
  function navigation() {}
  return (
    <div className="relative">
      <button
        className="absolute z-10 top-[3%] right-[1%] bg-white rounded-md p-2"
        onClick={handleToggle}
      >
        <ImStack className="w-6 h-6 rounded-lg text-black" />
      </button>
      <button
        className="absolute z-10 top-[5%] right-[1%] bg-white rounded-md p-2"
        onClick={showMyLocation}
      >
        <RiUserLocationFill className="w-6 h-6 rounded-lg text-red-700" />
      </button>
      {/* <div className="w-full h-10 rounded-full top-2 bg-gray-600 absolute z-10"></div> */}
      <div className="grid grid-cols-4 grid-rows-1">
        <div className="col-span-1 flex items-center gap-5 justify-start flex-col px-3 py-5 w-full">
          {allListings.map((item) => (
            <ProductCard key={item.id} {...item} ref={mapRef} />
          ))}
        </div>
        <div className="h-[100vh] col-span-3 sticky top-0">
          <MapContainer
            center={[27.712714725156008, 85.34253917397493]}
            zoom={16}
            scrollWheelZoom={true}
            ref={mapRef}
          >
            <TileLayer url={mapLayer} />
            {location.loaded && !location.error && (
              <Marker
                icon={userIcon}
                position={[location.coordinates.lat, location.coordinates.lng]}
              >
                <Popup>
                  Hello!{" "}
                  <span className="text-yellow-500 font-bold cursor-pointer">
                    {GlobalState.userUsername}
                  </span>
                </Popup>
              </Marker>
            )}
            {allListings.map((item) => {
              function IconDisplay() {
                if (item.listing_type === "House") {
                  return houseIcon
                } else if (item.listing_type === "Apartment") {
                  return apartmentIcon
                } else if (item.listing_type === "Office") {
                  return officeIcon
                }
              }
              return (
                <Marker
                  ref={markerRef}
                  key={item.id}
                  icon={IconDisplay()}
                  position={[item.latitude, item.longitude]}
                >
                  <Popup className="w-[20rem]">
                    <div className="flex flex-col w-full gap-1 items-center">
                      <h5 className="text-lg">{item.title}</h5>
                      <img
                        src={item.picture1}
                        alt="listing"
                        className="w-full h-[12rem] object-cover"
                      />
                      <button onClick={navigation}>Goto</button>
                      <p className="w-full truncate">{item.description}</p>
                      <button className="w-full bg-yellow-500 text-white py-3 rounded-lg">
                        See More
                      </button>
                    </div>
                  </Popup>
                </Marker>
              )
            })}
          </MapContainer>
        </div>
      </div>
    </div>
  )
}

export default Listings
