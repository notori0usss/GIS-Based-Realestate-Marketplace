import React, { useState } from "react"
import Navbar from "../layout/Navbar"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { Icon } from "leaflet"
import houseIconPng from "../assets/map-icons/house.png"
import officeIconPng from "../assets/map-icons/office.png"
import apartmentIconPng from "../assets/map-icons/apartment.png"
import Button from "../components/Button"
import List1 from "../assets/listings/img1.jpg"
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

  const [latitude, setLatitude] = useState(51.505)
  const [longitude, setLongitude] = useState(-0.09)

  return (
    <div className="relative">
      <Navbar />
      {/* search goes here */}
      {/* <div className="w-20 h-10 bg-gray-600 absolute">
        
      </div> */}
      <div className="grid grid-cols-3 grid-rows-1">
        <div className="col-span-1">
          <div className="px-3 py-5">
            <img
              src="https://i.insider.com/62de01775bf4820019b5f436?width=700"
              alt="house"
              className="w-full h-40 object-cover"
            />
          </div>
        </div>
        <div className="h-[100vh] col-span-2 sticky top-0">
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
