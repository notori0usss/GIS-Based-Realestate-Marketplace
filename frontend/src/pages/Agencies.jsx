import React, { useContext, useEffect, useLayoutEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import StateContext from "../context/StateContext"
import { useImmerReducer } from "use-immer"
import Axios from "axios"
import Loading from "../layout/Loading"
import AgencyCard from "../layout/AgencyCard"
import Heading from "../components/Heading"
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
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])
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
    <>
      <div className="flex items-center justify-center flex-col mt-10">
        <Heading
          title="Our Registered Agencies"
          subtitle="Check the finest Agencies"
        />
      </div>
      <ul className="grid grid-cols-3 px-32 pb-10">
        {state.agenciesList.map(
          (item) =>
            item.agency_name &&
            item.phone_number &&
            item.subscribed &&
            item.seller_listings_count !== 0 && (
              <li key={item.id}>
                <AgencyCard {...item} />
              </li>
            )
        )}
      </ul>
    </>
  )
}

export default Agencies
