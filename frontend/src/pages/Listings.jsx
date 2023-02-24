import useGeolocation from "../hooks/useGeolocation"
import React, { useContext, useState, useRef, useLayoutEffect } from "react"
import Navbar from "../layout/Navbar"
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet"
import { Icon, polygon } from "leaflet"

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
import SearchBar from "../components/SearchBar"
import Kirtipur from "../data/GeoJSON/Kirtipur"
import Balkot from "../data/GeoJSON/Balkot"
import { useNavigate } from "react-router-dom"
function Listings() {
  const location = useGeolocation()
  const mapRef = useRef(null)
  const markerRef = useRef(null)
  const GlobalState = useContext(StateContext)
  const navigate = useNavigate()
  const houseIcon = new Icon({
    iconUrl: houseIconPng,
    iconSize: [35, 35],
  })
  const officeIcon = new Icon({
    iconUrl: officeIconPng,
    iconSize: [35, 35],
  })
  const apartmentIcon = new Icon({
    iconUrl: apartmentIconPng,
    iconSize: [35, 35],
  })
  const userIcon = new Icon({
    iconUrl: userIconPng,
    iconSize: [35, 35],
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
  const [searchTitle, setSearchTitle] = useState("")
  const [searchPolygon, setSearchPolygon] = useState("")
  function getSearchTitle(query) {
    setSearchTitle(query)
  }
  function getSearchPolygon(polygon) {
    setSearchPolygon(polygon)
  }
  console.log(searchPolygon)
  function areaDisplay() {
    if (searchTitle === "kirtipur") {
      return <Polygon positions={Kirtipur} />
    } else if (searchTitle.toLowerCase().includes("balkot")) {
      return <Polygon positions={Balkot} />
    }
  }
  const [allListings, setAllListings] = useState([])
  const [dataLoading, setDataLoading] = useState(true)
  const [toggle, setToggle] = useState(false)
  const [mapLayer, setMapLayer] = useState(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  )
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const handleToggle = () => {
    setToggle(!toggle)
    setMapLayer(
      toggle
        ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        : "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
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
        console.log(listingResponse.data)
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

  return (
    <div className="relative">
      <SearchBar
        ref={mapRef}
        getSearchTitle={getSearchTitle}
        getSearchPolygon={getSearchPolygon}
      />
      <button
        className="absolute z-10 top-[3%] right-[1%] bg-white rounded-md p-2"
        onClick={handleToggle}
      >
        <ImStack className="w-6 h-6 rounded-lg text-black" />
      </button>
      {GlobalState.userIsLogged && (
        <button
          className="absolute z-10 top-[5%] right-[1%] bg-white rounded-md p-2"
          onClick={showMyLocation}
        >
          <RiUserLocationFill className="w-6 h-6 rounded-lg text-red-700" />
        </button>
      )}
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
            zoom={12}
            scrollWheelZoom={true}
            ref={mapRef}
          >
            <TileLayer url={mapLayer} />
            {areaDisplay()}
            {location.loaded && !location.error && GlobalState.userIsLogged && (
              <Marker
                icon={userIcon}
                position={[location.coordinates.lat, location.coordinates.lng]}
              >
                <Popup>
                  Hello!{" "}
                  <span className="text-blue-500 font-bold cursor-pointer">
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
                        className="w-full h-[12rem] object-cover cursor-pointer"
                        onClick={() => navigate(`/listings/${item.id}`)}
                      />
                      <button onClick={navigation}>Goto</button>
                      <p className="w-full truncate">{item.description}</p>
                      <button
                        className="w-full bg-blue-500 text-white py-3 rounded-lg"
                        onClick={() => navigate(`/listings/${item.id}`)}
                      >
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
