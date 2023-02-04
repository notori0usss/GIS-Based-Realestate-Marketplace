import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Axios from "axios"
import { useImmerReducer } from "use-immer"
import StateContext from "../context/StateContext"
import DispatchContext from "../context/DispatchContext"
import UserProfile from "../components/UserProfile"
import UserIcon from "../assets/user.png"
import Loading from "../layout/Loading"
function Profile() {
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
    dataIsLoading: true,
  }
  function ReducerFunction(draft, action) {
    switch (action.type) {
      case "catchuserProfileInfo":
        draft.userProfile = action.profileObject
        break
      case "loadingDone":
        draft.dataIsLoading = false
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
        dispatch({ type: "loadingDone" })
        dispatch({ type: "catchuserProfileInfo", profileObject: response.data })
      } catch (e) {
        console.log(e)
      }
    }
    GetProfileInfo()
  }, [])

  //form submit

  if (state.dataIsLoading === true) {
    return <Loading />
  }
  return (
    <>
      {state.userProfile.agency_name === null ||
      state.userProfile.phone_number === null ? (
        <UserProfile
          agency="Update Profile"
          number="Update Profile"
          profilePicture={state.profilePictureValue}
          isSubscribed={state.userProfile.subscribed}
          totalListing={state.userProfile.seller_listings_count}
        />
      ) : (
        <UserProfile
          agency={state.userProfile.agency_name}
          number={state.userProfile.phone_number}
          profilePicture={state.userProfile.profile_picture}
          isSubscribed={state.userProfile.subscribed}
          totalListing={state.userProfile.seller_listings_count}
        />
      )}
    </>
  )
}

export default Profile
