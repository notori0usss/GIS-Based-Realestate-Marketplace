import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import StateContext from "../context/StateContext"
import { useImmerReducer } from "use-immer"
import Axios from "axios"
import Loading from "../layout/Loading"
import AgencyCard from "../layout/AgencyCard"
function Agencies() {
  const navigate = useNavigate()
  const GlobalState = useContext(StateContext)
  const initialState = {
    dataIsLoading: true,
    agenciesList: [],
  }
  function ReducerFunction(draft, action) {
    switch (action.type) {
      case "catchAgencies":
        console.log(action.agenciesArray)
        draft.agenciesList = action.agenciesArray
        break
      case "loadingDone":
        draft.dataIsLoading = false
        break
    }
  }

  useEffect(() => {
    async function GetAgencies() {
      try {
        const response = await Axios.get("http://127.0.0.1:8000/api/profiles/")
        console.log(response.data)
        dispatch({ type: "catchAgencies", agenciesArray: response.data })
        dispatch({ type: "loadingDone" })
      } catch (e) {
        console.log(e)
      }
    }
    GetAgencies()
  }, [])
  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState)

  if (state.dataIsLoading === true) {
    return <Loading />
  }
  return (
    <ul className="grid grid-cols-3 px-32 py-10">
      {state.agenciesList.map(
        (item) =>
          item.agency_name &&
          item.phone_number &&
          item.subscribed && (
            <li key={item.id}>
              <AgencyCard {...item} />
            </li>
          )
      )}
    </ul>
  )
}

export default Agencies
