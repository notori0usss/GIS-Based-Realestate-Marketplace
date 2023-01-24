import React, { useState } from "react"
import Navbar from "../layout/Navbar"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { Icon } from "leaflet"

import Axios from "axios"

import houseIconPng from "../assets/map-icons/house.png"
import officeIconPng from "../assets/map-icons/office.png"
import apartmentIconPng from "../assets/map-icons/apartment.png"
import List1 from "../assets/listings/img1.jpg"
import ProductCard from "../layout/ProductCard"
import myListings from "../data/dummyData"
import { useEffect } from "react"
import Loading from "../layout/Loading"
function Listings() {
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

  const [allListings, setAllListings] = useState([])
  const [dataLoading, setDataLoading] = useState(true)

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

  return (
    <div className="relative">
      {/* search goes here */}
      {/* <div className="w-20 h-10 bg-gray-600 absolute">
        
      </div> */}
      <div className="grid grid-cols-4 grid-rows-1">
        <div className="col-span-1 flex items-center gap-5 justify-center flex-col py-5">
          {allListings.map((item) => (
            <ProductCard key={item.id} {...item} />
          ))}
        </div>
        <div className="h-[100vh] col-span-3 sticky top-0">
          <MapContainer
            center={[51.505, -0.08]}
            zoom={14}
            scrollWheelZoom={true}
          >
            <TileLayer
              url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
            />
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
                  key={item.id}
                  icon={IconDisplay()}
                  position={[
                    item.location.coordinates[0],
                    item.location.coordinates[1],
                  ]}
                >
                  <Popup className="w-[20rem]">
                    <div className="flex flex-col w-full gap-1 items-center">
                      <h5 className="text-lg">{item.title}</h5>
                      <img
                        src={item.picture1}
                        alt="listing"
                        className="w-full h-[12rem] object-cover"
                      />
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
