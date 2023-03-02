import React, { useState, useContext } from "react"
import StateContext from "../context/StateContext"
import Axios from "axios"
import DatePicker from "react-date-picker"
function BookingModel({ listing, seller, getSentBooking }) {
  const [showModal, setShowModal] = React.useState(false)
  const [value, onChange] = useState(new Date())

  let date = value.toISOString()
  const [fname, setFname] = useState("")
  const [lname, setLname] = useState("")
  const GlobalState = useContext(StateContext)
  function submitHandler() {
    setShowModal(false)

    async function DateSender() {
      const formData = new FormData()
      formData.append("f_name", fname),
        formData.append("l_name", lname),
        formData.append("date_booked", date),
        formData.append("booker", GlobalState.userId),
        formData.append("listing", listing),
        formData.append("seller", seller)

      try {
        const response = await Axios.post(
          `http://127.0.0.1:8000/api/bookings/create/`,
          formData
        )
        console.log(response)
        getSentBooking(response)
      } catch (error) {
        console.log(error.response.data)
      }
    }
    DateSender()
  }
  return (
    <div>
      <button
        className="px-4 py-1 font-semibold text-blue-500 bg-white border-2 border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-200 rounded-3xl"
        onClick={() => setShowModal(true)}
      >
        Visit
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Pick a Date</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex flex-col justify-center items-center gap-10">
                  <h2 className="text-xl font-semibold">Pick a Date</h2>
                  <DatePicker
                    showIcon
                    className="w-full"
                    onChange={onChange}
                    value={value}
                    isOpen={false}
                  />
                  <input
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    placeholder="name"
                    type="text"
                  />
                  <input
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                    type="text"
                    placeholder="lname"
                  />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={submitHandler}
                  >
                    Send Request
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  )
}

export default BookingModel
