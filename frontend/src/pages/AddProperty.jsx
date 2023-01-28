import React, { useEffect } from "react"
import Navbar from "../layout/Navbar"
import { useImmerReducer } from "use-immer"
import PropertyForm from "../components/PropertyForm"

function AddProperty() {
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
    sendRequest: 0,
  }
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

      case "changeSendRequest":
        draft.sendRequest = draft.sendRequest + 1
    }
  }
  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState)
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch({ type: "sendRequest" })
  }
  useEffect(() => {
    if (state.sendRequest) {
      const source = Axios.CancelToken.source()
      async function SignIn() {
        try {
          const response = await Axios.post(
            "http://127.0.0.1:8000/api-auth-djoser/token/login/",
            {
              username: state.usernameValue,
              password: state.passwordValue,
            },
            {
              cancelToken: source.token,
            }
          )
          // console.log(response)
          dispatch({
            type: "catchToken",
            tokenValue: response.data.auth_token,
          })

          // navigate("/")
        } catch (error) {
          console.log(error)
        }
      }
      SignIn()
      return () => {
        source.cancel
      }
    }
  }, [state.sendRequest])
  return (
    <div className="flex flex-col items-center w-full mt-5">
      <h1 className="text-3xl my-6 font-semi">Add a Property</h1>
      <form
        action=""
        onSubmit={submitHandler}
        className="flex flex-col gap-5 w-2/3"
      >
        <div className="flex justify-evenly">
          <input
            className="h-10 px-3 shadow-md rounded-lg focus:outline-blue-300"
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
          <input
            className="h-10 px-3 shadow-md rounded-lg focus:outline-blue-300"
            type="text"
            value={state.listingTypeValue}
            placeholder="Listing Type"
            onChange={(e) =>
              dispatch({
                type: "catchListingTypeChange",
                titleChosen: e.target.value,
              })
            }
          />
        </div>

        <input
          className="h-10 px-3 shadow-md rounded-lg focus:outline-blue-300"
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
        <input
          className="h-10 px-3 shadow-md rounded-lg focus:outline-blue-300"
          type="text"
          value={state.areaValue}
          placeholder="Area"
          onChange={(e) =>
            dispatch({
              type: "catchAreaChange",
              areaChosen: e.target.value,
            })
          }
        />
        <input
          className="h-10 px-3 shadow-md rounded-lg focus:outline-blue-300"
          type="text"
          value={state.municipalityValue}
          placeholder="Municipality"
          onChange={(e) =>
            dispatch({
              type: "catchMunicipalityhChange",
              municipalityChosen: e.target.value,
            })
          }
        />
        <input
          className="h-10 px-3 shadow-md rounded-lg focus:outline-blue-300"
          type="text"
          value={state.propertyStatusValue}
          placeholder="Property Status"
          onChange={(e) =>
            dispatch({
              type: "catchPropertyStatusChange",
              propertyStatusChosen: e.target.value,
            })
          }
        />
        <input
          className="h-10 px-3 shadow-md rounded-lg focus:outline-blue-300"
          type="text"
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
          className="h-10 px-3 shadow-md rounded-lg focus:outline-blue-300"
          type="text"
          value={state.longitudeValue}
          placeholder="Longitude"
          onChange={(e) =>
            dispatch({
              type: "catchLongitudeChange",
              longitudeChosen: e.target.value,
            })
          }
        />

        <input
          className="h-10 px-3 shadow-md rounded-lg focus:outline-blue-300"
          type="text"
          value={state.priceValue}
          placeholder="Price"
          onChange={(e) =>
            dispatch({
              type: "catchPriceChange",
              priceChosen: e.target.value,
            })
          }
        />
        <input
          className="h-10 px-3 shadow-md rounded-lg focus:outline-blue-300"
          type="text"
          value={state.rentalFrequencyValue}
          placeholder="Rental Frequency"
          onChange={(e) =>
            dispatch({
              type: "catchRentalFrequencyChange",
              rentalFrequencyChosen: e.target.value,
            })
          }
        />
        <input
          className="h-10 px-3 shadow-md rounded-lg focus:outline-blue-300"
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
          className="h-10 px-3 shadow-md rounded-lg focus:outline-blue-300"
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
          className="h-10 px-3 shadow-md rounded-lg focus:outline-blue-300"
          type="text"
          value={state.propertyAreaValue}
          placeholder="PropertyArea"
          onChange={(e) =>
            dispatch({
              type: "catchPropertyAreaChange",
              propertyAreaChosen: e.target.value,
            })
          }
        />
        <div className="flex gap-10 w-full items-center justify-center">
          <label htmlFor="furnished">
            <input
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

        <button>Submit</button>
      </form>
    </div>
  )
}

export default AddProperty
