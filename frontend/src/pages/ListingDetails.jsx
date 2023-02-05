import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useImmerReducer } from "use-immer"
import Axios from "axios"
import Loading from "../layout/Loading"
function ListingDetails() {
  const params = useParams()
  const initialState = {
    lisitingInfo: "",
    dataIsLoading: true,
  }
  function ReducerFunction(draft, action) {
    switch (action.type) {
      case "catchListingInfo":
        draft.listingInfo = action.listingObject
        break
      case "loadingDone":
        draft.dataIsLoading = false
        break
    }
  }
  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState)
  useEffect(() => {
    async function GetListingInfo() {
      try {
        const response = await Axios.get(
          `http://127.0.0.1:8000/api/listings/${params.id}/`
        )
        console.log(response.data)
        dispatch({ type: "loadingDone" })
        dispatch({ type: "catchListingInfo", listingObject: response.data })
      } catch (e) {
        console.log(e)
      }
    }
    GetListingInfo()
  }, [])

  //form submit

  if (state.dataIsLoading === true) {
    return <Loading />
  }

  return <div>ListingDetails</div>
}

export default ListingDetails
