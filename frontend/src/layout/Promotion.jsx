import React, { useContext, useState } from "react"
import { RxCross2 } from "react-icons/rx"
import { Link } from "react-router-dom"
import StateContext from "../context/StateContext"

function Promotion() {
  const [isOpen, setIsOpen] = useState(true)
  const GlobalState = useContext(StateContext)
  return (
    <>
      {!GlobalState.isSubscribed && isOpen && (
        <div className="w-full h-[6vh] flex items-center justify-center max-w-5xl mx-auto gap-2">
          Are you a seller?{" "}
          <Link
            to="/checkout"
            className="hover:underline text-blue-500 font-semibold"
            onClick={() => setIsOpen(!isOpen)}
          >
            Subscribe Here!
          </Link>
          to add Listing
          <button onClick={() => setIsOpen(!isOpen)}>
            <RxCross2 className="text-lg hover:rotate-90" />
          </button>
        </div>
      )}
    </>
  )
}

export default Promotion
