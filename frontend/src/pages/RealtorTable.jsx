import React, { useState, useContext, useEffect } from "react"
import Axios from "axios"
import StateContext from "../context/StateContext"
import { FcApprove, FcDisapprove, FcFullTrash } from "react-icons/fc"
import { useNavigate } from "react-router-dom"
import DispatchContext from "../context/DispatchContext"
function RealtorTable() {
  const [realtors, setRealtors] = useState([])
  const [sendRequest, setSendRequest] = useState(0)
  const GlobalState = useContext(StateContext)
  const GlobalDispatch = useContext(DispatchContext)
  const [count, setCount] = useState(0)
  const navigate = useNavigate()
  useEffect(() => {
    async function GetRealtor() {
      try {
        const response = await Axios.get("http://127.0.0.1:8000/api/realtors/")
        console.log(response.data)
        setRealtors(response.data)
      } catch (e) {
        console.log(e)
      }
    }
    GetRealtor()
  }, [sendRequest, count])

  function clickerHandler(value, id) {
    async function ChangeVerify() {
      const formData = new FormData()
      formData.append("is_verified", value)
      try {
        const response = await Axios.patch(
          `http://127.0.0.1:8000/api/realtors/${id}/update/`,
          formData
        )
        console.log(response.data)
        setSendRequest(sendRequest + 1)
      } catch (e) {
        console.log(e)
      }
    }
    ChangeVerify()
  }

  async function deleteHandler(id) {
    try {
      const response = await Axios.delete(
        `http://127.0.0.1:8000/api/realtors/${id}/delete/`
      )
      navigate("/realtortable")
      setCount(count + 1)
    } catch (error) {
      console.error(error)
    }
  }
  async function ChangeSubscription(value, id) {
    const subscribedStatus = new FormData()
    subscribedStatus.append("subscribed", value)
    try {
      const response = await Axios.patch(
        `http://127.0.0.1:8000/api/profiles/${id}/update/`,
        subscribedStatus
      )
      console.log(response)
      GlobalDispatch({ type: "getSubscribedInfo" })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Name
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                State
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                CV
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Type
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-gray-900"
              ></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {realtors.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                  <div className="relative h-10 w-10">
                    <img
                      className="h-full w-full rounded-full object-cover object-center"
                      src={`http://127.0.0.1:8000${item.profile_picture}`}
                      alt=""
                    />
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-700">{item.name}</div>
                    <div className="text-gray-400">{item.email}</div>
                  </div>
                </th>
                <td className="px-6 py-4">
                  {item.is_verified ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                      Not Active
                    </span>
                  )}
                </td>
                <td>
                  <a
                    href={item.cv}
                    className="hover:underline text-black font-semibold"
                  >
                    Download CV
                  </a>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    {item.forclosure_agent && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                        Forclosure
                      </span>
                    )}
                    {item.listing_agent && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                        Listing
                      </span>
                    )}{" "}
                    {item.buyers_agent && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                        Buyers
                      </span>
                    )}{" "}
                    {item.relocation_agent && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                        Relocation
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-4 text-3xl">
                    <FcFullTrash
                      className="cursor-pointer"
                      onClick={() => deleteHandler(item.id)}
                    />
                    <FcDisapprove
                      className="cursor-pointer"
                      onClick={() => {
                        clickerHandler(false, item.id)
                        ChangeSubscription(false, item.user)
                      }}
                    />
                    <FcApprove
                      className="cursor-pointer"
                      onClick={() => {
                        clickerHandler(true, item.id)
                        ChangeSubscription(true, item.user)
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RealtorTable
