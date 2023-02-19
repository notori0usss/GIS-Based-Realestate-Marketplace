import React, { useState, useEffect, useContext } from "react"
import Axios from "axios"
import StateContext from "../context/StateContext"
import { useNavigate, useParams } from "react-router-dom"
import {
  GiHamburgerMenu,
  IoCheckmarkDoneCircleSharp,
  MdOutlineCancel,
} from "react-icons/all"
import SelectProperty from "../components/SelectProperty"

function Comparision() {
  const params = useParams()
  const [showFilter, setShowFilter] = useState(false)
  const [propertyResponse, setPropertyResponse] = useState([])
  const [locationToggle, setLocationToggle] = useState(true)
  const [bathroomToggle, setBathroomToggle] = useState(true)
  const [bedroomToggle, setBedroomToggle] = useState(true)
  const [buildingTypeToggle, setBuildingTypeToggle] = useState(true)
  const [areaToggle, setAreaToggle] = useState(true)
  const [amenitiesToggle, setAmenitiesToggle] = useState(true)
  const GlobalState = useContext(StateContext)
  const navigate = useNavigate()
  useEffect(() => {
    async function GetListingInfo() {
      try {
        const response = await Axios.get(
          `http://127.0.0.1:8000/api/listings/${params.id}/`
        )
        setPropertyResponse(response.data)
      } catch (e) {
        console.log(e)
      }
    }
    GetListingInfo()
  }, [])
  const [compareProperties, setCompareProperties] = useState([])

  function getCompareProperties(item) {
    setCompareProperties(item)
    console.log(compareProperties)
  }
  return (
    <div className="px-20 py-10">
      <div className="flex justify-between w-full">
        <h2 className="text-4xl font-bold text-gray-600">Compare</h2>
        <GiHamburgerMenu
          className="text-3xl text-gray-500 cursor-pointer hover:text-gray-700"
          onClick={() => setShowFilter(!showFilter)}
        />
      </div>
      {showFilter && (
        <div className="flex w-full gap-8 justify-start mt-10">
          <button
            className={`px-4 py-[3px] border-2 border-blue-600 rounded-lg text-blue-500 hover:bg-blue-600 hover:text-white font-semibold   ${
              locationToggle ? `bg-blue-600 text-white` : ""
            }`}
            onClick={() => setLocationToggle(!locationToggle)}
          >
            Location
          </button>
          <button
            className={`px-4 py-[3px] border-2 border-blue-600 rounded-lg text-blue-500 hover:bg-blue-600 hover:text-white font-semibold   ${
              bathroomToggle ? `bg-blue-600 text-white` : ""
            }`}
            onClick={() => setBathroomToggle(!bathroomToggle)}
          >
            Bathroom
          </button>
          <button
            className={`px-4 py-[3px] border-2 border-blue-600 rounded-lg text-blue-500 hover:bg-blue-600 hover:text-white font-semibold   ${
              bedroomToggle ? `bg-blue-600 text-white` : ""
            }`}
            onClick={() => setBedroomToggle(!bedroomToggle)}
          >
            Bedroom
          </button>

          <button
            className={`px-4 py-[3px] border-2 border-blue-600 rounded-lg text-blue-500 hover:bg-blue-600 hover:text-white font-semibold   ${
              buildingTypeToggle ? `bg-blue-600 text-white` : ""
            }`}
            onClick={() => setBuildingTypeToggle(!buildingTypeToggle)}
          >
            Type
          </button>

          <button
            className={`px-4 py-[3px] border-2 border-blue-600 rounded-lg text-blue-500 hover:bg-blue-600 hover:text-white font-semibold   ${
              areaToggle ? `bg-blue-600 text-white` : ""
            }`}
            onClick={() => setAreaToggle(!areaToggle)}
          >
            Area
          </button>
          <button
            className={`px-4 py-[3px] border-2 border-blue-600 rounded-lg text-blue-500 hover:bg-blue-600 hover:text-white font-semibold   ${
              amenitiesToggle ? `bg-blue-600 text-white` : ""
            }`}
            onClick={() => setAmenitiesToggle(!amenitiesToggle)}
          >
            Amenities
          </button>
          <button className="px-4 py-1 border-2 border-blue-600 rounded-lg text-blue-500 hover:bg-blue-600 hover:text-white font-semibold focus:bg-blue-600 focus:text-white">
            Total Pois
          </button>
        </div>
      )}
      <hr className="mt-5" />
      <table className="w-full mt-6">
        <tr className="border border-slate-200">
          <th className="flex items-center justify-center h-[40vh]">
            <SelectProperty
              getCompareProperties={getCompareProperties}
              currentProperty={propertyResponse}
            />
          </th>
          <td>
            <div className="flex flex-col gap-2 items-start h-[40vh]">
              <h2 className="text-lg font-semibold text-gray-600">
                {propertyResponse.title}
              </h2>
              <img
                className="h-48 w-60 object-cover rounded-lg"
                src={propertyResponse.picture1}
                alt=""
              />
              <p className="font-bold my-2">
                Rs.
                {propertyResponse.property_status === "Rent" ? (
                  <>
                    <span className="">
                      {propertyResponse.price} /{" "}
                      <span className="text-md text-gray-700">
                        {propertyResponse.rental_frequency}
                      </span>
                    </span>
                  </>
                ) : (
                  <span className="text-md text-gray-700">
                    {propertyResponse.price}
                  </span>
                )}
              </p>
              <p className="text-gray-500 text-sm">
                {propertyResponse.description?.slice(0, 20)}...
              </p>
              <button
                className="text-blue-500 font-semibold hover:underline my-2"
                onClick={() => navigate(`/listings/${params.id}`)}
              >
                More Details
              </button>
            </div>
          </td>
          {compareProperties.map((property) => (
            <td>
              <div className="flex flex-col gap-2 items-start">
                <h2 className="text-lg font-semibold text-gray-600">
                  {property.title}
                </h2>
                <img
                  className="h-48 w-60 object-cover rounded-lg"
                  src={property.picture1}
                  alt=""
                />
                <p className="font-bold my-2">
                  Rs.
                  {property.property_status === "Rent" ? (
                    <>
                      <span className="">
                        {property.price} /{" "}
                        <span className="text-md text-gray-700">
                          {property.rental_frequency}
                        </span>
                      </span>
                    </>
                  ) : (
                    <span className="text-md text-gray-700">
                      {property.price}
                    </span>
                  )}
                </p>
                <p className="text-gray-500 text-sm">
                  {property.description?.slice(0, 20)}...
                </p>
                <button
                  className="text-blue-500 font-semibold hover:underline my-2"
                  onClick={() => navigate(`/listings/${property.id}`)}
                >
                  More Details
                </button>
              </div>
            </td>
          ))}
        </tr>

        {locationToggle && (
          <tr className="w-full h-12 border border-slate-200">
            <td className="text-xl font-semibold text-gray-600 pl-5">
              Location
            </td>
            <td>
              {propertyResponse.municipality
                ? propertyResponse.municipality
                : "--"}
              , {propertyResponse.area}
            </td>
            {compareProperties.map((property) => (
              <td>
                {property.municipality ? property.municipality : "--"},{" "}
                {property.area}
              </td>
            ))}
          </tr>
        )}

        {bathroomToggle && (
          <tr className="w-full h-12 border border-slate-200">
            <td className="text-xl font-semibold text-gray-600 pl-5">
              Parking
            </td>
            <td className="">{propertyResponse.parking}</td>
            {compareProperties.map((property) => (
              <td>{property.parking}</td>
            ))}
          </tr>
        )}

        {bedroomToggle && (
          <tr className="w-full h-12 border border-slate-200">
            <td className="text-xl font-semibold text-gray-600 pl-5">
              Bedroom
            </td>
            <td className="">{propertyResponse.rooms}</td>
            {compareProperties.map((property) => (
              <td>{property.rooms}</td>
            ))}
          </tr>
        )}

        {buildingTypeToggle && (
          <tr className="w-full h-12 border border-slate-200">
            <td className="text-xl font-semibold text-gray-600 pl-5">Type</td>
            <td className="">{propertyResponse.listing_type}</td>
            {compareProperties.map((property) => (
              <td>{property.listing_type}</td>
            ))}
          </tr>
        )}
        {areaToggle && (
          <tr className="w-full h-12 border border-slate-200">
            <td className="text-xl font-semibold text-gray-600 pl-5">Area</td>
            <td className="">{propertyResponse.property_area}.sqft</td>
            {compareProperties.map((property) => (
              <td>{property.property_area}</td>
            ))}
          </tr>
        )}

        {amenitiesToggle && (
          <tr className="w-full h-12 border border-slate-200">
            <td className="text-xl font-semibold text-gray-600 pl-5">
              Furnished
            </td>
            <td>
              {propertyResponse.furnished ? (
                <IoCheckmarkDoneCircleSharp className="w-8 h-8 text-green-600" />
              ) : (
                <MdOutlineCancel className="w-8 h-8 text-red-600" />
              )}
            </td>
            {compareProperties.map((property) => (
              <td>
                <div>
                  {property.furnished ? (
                    <IoCheckmarkDoneCircleSharp className="w-8 h-8 text-green-600" />
                  ) : (
                    <MdOutlineCancel className="w-8 h-8 text-red-600" />
                  )}
                </div>
              </td>
            ))}
          </tr>
        )}
        {amenitiesToggle && (
          <tr className="w-full h-12 border border-slate-200">
            <td className="text-xl font-semibold text-gray-600 pl-5">CCTV</td>
            <td>
              {propertyResponse.cctv ? (
                <IoCheckmarkDoneCircleSharp className="w-8 h-8 text-green-600" />
              ) : (
                <MdOutlineCancel className="w-8 h-8 text-red-600" />
              )}
            </td>
            {compareProperties.map((property) => (
              <td>
                <div>
                  {property.cctv ? (
                    <IoCheckmarkDoneCircleSharp className="w-8 h-8 text-green-600" />
                  ) : (
                    <MdOutlineCancel className="w-8 h-8 text-red-600" />
                  )}
                </div>
              </td>
            ))}
          </tr>
        )}
        {amenitiesToggle && (
          <tr className="w-full h-12 border border-slate-200">
            <td className="text-xl font-semibold text-gray-600 pl-5">
              Elevator
            </td>
            <td>
              {propertyResponse.elevator ? (
                <IoCheckmarkDoneCircleSharp className="w-8 h-8 text-green-600" />
              ) : (
                <MdOutlineCancel className="w-8 h-8 text-red-600" />
              )}
            </td>
            {compareProperties.map((property) => (
              <td>
                <div>
                  {property.elevator ? (
                    <IoCheckmarkDoneCircleSharp className="w-8 h-8 text-green-600" />
                  ) : (
                    <MdOutlineCancel className="w-8 h-8 text-red-600" />
                  )}
                </div>
              </td>
            ))}
          </tr>
        )}
        {amenitiesToggle && (
          <tr className="w-full h-12 border border-slate-200">
            <td className="text-xl font-semibold text-gray-600 pl-5">Pool</td>
            <td>
              {propertyResponse.pool ? (
                <IoCheckmarkDoneCircleSharp className="w-8 h-8 text-green-600" />
              ) : (
                <MdOutlineCancel className="w-8 h-8 text-red-600" />
              )}
            </td>
            {compareProperties.map((property) => (
              <td>
                <div>
                  {property.pool ? (
                    <IoCheckmarkDoneCircleSharp className="w-8 h-8 text-green-600" />
                  ) : (
                    <MdOutlineCancel className="w-8 h-8 text-red-600" />
                  )}
                </div>
              </td>
            ))}
          </tr>
        )}

        <tr className="w-full h-12">
          <td>Total Pois</td>
          <td>{}</td>
        </tr>
      </table>
    </div>
  )
}

export default Comparision
