import React, { useState, useEffect } from "react"
import Hero from "../components/Hero"
import Feature from "../components/feature/Feature"
import Recommended from "../components/Recommended"
import { useContext } from "react"
import Axios from "axios"
import Loading from "../layout/Loading"
function Home() {
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
