import React, { useState } from "react"

function SearchBar({ getSearchTitle }, ref) {
  const [query, setQuery] = useState("")
  const [lat, setLat] = useState(27.667286988735277)
  const [lng, setLng] = useState(85.27796966687711)

  if (query === "kirtipur") {
    setLat(27.667286988735277)
    setLng(85.27796966687711)
  }
  function searchHandler(e) {
    e.preventDefault()
    getSearchTitle(query.toLowerCase())
    ref.current.flyTo([lat, lng], 14, {
      animate: true,
    })
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
          className="text-white absolute right-2.5 bottom-2.5 bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium text-sm px-4 py-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
        >
          Search
        </button>
      </div>
    </form>
  )
}

export default React.forwardRef(SearchBar)
