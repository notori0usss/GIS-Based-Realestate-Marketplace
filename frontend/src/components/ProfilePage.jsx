import React, { useState } from "react"
import { useEffect } from "react"
import Loading from "../layout/Loading"
import Axios from "axios"
import { useImmerReducer } from "use-immer"
import { useParams } from "react-router-dom"
import UserProfile from "./UserProfile"
import { BsFillGrid3X3GapFill } from "react-icons/all"
import { MdVerified } from "react-icons/md"
import ProfileListCard from "./ProfileListCard"
import BookingCard from "./BookingCard"
function ProfilePage() {
  const params = useParams()
  const initialState = {
    userProfile: {},
    dataIsLoading: true,
  }
  function ReducerFunction(draft, action) {
    switch (action.type) {
      case "catchuserProfileInfo":
        draft.userProfile = action.profileObject
        break
      case "loadingDone":
        draft.dataIsLoading = false
        break
    }
  }
  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState)
  useEffect(() => {
    async function GetAgencyInfo() {
      try {
        const response = await Axios.get(
          `http://127.0.0.1:8000/api/profiles/${params.id}/`
        )
        console.log(response.data)
        dispatch({ type: "loadingDone" })
        dispatch({ type: "catchuserProfileInfo", profileObject: response.data })
      } catch (e) {
        console.log(e)
      }
    }
    GetAgencyInfo()
  }, [])

  //form submit

  if (state.dataIsLoading === true) {
    return <Loading />
  }
  return (
    <>
      <div className="flex justify-center">
        <div className="w-1/3 flex flex-col items-start">
          <div className="flex justify-center items-center py-6 gap-10">
            <img
              src={state.userProfile.profile_picture}
              alt="profile-picture"
              className="w-40 h-40 object-cover rounded-md"
            />
            <div>
              <h1 className="text-xl font-semibold ">Name</h1>
              <h2>
                {state.userProfile.f_name} {state.userProfile.l_name}
              </h2>
            </div>
            <div>
              <h1 className="text-xl font-semibold ">Contact</h1>
              <h2>{state.userProfile.phone_number}</h2>
            </div>
          </div>
          <div className="">
            <h2 className="text-xl font-bold"></h2>
            <p className="text-sm ">{state.userProfile.bio}</p>
          </div>
        </div>
      </div>
      <hr className="w-1/2 h-[2px] mx-auto my-2 bg-gray-100 border-0 rounded md:my-3 dark:bg-gray-200"></hr>
      <div className="max-w-7xl container mx-auto flex flex-col items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {state.userProfile.my_bookings.map((item) => (
            <div className="bg-blue-100 rounded-xl flex flex-col gap-5">
              <img
                src={`http://127.0.0.1:8000${item.listing.picture1}`}
                alt=""
                className="w-full h-40 object-cover cursor-pointer hover:scale-105 transition-all duration-200"
                onClick={() => navigate(`/listings/${item.listing.id}`)}
              />
              <div className="px-5">
                <h2 className="text-xl font-bold text-gray-700">
                  {item.listing.title}
                </h2>
                <p>Booking On: {}</p>
              </div>

              <div className="flex justify-between items-center gap-4 px-5 py-2">
                <div
                  className={`bg-${
                    item.status === "Pending"
                      ? "yellow"
                      : item.status === "Completed"
                      ? "green"
                      : item.status === "Rejected"
                      ? "red"
                      : item.status === "Approved"
                      ? "blue"
                      : ""
                  }-500 px-2 py-1 rounded-3xl text-white text-sm`}
                >
                  Status: {item.status}
                </div>
                <button className="font-semibold hover:underline">
                  {item.listing.seller_agency_name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
export default ProfilePage
