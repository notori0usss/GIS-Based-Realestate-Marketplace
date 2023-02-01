import React from "react"
import { FaFileSignature, FaMoneyBill, FaPlus, FaStop } from "react-icons/fa"
import Heading from "./Heading"
function Timeline() {
  return (
    <div className="flex items-center flex-col mt-16 bg-white py-10">
      <Heading title={"Why us?"} subtitle={"Our Features"} />
      <ol className="flex items-center justify-center w-full my-10 flex-col">
        <li className="border-l-2 border-yellow-600">
          <div className="md:flex flex-start">
            <div className="bg-yellow-600 w-6 h-6 flex items-center justify-center rounded-full -ml-3.5">
              <FaFileSignature className="text-white w-3 h-3" />
            </div>
            <div className="block p-6 rounded-lg shadow-lg bg-gray-100 max-w-md ml-6 mb-10">
              <div className="flex justify-between mb-4">
                <a
                  href="#!"
                  className="font-medium text-yellow-600 hover:text-yellow-700 focus:text-yellow-800 duration-300 transition ease-in-out text-sm"
                >
                  Easy Registration
                </a>
              </div>
              <p className="text-gray-700 mb-6">
                You can Registration with a click of a button & some details.
              </p>
              <button
                type="button"
                className="inline-block px-4 py-1.5 bg-yellow-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-700 hover:shadow-lg focus:bg-yellow-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Register Here
              </button>
            </div>
          </div>
        </li>

        <li className="border-l-2 border-yellow-600">
          <div className="md:flex flex-start">
            <div className="bg-yellow-600 w-6 h-6 flex items-center justify-center rounded-full -ml-3.5">
              <FaMoneyBill className="text-white w-3 h-3" />
            </div>
            <div className="block p-6 rounded-lg shadow-lg bg-gray-100 max-w-md ml-6 mb-10">
              <div className="flex justify-between mb-4">
                <a
                  href="#!"
                  className="font-medium text-yellow-600 hover:text-yellow-700 focus:text-yellow-800 duration-300 transition ease-in-out text-sm"
                >
                  One time Charge for Listing
                </a>
              </div>
              <p className="text-gray-700 mb-6">
                One time Charge for listing. Only at $20 for unlimited Listing.
              </p>
              <button
                type="button"
                className="inline-block px-4 py-1.5 bg-yellow-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-700 hover:shadow-lg focus:bg-yellow-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Subscribe Here
              </button>
            </div>
          </div>
        </li>
        <li className="border-l-2 border-yellow-600">
          <div className="md:flex flex-start">
            <div className="bg-yellow-600 w-6 h-6 flex items-center justify-center rounded-full -ml-3.5">
              <FaPlus className="text-white w-3 h-3" />
            </div>
            <div className="block p-6 rounded-lg shadow-lg bg-gray-100 max-w-md ml-6 mb-10">
              <div className="flex justify-between mb-4">
                <a
                  href="#!"
                  className="font-medium text-yellow-600 hover:text-yellow-700 focus:text-yellow-800 duration-300 transition ease-in-out text-sm"
                >
                  Add Property with the Help of OSM
                </a>
              </div>
              <p className="text-gray-700 mb-6">
                Add your listing on a map with marker. How cool is that!
              </p>
              <button
                type="button"
                className="inline-block px-4 py-1.5 bg-yellow-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-700 hover:shadow-lg focus:bg-yellow-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Add Listing
              </button>
            </div>
          </div>
        </li>
      </ol>
    </div>
  )
}

export default Timeline
