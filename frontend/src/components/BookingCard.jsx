import React, { useEffect, useState } from "react"
import Axios from "axios"
import { useNavigate } from "react-router-dom"
function BookingCard({ bookingInfo }) {
  const [userInfo, setUserInfo] = useState([])
  useEffect(() => {
    async function GetUserInfo() {
      if (bookingInfo.user) {
        try {
          const response = await Axios.get(
            `http://127.0.0.1:8000/api/profiles/${bookingInfo.user}/`
          )
          setUserInfo(response.data)
          console.log(response.data)
        } catch (e) {
          console.log(e)
        }
      }
    }

    GetUserInfo()
  }, [])
  // useEffect(() => {
  //   if (state.sendRequest) {
  //     async function UpdateBooking() {
  //       const formData = new FormData()
  //       formData.append("agency_name", state.agencyNameValue)

  //       try {
  //         const response = await Axios.patch(
  //           `http://127.0.0.1:8000/api/profiles/${GlobalState.userId}/update/`,
  //           formData
  //         )
  //         console.log(response)
  //         navigate("/profile")
  //       } catch (error) {
  //         console.log(error)
  //       }
  //     }
  //     UpdateProfile()
  //   }
  // }, [state.sendRequest])
  console.log(userInfo)
  const navigate = useNavigate()
  console.log(bookingInfo)
  return (
    <div className="flex items-center justify-center gap-2 bg-white my-2 border-2 py-4">
      <img
        className="w-16 h-16 rounded-lg object-cover"
        src={userInfo.profile_picture}
        alt=""
      />

      <div className="space-y-3">
        <div>
          <button className="font-semibold text-lg hover:underline cursor-pointer">
            {userInfo.f_name} {userInfo.l_name}
          </button>
        </div>
        <button className="px-4 py-1 bg-blue-500 text-white font-semibold mr-2">
          Approve
        </button>
        <button className="px-4 py-1 bg-red-500 text-white font-semibold mr-2">
          Decline
        </button>
      </div>
    </div>
  )
}

export default BookingCard
