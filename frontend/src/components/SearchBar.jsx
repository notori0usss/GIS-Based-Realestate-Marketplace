import React, { useState } from "react"

function SearchBar({}, ref) {
  const [query, setQuery] = useState("")
  console.log(ref.current)
  function searchHandler(e) {
    e.preventDefault()
    console.log(query)
    ref.current.flyTo([27.723511377718985, 85.30779224321469], 18, {
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
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-yellow-500 focus:border-yellow-500"
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
