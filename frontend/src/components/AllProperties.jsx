import React from "react"
import { useContext } from "react"
import StateContext from "../context/StateContext"
import ProductCard from "../layout/ProductCard"
import { useState } from "react"
import Loading from "../layout/Loading"
import { FaSearch } from "react-icons/fa"
function AllProperties() {
  const GlobalState = useContext(StateContext)
  const allListings = GlobalState.listingInfo
  const [query, setQuery] = useState("")
  const search = (items) => {
    return Array.from(items).filter(
      (item) =>
        item.area?.includes(query) ||
        item.listing_type?.includes(query) ||
        item.title?.includes(query) ||
        item.seller_agency_name?.includes(query)
    )
  }
  return (
    <div className="flex flex-col items-center gap-3 mx-5">
      <input
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Here"
        className="w-1/2 px-3 py-2 h-10 outline-blue-500 shadow-lg rounded-md mt-2 "
      />
      <div className="text-italic text-gray-500">
        Showing Results By <span className="font-semibold">{query}</span>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {search(allListings)?.map((item) => (
          <div className="h-30 w-30" key={item.id}>
            <ProductCard {...item} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllProperties
