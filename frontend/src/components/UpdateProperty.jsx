import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useLayoutEffect,
} from "react"
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
import DispatchContext from "../context/DispatchContext"
function UpdateProperty({ listingInfo, onShowModalChange, showModal }) {
  console.log(listingInfo)
  const GlobalState = useContext(StateContext)
  const GlobalDispatch = useContext(DispatchContext)

  //Initial States for Form
  const initialState = {
    titleValue: listingInfo.title,
    listingTypeValue: listingInfo.listing_type,
    descriptionValue: listingInfo.description,
    propertyStatusValue: listingInfo.property_status,
    priceValue: listingInfo.price,
    rentalFrequencyValue: listingInfo.rental_frequency,
    roomsValue: listingInfo.rooms,
    bathroomValue: listingInfo.bathroom,
    parkingValue: listingInfo.parking,
    propertyAreaValue: listingInfo.property_area,
    furnishedValue: listingInfo.furnished,
    poolValue: listingInfo.pool,
    elevatorValue: listingInfo.elevator,
    cctvValue: listingInfo.cctv,
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
      case "catchBathroomChange":
        draft.bathroomValue = action.bathroomChosen
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

      case "changeSendRequest":
        draft.sendRequest = draft.sendRequest + 1
        break
    }
  }
  // getting map instance

  //using immerreducer
  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState)
  //form submit handler
  const navigate = useNavigate()
  useEffect(() => {
    if (state.sendRequest) {
      async function AddProperty() {
        const formData = new FormData()
        formData.append("title", state.titleValue),
          formData.append("description", state.descriptionValue),
          formData.append("listing_type", state.listingTypeValue),
          formData.append("property_status", state.propertyStatusValue),
          formData.append("price", state.priceValue),
          formData.append("rooms", state.roomsValue),
          formData.append("parking", state.parkingValue),
          formData.append("furnished", state.furnishedValue),
          formData.append("bathroom", state.bathroomValue),
          formData.append("pool", state.poolValue),
          formData.append("elevator", state.elevatorValue),
          formData.append("cctv", state.cctvValue),
          formData.append("property_area", state.propertyAreaValue),
          formData.append("rental_frequency", state.rentalFrequencyValue)
        try {
          const response = await Axios.patch(
            `http://127.0.0.1:8000/api/listings/${listingInfo.id}/update/`,
            formData
          )
          console.log(response)
          onShowModalChange(!showModal)
          window.location.reload()
        } catch (error) {
          console.log(error)
        }
      }
      AddProperty()
    }
  }, [state.sendRequest])

  //for Changing the map position based on municipality

  //draggable marke

  const submitHandler = (e) => {
    e.preventDefault()
    console.log("Form Done")
    dispatch({ type: "changeSendRequest" })
  }
  return (
    <div className="flex flex-col items-center w-full pt-5">
      <form
        action=""
        onSubmit={submitHandler}
        className="flex flex-col gap-5 w-2/3"
      >
        <div className="flex justify-evenly gap-x-5">
          <input
            className="w-full h-16 px-3 shadow-md rounded focus:outline-blue-300"
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
            className="w-full h-16 px-3 shadow-md rounded focus:outline-blue-300"
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
          className="h-32 px-3 py-2 shadow-md rounded focus:outline-blue-300 "
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
          Mention number of Rooms,Parking & Bathroom space here.
        </h1>
        <div className="flex gap-4">
          <input
            className="w-full h-16 px-3 shadow-md rounded focus:outline-blue-300"
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
            className="w-full h-16 px-3 shadow-md rounded focus:outline-blue-300"
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
          <input
            className="w-full h-16 px-3 shadow-md rounded focus:outline-blue-300"
            type="number"
            value={state.bathroomValue}
            placeholder="Bathrooms"
            onChange={(e) =>
              dispatch({
                type: "catchBathroomChange",
                bathroomChosen: e.target.value,
              })
            }
          />
        </div>
        <div className="flex gap-4">
          <select
            className="w-full h-16 px-3 shadow-md rounded focus:outline-blue-300"
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
              className="w-full h-16 px-3 shadow-md rounded focus:outline-blue-300"
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
              className="w-full h-16 px-3 shadow-md rounded focus:outline-blue-300"
              disabled
            >
              <option value="">--</option>
            </select>
          )}
        </div>
        <h1 className="font-semibold text-sm text-gray-500">
          Property Area in sqft & Price in Rs.
        </h1>
        <div className="flex gap-4">
          <input
            className="w-full h-16 px-3 shadow-md rounded focus:outline-blue-300"
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
            className="w-full h-16 px-3 shadow-md rounded focus:outline-blue-300"
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
        <div className="flex gap-10 w-full items-center justify-center text-lg font-semibold">
          <label htmlFor="furnished">
            <input
              id="furnished"
              type="checkbox"
              value={state.furnishedValue}
              checked={state.furnishedValue && true}
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
              checked={state.poolValue && true}
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
              checked={state.elevatorValue && true}
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
              checked={state.cctvValue && true}
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
        <div className="flex items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b">
          <button
            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => onShowModalChange(!showModal)}
          >
            Close
          </button>
          <button
            className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdateProperty
