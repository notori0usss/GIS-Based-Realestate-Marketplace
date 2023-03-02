import React, { useEffect } from "react"
import { useImmerReducer } from "use-immer"
import Axios from "axios"
import { useNavigate } from "react-router-dom"
function RealtorForm() {
  const initialState = {
    nameValue: "",
    photoValue: "",
    cvValue: "",
    descriptionValue: "",
    phoneValue: "",
    emailValue: "",
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
          formData.append("email", state.emailValue)
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
    <form
      encType="multipart/form-data"
      className="flex flex-col"
      onSubmit={submitHandler}
    >
      <input
        type="text"
        value={state.nameValue}
        onChange={(e) =>
          dispatch({
            type: "catchNameChange",
            nameChosen: e.target.value,
          })
        }
      />
      <input
        type="number"
        value={state.phoneValue}
        onChange={(e) =>
          dispatch({ type: "catchPhoneChange", phoneChosen: e.target.value })
        }
      />
      <input
        type="email"
        value={state.emailValue}
        onChange={(e) =>
          dispatch({ type: "catchEmailChange", emailChosen: e.target.value })
        }
      />
      <input
        type="file"
        accept=".pdf"
        onChange={(e) =>
          dispatch({
            type: "catchCvChange",
            cvChosen: e.target.files[0],
          })
        }
      />
      <input
        type="file"
        accept="image/png,image/gif,image/jpeg"
        onChange={(e) =>
          dispatch({
            type: "catchPhotoChange",
            photoChosen: e.target.files[0],
          })
        }
      />
      <textarea
        type="text"
        maxLength={25}
        onChange={(e) =>
          dispatch({
            type: "catchDescriptionChange",
            descriptionChosen: e.target.value,
          })
        }
      />
      <button type="submit">Sumbit</button>
    </form>
  )
}

export default RealtorForm
