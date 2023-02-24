import React, { useEffect } from "react"

function BookingCard({ bookingInfo }) {
  // useEffect(() => {
  //     async function GetUserInfo() {
  //       if (bookingInfo.user) {
  //         try {
  //           const response = await Axios.get(
  //             `http://127.0.0.1:8000/api/profiles/${state.listingInfo.seller}/`
  //           )
  //           dispatch({ type: "catchUserInfo", userObject: response.data })
  //         } catch (e) {
  //           console.log(e)
  //         }
  //       }
  //     }

  //     GetUserInfo()
  //   }, [state.listingInfo.seller])
  console.log(bookingInfo)
  return (
    <div className="flex items-center justify-center gap-8">
      <img
        className="w-16 h-16 rounded-lg object-cover"
        src="http://ultimanepal.com/assets/images/products/openeardopesblue.png"
        alt=""
      />

      <div className="space-y-2">
        <h2 className="font-semibold text-lg">Name</h2>
        <button className="px-5 py-1 bg-blue-500 text-white font-semibold mr-1">
          Approve
        </button>
        <button className="px-5 py-1 bg-red-500 text-white font-semibold mr-1">
          Decline
        </button>
      </div>
    </div>
  )
}

export default BookingCard
