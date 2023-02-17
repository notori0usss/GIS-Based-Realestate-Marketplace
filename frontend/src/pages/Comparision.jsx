import React from "react"
import { useParams } from "react-router-dom"

function Comparision() {
  const params = useParams()

  console.log(params.id)
  return <div>Comparision</div>
}

export default Comparision
