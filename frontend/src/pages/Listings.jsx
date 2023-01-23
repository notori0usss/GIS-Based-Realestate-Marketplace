import React, { useState } from "react"
import Navbar from "../layout/Navbar"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { Icon } from "leaflet"
import houseIconPng from "../assets/map-icons/house.png"
import officeIconPng from "../assets/map-icons/office.png"
import apartmentIconPng from "../assets/map-icons/apartment.png"
import Button from "../components/Button"
import List1 from "../assets/listings/img1.jpg"
import ProductCard from "../layout/ProductCard"
function Listings() {
  fetch("http://localhost:8000/api/listings/").then((res) =>
    res.json().then((data) => console.log(data))
  )

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

  const [latitude, setLatitude] = useState(51.50655836576024)
  const [longitude, setLongitude] = useState(-0.075142566336191)

  const listingDummy = [
    {
      id: 1,
      price: "$2,345",
      bed: 5,
      parking: 2,
      area: "124.6",
      type: "House",
      status: "Sale",
    },
    {
      id: 2,
      price: "$12,345",
      bed: 2,
      parking: 2,
      area: "124.6",
      type: "Office",
      status: "Rent",
    },
    {
      id: 3,
      price: "$132,345",
      bed: 10,
      parking: 10,
      area: "1244.6",
      type: "Apartment",
      status: "Rent",
    },
  ]
  return (
    <div className="relative">
      <Navbar />
      {/* search goes here */}
      {/* <div className="w-20 h-10 bg-gray-600 absolute">
        
      </div> */}
      <div className="grid grid-cols-4 grid-rows-1">
        <div className="col-span-1 flex items-center gap-5 justify-center flex-col py-5">
          {listingDummy.map((item) => (
            <ProductCard item={listingDummy} />
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
            <Marker icon={houseIcon} position={[latitude, longitude]}>
              <Popup className="w-[20rem] py-2 px-1">
                <div className="flex flex-col w-full">
                  <h5>A Title</h5>
                  <img
                    src={List1}
                    alt="listing"
                    className="w-[18rem] h-[14rem] object-cover"
                  />
                  <p>Description</p>
                  <Button title={"link"} />
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  )
}

export default Listings
