import React, { useState, useEffect } from "react"
import Heading from "./Heading"
import ProductCard from "../layout/ProductCard"
import { useContext } from "react"
import Axios from "axios"
import Loading from "../layout/Loading"
function Recommended() {
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
    <div className="flex items-center flex-col px-5 ">
      <Heading
        title="Recommended for You"
        subtitle="Properties close to you are recommended."
      />

      <div className="flex items-center justify-center gap-5 w-full">
        {allListings &&
          allListings.map((item) => (
            <ProductCard
              className="w-10 max-w-2 max-h-4"
              key={item.id}
              {...item}
            />
          ))}
      </div>
    </div>
  )
}

export default Recommended
