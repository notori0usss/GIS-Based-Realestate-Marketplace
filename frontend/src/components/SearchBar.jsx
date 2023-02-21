import React, { useEffect, useState } from "react"
import L from "leaflet"
const BASE_URL = "https://nominatim.openstreetmap.org/search?"
const params = {
  q: "",
  format: "json",
  addressdetails: "addressdetails",
}
function SearchBar({ getSearchTitle, getSearchPolygon }, ref) {
  const [query, setQuery] = useState("")

  const [result, setResult] = useState(null)
  // useEffect(() => {
  //   if (result && result.geojson && result.geojson.coordinates) {
  //     // If the result includes a polygon, create a Leaflet Polygon object and add it to the map
  //     const polygonCoords = result.geojson.coordinates
  //     const polygon = L.polygon(polygonCoords)
  //     polygon.addTo(ref.current)
  //     // Fit the map to the bounds of the polygon
  //     ref.current.fitBounds(polygon.getBounds())
  //   }
  // }, [result])
  function searchHandler(e) {
    e.preventDefault()
    getSearchTitle(query.toLowerCase())
    const params = {
      q: `${query}, Nepal`,
      format: "json",
      addressDetails: 1,
      polygon_geojson: 1,
    }
    const queryString = new URLSearchParams(params).toString()
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    }

    fetch(`${BASE_URL}${queryString}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const parsedResult = JSON.parse(result)[0]
        setResult(parsedResult)
        getSearchPolygon(parsedResult.geojson.coordinates)

        ref.current.flyTo([parsedResult.lat, parsedResult.lon], 14, {
          animate: true,
        })
      })
      .catch((err) => console.log(err))
  }
  return (
    <form onSubmit={searchHandler}>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search Location, Kathmandu..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
    </form>
  )
}

export default React.forwardRef(SearchBar)
