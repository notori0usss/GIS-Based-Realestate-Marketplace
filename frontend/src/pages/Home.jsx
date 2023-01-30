import React, { useState, useEffect } from "react"
import Hero from "../components/Hero"
import Feature from "../components/feature/Feature"
import Recommended from "../components/Recommended"
import { useContext } from "react"
import { useLocation } from "react-router-dom"
import QueryString from "query-string"
import Axios from "axios"
import Loading from "../layout/Loading"
import DispatchContext from "../context/DispatchContext"
import StateContext from "../context/StateContext"
function Home() {
  const location = useLocation()
  const GlobalDispatch = useContext(DispatchContext)
  const GlobalState = useContext(StateContext)
  const [allListings, setAllListings] = useState([])
  const [dataLoading, setDataLoading] = useState(true)
  useEffect(() => {
    const source = Axios.CancelToken.source()
    async function GetAllListings() {
      try {
        const listingResponse = await Axios.get(
          "http://127.0.0.1:8000/api/listings/",
          { cancelToken: source.token }
        )
        setDataLoading(false)
        setAllListings(listingResponse.data)
      } catch (error) {
        console.log(error)
      }
    }
    GetAllListings()

    return () => {
      source.cancel
    }
  }, [])

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    // const query = new URLSearchParams(window.location.search);
    const values = QueryString.parse(location.search)
    console.log(values.success)
    if (values.success) {
      GlobalDispatch({ type: "getSessionId", paymentValue: values.session_id })
      console.log("Order placed! You will receive an email confirmation.")
    }

    if (values.canceled) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you're ready."
      )
    }
  }, [GlobalState.paymentInfo])
  if (dataLoading === true) {
    return <Loading />
  }
  return (
    <>
      <Hero />
      <Feature allListings={allListings} />
      <Recommended allListings={allListings} />
    </>
  )
}

export default Home
