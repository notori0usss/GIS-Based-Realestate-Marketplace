import React, { useEffect } from "react"
import Pages from "./pages/Pages"
import { useImmerReducer } from "use-immer"
import DispatchContext from "./context/DispatchContext"
import StateContext from "./context/StateContext"
function App() {
  const initialState = {
    userUsername: localStorage.getItem("theUserUsername"),
    userEmail: localStorage.getItem("theUserEmail"),
    userId: localStorage.getItem("theUserId"),
    userToken: localStorage.getItem("theUserToken"),
    userIsLogged: localStorage.getItem("theUserUsername") ? true : false,
    userProfilePicture: "",
    listingInfo: "",
    subscribedInfo: 0,
  }
  function ReducerFunction(draft, action) {
    switch (action.type) {
      case "GetTokenResponse":
        draft.userToken = action.tokenValue
        break
      case "userSignsIn":
        draft.userId = action.idInfo
        draft.userUsername = action.usernameInfo
        draft.userEmail = action.emailInfo
        draft.userIsLogged = true

        break
      case "getUserProfilePicture":
        draft.userProfilePicture = action.profilePicture
        break
      case "logout":
        draft.userIsLogged = false
        break
      case "getListings":
        draft.listingInfo = action.listingValue
        break
      case "getSubscribedInfo":
        draft.subscribedInfo = draft.subscribedInfo + 1
        break
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState)
  console.log(state.subscribedInfo)

  useEffect(() => {
    if (state.userIsLogged) {
      localStorage.setItem("theUserUsername", state.userUsername)
      localStorage.setItem("theUserEmail", state.userEmail)
      localStorage.setItem("theUserId", state.userId)
      localStorage.setItem("theUserToken", state.userToken)
    } else {
      localStorage.removeItem("theUserUsername")
      localStorage.removeItem("theUserEmail")
      localStorage.removeItem("theUserId")
      localStorage.removeItem("theUserToken")
      localStorage.removeItem("theSessionId")
    }
  }, [state.userIsLogged])

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <Pages />
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

export default App
