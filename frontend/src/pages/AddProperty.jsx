import React, { useState, useEffect, useRef, useMemo } from "react"
import Navbar from "../layout/Navbar"
import { useImmerReducer } from "use-immer"
import PropertyForm from "../components/PropertyForm"
import Axios from "axios"
import { MapContainer, TileLayer, useMap, Marker, Polygon } from "react-leaflet"
import Kirtipur from "../data/GeoJSON/Kirtipur"
import Balkot from "../data/GeoJSON/Balkot"
import { AiFillDollarCircle } from "react-icons/ai"
import StateContext from "../context/StateContext"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import CheckOut from "./CheckOut"
import DispatchContext from "../context/DispatchContext"
function AddProperty() {
  const GlobalState = useContext(StateContext)
  const GlobalDispatch = useContext(DispatchContext)
  const navigate = useNavigate()
  //Initial States for Form
  const initialState = {
    titleValue: "",
    listingTypeValue: "",
    descriptionValue: "",
    areaValue: "",
    municipalityValue: "",
    latitudeValue: "",
    longitudeValue: "",
    propertyStatusValue: "",
    priceValue: "",
    rentalFrequencyValue: "",
    roomsValue: "",
    parkingValue: "",
    propertyAreaValue: "",
    furnishedValue: false,
    poolValue: false,
    elevatorValue: false,
    cctvValue: false,
    picture1Value: "",
    picture2Value: "",
    picture3Value: "",
    picture4Value: "",
    picture5Value: "",
    mapInstance: null,
    markerPosition: {
      lat: 27.704111212111023,
      lng: 85.31943175211019,
    },
    uploadedImages: [],
    userProfile: {
      agencyName: "",
      phoneNumber: "",
      subscribed: false,
    },
    sendRequest: 0,
  }
  //Reducerfuntion
  function ReducerFunction(draft, action) {
    switch (action.type) {
      case "catchTitleChange":
        draft.titleValue = action.titleChosen
        break
      case "catchListingTypeChange":
        draft.listingTypeValue = action.listingTypeChosen
        break
      case "catchDescriptionChange":
        draft.descriptionValue = action.descriptionChosen
        break
      case "catchAreaChange":
        draft.areaValue = action.areaChosen
        break
      case "catchMunicipalityChange":
        draft.municipalityValue = action.municipalityChosen
        break
      case "catchLongitudeChange":
        draft.longitudeValue = action.longitudeChosen
        break
      case "catchLatitudeChange":
        draft.latitudeValue = action.latitudeChosen
        break
      case "catchPropertyStatusChange":
        draft.propertyStatusValue = action.propertyStatusChosen
        break
      case "catchPriceChange":
        draft.priceValue = action.priceChosen
        break
      case "catchPropertyAreaChange":
        draft.propertyAreaValue = action.propertyAreaChosen
        break
      case "catchRentalFrequencyChange":
        draft.rentalFrequencyValue = action.rentalFrequencyChosen
        break
      case "catchRoomsChange":
        draft.roomsValue = action.roomsChosen
        break
      case "catchParkingChange":
        draft.parkingValue = action.parkingChosen
        break
      case "catchFurnishedChange":
        draft.furnishedValue = action.furnishedChosen
        break
      case "catchPoolChange":
        draft.poolValue = action.poolChosen
        break
      case "catchElevatorChange":
        draft.elevatorValue = action.elevatorChosen
        break
      case "catchCctvChange":
        draft.cctvValue = action.cctvChosen
        break
      case "catchPicture1Change":
        draft.picture1Value = action.picture1Chosen
        break
      case "catchPicture2Change":
        draft.picture2Value = action.picture2Chosen
        break
      case "catchPicture3Change":
        draft.picture3Value = action.picture3Chosen
        break
      case "catchPicture4Change":
        draft.picture4Value = action.picture4Chosen
        break
      case "catchPicture5Change":
        draft.picture5Value = action.picture5Chosen
        break

      case "getMap":
        draft.mapInstance = action.mapData
        break
      case "changeMarkerPosition":
        draft.markerPosition.lat = action.changeLatitude
        draft.markerPosition.lng = action.changeLongitude
        draft.latitudeValue = ""
        draft.longitudeValue = ""
        break
      case "catchUploadedImages":
        draft.uploadedImages = action.imagesChosen
        break
      case "catchuserProfileInfo":
        draft.userProfile.agencyName = action.profileObject.agency_name
        draft.userProfile.phoneNumber = action.profileObject.phone_number
        draft.userProfile.subscribed = action.profileObject.subscribed
        break
      case "changeSendRequest":
        draft.sendRequest = draft.sendRequest + 1
        break
    }
  }
  // getting map instance
  function MapComponent() {
    const map = useMap()
    dispatch({ type: "getMap", mapData: map })
    return null
  }
  //displays polygon on the map
  function areaDisplay() {
    if (state.municipalityValue === "Kirtipur") {
      return <Polygon positions={Kirtipur} />
    } else if (state.municipalityValue === "Balkot") {
      return <Polygon positions={Balkot} />
    }
  }
  //using immerreducer
  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState)
  //form submit handler

  useEffect(() => {
    if (state.sendRequest) {
      async function AddProperty() {
        const formData = new FormData()
        formData.append("title", state.titleValue),
          formData.append("area", state.areaValue),
          formData.append("description", state.descriptionValue),
          formData.append("listing_type", state.listingTypeValue),
          formData.append("property_status", state.propertyStatusValue),
          formData.append("price", state.priceValue),
          formData.append("rooms", state.roomsValue),
          formData.append("furnished", state.furnishedValue),
          formData.append("pool", state.poolValue),
          formData.append("elevator", state.elevatorValue),
          formData.append("cctv", state.cctvValue),
          formData.append("property_area", state.propertyAreaValue),
          formData.append("rental_frequency", state.rentalFrequencyValue),
          formData.append("latitude", state.latitudeValue),
          formData.append("longitude", state.longitudeValue),
          formData.append("picture1", state.picture1Value),
          formData.append("picture2", state.picture2Value),
          formData.append("picture3", state.picture3Value),
          formData.append("picture4", state.picture4Value),
          formData.append("picture5", state.picture5Value),
          formData.append("seller", localStorage.getItem("theUserId"))

        // console.log(response)
        try {
          const response = await Axios.post(
            "http://127.0.0.1:8000/api/listings/create/",
            formData
          )
          console.log(response)
          navigate("/listings")
        } catch (error) {
          console.log(error)
        }
      }
      AddProperty()
    }
  }, [state.sendRequest])

  //for Changing the map position based on municipality
  useEffect(() => {
    if (state.municipalityValue === "Balkot") {
      state.mapInstance.flyTo([27.666367937321187, 85.37419795932625], 13)
      dispatch({
        type: "changeMarkerPosition",
        changeLatitude: 27.666367937321187,
        changeLongitude: 85.37419795932625,
      })
    } else if (state.municipalityValue === "Kirtipur") {
      state.mapInstance.flyTo([27.67887766605217, 85.27391419425689], 13)
      dispatch({
        type: "changeMarkerPosition",
        changeLatitude: 27.67887766605217,
        changeLongitude: 85.27391419425689,
      })
    }
  }, [state.municipalityValue])

  //for changing map position based on area
  useEffect(() => {
    if (state.areaValue === "Kathmandu") {
      state.mapInstance.flyTo([27.711964791049617, 85.32270046066495], 13)
      dispatch({
        type: "changeMarkerPosition",
        changeLatitude: 27.711964791049617,
        changeLongitude: 85.32270046066495,
      })
    } else if (state.areaValue === "Bhaktapur") {
      state.mapInstance.flyTo([27.672074636815736, 85.42961557359669], 13)
      dispatch({
        type: "changeMarkerPosition",
        changeLatitude: 27.672074636815736,
        changeLongitude: 85.42961557359669,
      })
    }
  }, [state.areaValue])

  //draggable marker
  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        console.log(marker.getLatLng())
        dispatch({
          type: "catchLatitudeChange",
          latitudeChosen: marker.getLatLng().lat,
        })
        dispatch({
          type: "catchLongitudeChange",
          longitudeChosen: marker.getLatLng().lng,
        })
      },
    }),
    []
  )
  //catching pictues
  useEffect(() => {
    if (state.uploadedImages[0]) {
      dispatch({
        type: "catchPicture1Change",
        picture1Chosen: state.uploadedImages[0],
      })
    }
  }, [state.uploadedImages[0]])
  //pic2
  useEffect(() => {
    if (state.uploadedImages[1]) {
      dispatch({
        type: "catchPicture2Change",
        picture2Chosen: state.uploadedImages[1],
      })
    }
  }, [state.uploadedImages[1]])
  //pic3
  useEffect(() => {
    if (state.uploadedImages[2]) {
      dispatch({
        type: "catchPicture3Change",
        picture3Chosen: state.uploadedImages[2],
      })
    }
  }, [state.uploadedImages[2]])
  //pic 4
  useEffect(() => {
    if (state.uploadedImages[3]) {
      dispatch({
        type: "catchPicture4Change",
        picture4Chosen: state.uploadedImages[3],
      })
    }
  }, [state.uploadedImages[3]])
  //pic 5
  useEffect(() => {
    if (state.uploadedImages[4]) {
      dispatch({
        type: "catchPicture5Change",
        picture5Chosen: state.uploadedImages[4],
      })
    }
  }, [state.uploadedImages[4]])

  //req to get profile info
  useEffect(() => {
    async function GetProfileInfo() {
      try {
        const response = await Axios.get(
          `http://127.0.0.1:8000/api/profiles/${GlobalState.userId}/`
        )
        console.log(response.data)
        dispatch({ type: "catchuserProfileInfo", profileObject: response.data })
        GlobalDispatch({ type: "getProfile", profileValue: response.data })
      } catch (e) {
        console.log(e)
      }
    }
    GetProfileInfo()
  }, [])

  const submitHandler = (e) => {
    e.preventDefault()
    console.log("Form Done")
    dispatch({ type: "changeSendRequest" })
  }
  console.log(GlobalState.userIsLogged)
  const SubmitButtonDisplay = () => {
    if (
      GlobalState.userIsLogged &&
      state.userProfile.agencyName === null &&
      state.userProfile.phoneNumber === null
    ) {
      return (
        <button
          onClick={() => navigate("/profile")}
          className="w-full mx-auto bg-yellow-500 text-lg rounded-md text-white mb-10 mt-3 h-16"
        >
          Update Profile First
        </button>
      )
    } else if (
      GlobalState.userIsLogged &&
      state.userProfile.agencyName !== "" &&
      state.userProfile.phoneNumber !== "" &&
      !state.userProfile.subscribed
    ) {
      return (
        <button
          onClick={() => navigate("/checkout")}
          className="w-full mx-auto bg-yellow-500 text-lg rounded-md text-white mb-10 mt-3 h-16"
        >
          Subscribe First
        </button>
      )
    } else if (
      GlobalState.userIsLogged &&
      state.userProfile.agencyName !== "" &&
      state.userProfile.phoneNumber !== "" &&
      state.userProfile.subscribed
    ) {
      return (
        <button
          type="submit"
          className="w-full mx-auto bg-yellow-500 text-lg rounded-md text-white mb-10 mt-3 h-16"
        >
          Add Listing
        </button>
      )
    } else {
      return (
        <button
          onClick={() => navigate("/login")}
          className="w-full mx-auto bg-yellow-500 text-lg rounded-md text-white mb-10 mt-3 h-16"
        >
          Login to Post
        </button>
      )
    }
  }
  return (
    <div className="flex flex-col items-center w-full pt-5 bg-gradient-to-b from-yellow-50 to-amber-50">
      <h1 className="text-3xl my-6 font-semibold text-gray-600">
        Add a Property
      </h1>
      <form
        action=""
        onSubmit={submitHandler}
        className="flex flex-col gap-5 w-2/3"
      >
        <div className="flex justify-evenly gap-x-5">
          <input
            className="w-full h-16 px-3 shadow-md rounded-lg focus:outline-blue-300"
            type="text"
            value={state.titleValue}
            placeholder="Title"
            onChange={(e) =>
              dispatch({
                type: "catchTitleChange",
                titleChosen: e.target.value,
              })
            }
          />
          <select
            className="w-full h-16 px-3 shadow-md rounded-lg focus:outline-blue-300"
            value={state.listingTypeValue}
            onChange={(e) =>
              dispatch({
                type: "catchListingTypeChange",
                listingTypeChosen: e.target.value,
              })
            }
          >
            <option selected hidden>
              Select Listing Type
            </option>
            <option value={"House"}>House</option>
            <option value={"Apartment"}>Apartment</option>
            <option value={"Office"}>Office</option>
          </select>
        </div>
        <textarea
          className="h-32 px-3 py-2 shadow-md rounded-lg focus:outline-blue-300 "
          maxLength={200}
          type="text"
          value={state.descriptionValue}
          placeholder="Description"
          onChange={(e) =>
            dispatch({
              type: "catchDescriptionChange",
              descriptionChosen: e.target.value,
            })
          }
        />

        <h1 className="font-semibold text-sm text-gray-500">
          Property Area in sqft & Price in Rs.
        </h1>
        <div className="flex gap-4">
          <input
            className="w-full h-16 px-3 shadow-md rounded-lg focus:outline-blue-300"
            type="number"
            value={state.propertyAreaValue}
            placeholder="Property Area"
            onChange={(e) =>
              dispatch({
                type: "catchPropertyAreaChange",
                propertyAreaChosen: e.target.value,
              })
            }
          />

          <input
            className="w-full h-16 px-3 shadow-md rounded-lg focus:outline-blue-300"
            type="number"
            value={state.priceValue}
            placeholder="Price"
            onChange={(e) =>
              dispatch({
                type: "catchPriceChange",
                priceChosen: e.target.value,
              })
            }
          />
        </div>
        <h1 className="font-semibold text-sm text-gray-500">
          Mention number of Rooms and Parking space here.
        </h1>
        <div className="flex gap-4">
          <input
            className="w-full h-16 px-3 shadow-md rounded-lg focus:outline-blue-300"
            type="number"
            value={state.roomsValue}
            placeholder="Rooms"
            onChange={(e) =>
              dispatch({
                type: "catchRoomsChange",
                roomsChosen: e.target.value,
              })
            }
          />
          <input
            className="w-full h-16 px-3 shadow-md rounded-lg focus:outline-blue-300"
            type="number"
            value={state.parkingValue}
            placeholder="Parking"
            onChange={(e) =>
              dispatch({
                type: "catchParkingChange",
                parkingChosen: e.target.value,
              })
            }
          />
        </div>
        <div className="flex gap-4">
          <select
            className="w-full h-16 px-3 shadow-md rounded-lg focus:outline-blue-300"
            type="text"
            value={state.propertyStatusValue}
            placeholder="Property Status"
            onChange={(e) =>
              dispatch({
                type: "catchPropertyStatusChange",
                propertyStatusChosen: e.target.value,
              })
            }
          >
            <option selected hidden>
              Select Property Status
            </option>
            <option value="Sale">Sale</option>
            <option value="Rent">Rent</option>
          </select>

          {state.propertyStatusValue === "Rent" ? (
            <select
              className="w-full h-16 px-3 shadow-md rounded-lg focus:outline-blue-300"
              value={state.rentalFrequencyValue}
              onChange={(e) =>
                dispatch({
                  type: "catchRentalFrequencyChange",
                  rentalFrequencyChosen: e.target.value,
                })
              }
            >
              <option value="" selected hidden>
                Select Frequency
              </option>
              <option value="Day">Day</option>
              <option value="Week">Week</option>
              <option value="Month">Month</option>
            </select>
          ) : (
            <select
              className="w-full h-16 px-3 shadow-md rounded-lg focus:outline-blue-300"
              disabled
            >
              <option value="">--</option>
            </select>
          )}
        </div>
        <div className="flex gap-10 w-full items-center justify-center text-lg font-semibold">
          <label htmlFor="furnished">
            <input
              id="furnished"
              type="checkbox"
              value={state.furnishedValue}
              placeholder="Furnished"
              onChange={(e) =>
                dispatch({
                  type: "catchFurnishedChange",
                  furnishedChosen: e.target.value,
                })
              }
            />{" "}
            Furnished
          </label>
          <label htmlFor="Pool">
            <input
              id="Pool"
              type="checkbox"
              value={state.poolValue}
              placeholder="Pool"
              onChange={(e) =>
                dispatch({
                  type: "catchPoolChange",
                  poolChosen: e.target.value,
                })
              }
            />{" "}
            Pool
          </label>
          <label htmlFor="elevator">
            <input
              id="elevator"
              type="checkbox"
              value={state.elevatorValue}
              placeholder="elevator"
              onChange={(e) =>
                dispatch({
                  type: "catchElevatorChange",
                  elevatorChosen: e.target.value,
                })
              }
            />{" "}
            Elevator
          </label>
          <label htmlFor="cctv">
            <input
              id="cctv"
              type="checkbox"
              value={state.cctvValue}
              onChange={(e) =>
                dispatch({
                  type: "catchCctvChange",
                  cctvChosen: e.target.value,
                })
              }
            />{" "}
            CCTV
          </label>
        </div>
        <div className="flex justify-evenly w-full gap-4">
          <select
            className="w-full h-16 px-3 shadow-md rounded-lg focus:outline-blue-300"
            type="text"
            value={state.areaValue}
            placeholder="Area"
            onChange={(e) =>
              dispatch({
                type: "catchAreaChange",
                areaChosen: e.target.value,
              })
            }
          >
            <option selected hidden>
              Select District
            </option>

            <option value={"Kathmandu"}>Kathmandu</option>
            <option value={"Bhaktapur"}>Bhaktapur</option>
          </select>
          <select
            className="w-full h-16 px-3 shadow-md rounded-lg focus:outline-blue-300"
            type="text"
            value={state.municipalityValue}
            placeholder="Municipality"
            onChange={(e) =>
              dispatch({
                type: "catchMunicipalityChange",
                municipalityChosen: e.target.value,
              })
            }
          >
            <option selected hidden>
              Select Area
            </option>
            {state.areaValue === "Bhaktapur" ? (
              <option value="Balkot">Balkot</option>
            ) : (
              <option value="Kirtipur">Kirtipur</option>
            )}
          </select>
        </div>
        <h1 className="font-semibold text-sm text-gray-500">
          Note: Latitude and Longitude can be chosen with the draggable marker
          in the map.
        </h1>
        <div className="flex gap-4">
          <input
            className="w-full h-16 px-3 shadow-md rounded-lg focus:outline-blue-300"
            type="number"
            value={state.latitudeValue}
            placeholder="Latitude"
            onChange={(e) =>
              dispatch({
                type: "catchLatitudeChange",
                latitudeChosen: e.target.value,
              })
            }
          />
          <input
            className="w-full h-16 px-3 shadow-md rounded-lg focus:outline-blue-300"
            type="number"
            value={state.longitudeValue}
            placeholder="Longitude"
            onChange={(e) =>
              dispatch({
                type: "catchLongitudeChange",
                longitudeChosen: e.target.value,
              })
            }
          />
        </div>
        <div className="w-full h-[70vh]">
          <MapContainer
            center={[27.704111212111023, 85.31943175211019]}
            zoom={11}
            scrollWheelZoom={true}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapComponent />
            {areaDisplay()}
            <Marker
              draggable
              eventHandlers={eventHandlers}
              position={state.markerPosition}
              ref={markerRef}
            ></Marker>
          </MapContainer>
        </div>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100 "
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {state.uploadedImages.length === 0 ? (
                <>
                  <svg
                    aria-hidden="true"
                    className="w-10 h-16 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 ">
                    PNG, JPG or GIF (MAX. 5 Pictures)
                  </p>
                </>
              ) : (
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">
                    {state.picture1Value ? (
                      <li>{state.picture1Value.name}</li>
                    ) : (
                      ""
                    )}
                    {state.picture2Value ? (
                      <li>{state.picture2Value.name}</li>
                    ) : (
                      ""
                    )}
                    {state.picture3Value ? (
                      <li>{state.picture3Value.name}</li>
                    ) : (
                      ""
                    )}
                    {state.picture4Value ? (
                      <li>{state.picture4Value.name}</li>
                    ) : (
                      ""
                    )}
                    {state.picture5Value ? (
                      <li>{state.picture5Value.name}</li>
                    ) : (
                      ""
                    )}
                  </span>
                </p>
              )}
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              multiple
              accept="image/png,image/gif,image/jpeg"
              onChange={(e) => {
                dispatch({
                  type: "catchUploadedImages",
                  imagesChosen: e.target.files,
                })
              }}
            />
          </label>
        </div>
        <div>{SubmitButtonDisplay()}</div>
      </form>
    </div>
  )
}

export default AddProperty
