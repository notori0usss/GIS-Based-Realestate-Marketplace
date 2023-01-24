import React from "react"
import { AuthContext } from "./context/AuthContext"
import Auction from "./Auction"
import { Routes, useNavigate } from "react-router-dom"

function index() {
  return (
    <AuthContext.Provider>
      <Auction />
    </AuthContext.Provider>
  )
}

export default index
