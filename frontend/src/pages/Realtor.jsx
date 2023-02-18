import React, { useEffect, useState } from "react"
import Heading from "../components/Heading"
import RealtorCard from "../components/RealtorCard"
import Axios from "axios"

function Realtor() {
  const [realtors, setRealtors] = useState([])
  useEffect(() => {
    async function GetRealtor() {
      try {
        const response = await Axios.get(
          "http://127.0.0.1:8000/api/realtor/verified"
        )
        console.log(response.data)
        setRealtors(response.data)
      } catch (e) {
        console.log(e)
      }
    }
    GetRealtor()
  }, [])
  return (
    <div className="flex items-center justify-center flex-col mt-10">
      <Heading
        title={"Our Best Realtors"}
        subtitle={"Hire with Just one Text"}
      />
      <div className="flex gap-10">
        {realtors?.map((item) => (
          <RealtorCard key={item.id} {...item} />
        ))}
      </div>
      <div>
        Are you a realtor?<button> Apply Here!</button>
      </div>
    </div>
  )
}

export default Realtor
