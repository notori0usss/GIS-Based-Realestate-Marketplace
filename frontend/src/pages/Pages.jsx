import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Home"
import Listings from "./Listings"
import AddProperty from "./AddProperty"
import Login from "./Login"
import Signup from "./Signup"
import Navbar from "../layout/Navbar"
import Auction from "../auction/Auction"
import { AuthProvider } from "../auction/context/AuthContext"
import Testing from "../testing/Testing"
function Pages() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/addProperty" element={<AddProperty />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/auction" element={<Auction />} />
          <Route path="/testing" element={<Testing />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Pages
