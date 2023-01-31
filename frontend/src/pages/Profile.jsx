import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Axios from "axios"
import { useImmerReducer } from "use-immer"
import StateContext from "../context/StateContext"
import DispatchContext from "../context/DispatchContext"

function Profile() {
  const GlobalState = useContext(StateContext)
  const GlobalDispatch = useContext(DispatchContext)
  const navigate = useNavigate()
  const initialState = {
    userProfile: {
      agencyName: "",
      phoneNumber: "",
      bio: "",
    },
  }
  function ReducerFunction(draft, action) {
    switch (action.type) {
      case "catchUserProfileInfo":
        draft.userProfile.agencyName = action.profileObject
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
        dispatch({ type: "catchuserProfileInfo", profileObject: response.data })
      } catch (e) {
        console.log(e)
      }
    }
    GetProfileInfo()
  }, [])
  return <div></div>
}

export default Profile
