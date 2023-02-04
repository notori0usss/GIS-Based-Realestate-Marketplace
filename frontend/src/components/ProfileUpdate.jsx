import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Axios from "axios"
import { useImmerReducer } from "use-immer"
import StateContext from "../context/StateContext"
import DispatchContext from "../context/DispatchContext"
import UserProfile from "../components/UserProfile"
import UserIcon from "../assets/user.png"
function ProfileUpdate() {
  const GlobalState = useContext(StateContext)
  const GlobalDispatch = useContext(DispatchContext)
  const navigate = useNavigate()

  const initialState = {
    userProfile: {},
    agencyNameValue: "",
    phoneNumberValue: "",
    bioValue: "",
    uploadedPictureValue: [],
    profilePictureValue: "http://127.0.0.1:8000/media/user.png",
    sendRequest: 0,
  }
  function ReducerFunction(draft, action) {
    switch (action.type) {
      case "catchuserProfileInfo":
        draft.userProfile = action.profileObject
        break
      case "catchAgencyNameChange":
        draft.agencyNameValue = action.agencyNameChosen
        break
      case "catchPhoneNumberChange":
        draft.phoneNumberValue = action.phoneNumberChosen
        break
      case "catchUploadPictureChange":
        draft.uploadedPictureValue = action.uploadedPictureChosen
        break
      case "catchBioChange":
        draft.bioValue = action.bioChosen
        break
      case "catchProfilePictureChange":
        draft.profilePictureValue = action.profilePictureChosen
        break
      case "catchSubscribedChange":
        draft.bio = action.bioChosen
        break
      case "changeSendRequest":
        draft.sendRequest = draft.sendRequest + 1
        break
    }
  }
  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState)
  useEffect(() => {
    async function GetProfileInfo() {
      try {
        const response = await Axios.get(
          `http://127.0.0.1:8000/api/profiles/${GlobalState.userId}/`
        )
        console.log(response.data)
        setUserInfo(response.data)
        dispatch({ type: "catchuserProfileInfo", profileObject: response.data })
      } catch (e) {
        console.log(e)
      }
    }
    GetProfileInfo()
  }, [])

  useEffect(() => {
    if (state.uploadedPictureValue[0]) {
      dispatch({
        type: "catchProfilePictureChange",
        profilePictureChosen: state.uploadedPictureValue[0],
      })
    }
  }, [state.uploadedPictureValue])
  console.log(GlobalState.userId)
  useEffect(() => {
    if (state.sendRequest) {
      async function UpdateProfile() {
        const formData = new FormData()
        formData.append("agency_name", state.agencyNameValue),
          formData.append("phone_number", state.phoneNumberValue),
          formData.append("bio", state.bioValue),
          formData.append("profile_picture", state.profilePictureValue),
          formData.append("seller", GlobalState.userId)

        try {
          const response = await Axios.patch(
            `http://127.0.0.1:8000/api/profiles/${GlobalState.userId}/update/`,
            formData
          )
          console.log(response)
          navigate("/profile")
        } catch (error) {
          console.log(error)
        }
      }
      UpdateProfile()
    }
  }, [state.sendRequest])

  //form submit
  function submitHandler(e) {
    e.preventDefault()
    console.log("submit bho")
    dispatch({ type: "changeSendRequest" })
  }
  console.log(state.userProfile.agency_name)
  return (
    <>
      {state.userProfile.agency_name === null ||
      state.userProfile.phone_number === null ? (
        <UserProfile
          agency="Update Profile"
          number="Update Profile"
          profilePicture={state.profilePictureValue}
          isSubscribed={state.userProfile.subscribed}
        />
      ) : (
        <UserProfile
          agency={state.userProfile.agency_name}
          number={state.userProfile.phone_number}
          profilePicture={state.userProfile.profile_picture}
          isSubscribed={state.userProfile.subscribed}
        />
      )}
      <div className="flex flex-col items-center justify-start h-screen py-12">
        <h1 className="text-3xl font-semibold text-gray-700">
          Edit/Update Your Profile
        </h1>
        <form
          className="flex flex-col gap-5 w-1/2 mt-10"
          onSubmit={submitHandler}
        >
          <input
            className="w-full h-16 px-3 shadow-md rounded-lg focus:outline-blue-300"
            type="text"
            value={state.agencyNameValue}
            placeholder="Agency Name"
            onChange={(e) =>
              dispatch({
                type: "catchAgencyNameChange",
                agencyNameChosen: e.target.value,
              })
            }
          />
          <input
            className="w-full h-16 px-3 shadow-md rounded-lg focus:outline-blue-300"
            type="text"
            value={state.phoneNumberValue}
            placeholder="Phone Number"
            onChange={(e) =>
              dispatch({
                type: "catchPhoneNumberChange",
                phoneNumberChosen: e.target.value,
              })
            }
          />
          <div className="flex items-center justify-center w-full ">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100 "
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {state.uploadedPictureValue?.length === 0 ? (
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
                      {state.uploadedPictureValue ? (
                        <li>{state.uploadedPictureValue[0].name}</li>
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
                    type: "catchUploadPictureChange",
                    uploadedPictureChosen: e.target.files,
                  })
                }}
              />
            </label>
          </div>
          <textarea
            className="h-32 px-3 py-2 shadow-md rounded-lg focus:outline-blue-300 "
            maxLength={200}
            type="text"
            value={state.bioValue}
            placeholder="Bio"
            onChange={(e) =>
              dispatch({
                type: "catchBioChange",
                bioChosen: e.target.value,
              })
            }
          />
          <div className="flex items-center justify-between gap-8">
            <button className="w-1/2 bg-yellow-500 py-3 rounded-md font-semibold text-white">
              Save
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="w-1/2 bg-red-400 py-3 rounded-md font-semibold text-white"
            >
              Go Back
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default ProfileUpdate
