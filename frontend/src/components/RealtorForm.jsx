import React, { useEffect } from "react"
import { useImmerReducer } from "use-immer"
import Axios from "axios"
import { useNavigate } from "react-router-dom"
import Heading from "./Heading"
function RealtorForm() {
  const initialState = {
    nameValue: "",
    photoValue: "",
    cvValue: "",
    descriptionValue: "",
    phoneValue: "",
    emailValue: "",
    buyerValue: false,
    listingValue: false,
    relocationValue: false,
    foreclosureValue: false,
    status: 0,
  }
  function ReducerFunction(draft, action) {
    switch (action.type) {
      case "catchNameChange":
        draft.nameValue = action.nameChosen
        break
      case "catchPhotoChange":
        draft.photoValue = action.photoChosen
        break
      case "catchPhoneChange":
        draft.phoneValue = action.phoneChosen
        break
      case "catchEmailChange":
        draft.emailValue = action.emailChosen
        break
      case "catchCvChange":
        draft.cvValue = action.cvChosen
        break
      case "catchDescriptionChange":
        draft.descriptionValue = action.descriptionChosen
        break
      case "catchBuyerChange":
        draft.buyerValue = !draft.buyerValue
        break
      case "catchListingChange":
        draft.listingValue = !draft.listingValue
        break
      case "catchRelocationChange":
        draft.relocationValue = !draft.relocationValue
        break
      case "catchForeclosureChange":
        draft.foreclosureValue = !draft.foreclosureValue
        break

      case "changeStatus":
        draft.status = draft.status + 1
        break
    }
  }
  const navigate = useNavigate()
  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState)
  function submitHandler(e) {
    e.preventDefault()
    console.log("form done")
    dispatch({ type: "changeStatus" })
  }
  useEffect(() => {
    if (state.status) {
      async function AddCv() {
        const formData = new FormData()
        formData.append("name", state.nameValue),
          formData.append("photo", state.photoValue),
          formData.append("cv", state.cvValue),
          formData.append("description", state.descriptionValue),
          formData.append("phone", state.phoneValue),
          formData.append("email", state.emailValue),
          formData.append("forclosure_agent", state.foreclosureValue),
          formData.append("relocation_agent", state.relocationValue),
          formData.append("listing_agent", state.listingValue),
          formData.append("buyers_agent", state.buyerValue)
        // console.log(response)
        try {
          const response = await Axios.post(
            "http://127.0.0.1:8000/api/realtors/create/",
            formData
          )
          console.log(response)
          navigate("/realtors")
        } catch (error) {
          console.log(error.response)
        }
      }
      AddCv()
    }
  }, [state.status])
  return (
    <div className="flex flex-col justify-center items-center py-10">
      <Heading
        title={"Please Fill Up the Form"}
        subtitle={"Don't Apply if you have already"}
      />
      <form
        encType="multipart/form-data"
        className="flex flex-col container mx-auto max-w-5xl gap-2 border-2 p-10 rounded-3xl shadow"
        onSubmit={submitHandler}
      >
        <label htmlFor="" className="text-lg font-semibold">
          Name:
        </label>
        <input
          className="text-lg px-2 py-4"
          type="text"
          value={state.nameValue}
          onChange={(e) =>
            dispatch({
              type: "catchNameChange",
              nameChosen: e.target.value,
            })
          }
        />
        <label htmlFor="" className="text-lg font-semibold">
          Phone Number:
        </label>
        <input
          className="text-lg px-2 py-4"
          type="number"
          value={state.phoneValue}
          onChange={(e) =>
            dispatch({ type: "catchPhoneChange", phoneChosen: e.target.value })
          }
        />
        <label htmlFor="" className="text-lg font-semibold">
          Email:
          <span className="text-sm text-gray-500">(Enter a Valid One)</span>
        </label>
        <input
          className="text-lg px-2 py-4"
          type="email"
          value={state.emailValue}
          onChange={(e) =>
            dispatch({ type: "catchEmailChange", emailChosen: e.target.value })
          }
        />
        <label htmlFor="" className="text-lg font-semibold">
          CV:
        </label>
        <input
          className="text-lg px-2 py-4"
          type="file"
          accept=".pdf"
          onChange={(e) =>
            dispatch({
              type: "catchCvChange",
              cvChosen: e.target.files[0],
            })
          }
        />
        <label htmlFor="" className="text-lg font-semibold">
          Photo:
        </label>
        <input
          className="text-lg px-2 py-4"
          type="file"
          accept="image/png,image/gif,image/jpeg"
          onChange={(e) =>
            dispatch({
              type: "catchPhotoChange",
              photoChosen: e.target.files[0],
            })
          }
        />
        <label htmlFor="" className="text-lg font-semibold">
          Bio:<span className="text-sm text-gray-500">(Max 25 Letters)</span>
        </label>
        <textarea
          className="text-lg px-2 py-4"
          type="text"
          value={state.descriptionValue}
          maxLength={25}
          onChange={(e) =>
            dispatch({
              type: "catchDescriptionChange",
              descriptionChosen: e.target.value,
            })
          }
        />
        <p className="text-lg font-semibold">Agent Type:</p>
        <div className="flex gap-6 justify-center items-center">
          <input
            type="checkbox"
            id="buyer"
            value={state.buyerValue}
            onChange={(e) =>
              dispatch({
                type: "catchBuyerChange",
              })
            }
          />
          <label className="text-xl font-semibold" htmlFor="buyer">
            Buyer Agent
          </label>
          <input
            type="checkbox"
            id="listing"
            value={state.listingValue}
            onChange={(e) =>
              dispatch({
                type: "catchListingChange",
              })
            }
          />
          <label className="text-xl font-semibold" htmlFor="listing">
            Listing Agent
          </label>
          <input
            type="checkbox"
            id="relocation"
            value={state.relocationValue}
            onChange={(e) => {
              dispatch({
                type: "catchRelocationChange",
              })
              console.log(e.target.value)
            }}
          />

          <label className="text-xl font-semibold" htmlFor="relocation">
            Relocation Agent
          </label>
          <input
            type="checkbox"
            id="foreclosure"
            value={state.foreclosureValue}
            onChange={(e) =>
              dispatch({
                type: "catchForeclosureChange",
                foreclosureChosen: e.target.value,
              })
            }
          />

          <label className="text-xl font-semibold" htmlFor="foreclosure">
            Foreclosure Agent
          </label>
        </div>
        <button
          className="w-full mt-10 text-white bg-blue-500 py-4 text-lg font-semibold"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default RealtorForm
